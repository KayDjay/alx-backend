import express from 'express';
import redis from 'redis';
import kue from 'kue';
import { promisify } from 'util';

const app = express();
const client = redis.createClient();
const queue = kue.createQueue();

// Promisify Redis functions
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const reserveSeat = async (number) => {
  await setAsync('available_seats', number);
};

const getCurrentAvailableSeats = async () => {
  const availableSeats = await getAsync('available_seats');
  return availableSeats ? parseInt(availableSeats) : 0;
};

reserveSeat(50);

let reservationEnabled = true;

app.use(express.json());

app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: numberOfAvailableSeats });
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' });
    return;
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (!err) {
      res.json({ status: 'Reservation in process' });
    } else {
      res.json({ status: 'Reservation failed' });
    }
  });

  job.on('complete', (result) => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (errorMessage) => {
    console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
  });
});

// Route to process the queue and decrease available seats
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  const availableSeats = await getCurrentAvailableSeats();
  if (availableSeats === 0) {
    reservationEnabled = false;
    return;
  }

  if (availableSeats > 0) {
    const newAvailableSeats = availableSeats - 1;
    reserveSeat(newAvailableSeats);
    if (newAvailableSeats === 0) {
      reservationEnabled = false;
    }
    return;
  }

  const job = queue.create('reserve_seat').save();
  job.failed(new Error('Not enough seats available'));
});

// Process the queue reserve_seat
queue.process('reserve_seat', async (job, done) => {
  const availableSeats = await getCurrentAvailableSeats();
  if (availableSeats === 0) {
    done(new Error('Not enough seats available'));
  } else {
    const newAvailableSeats = availableSeats - 1;
    reserveSeat(newAvailableSeats);
    if (newAvailableSeats === 0) {
      reservationEnabled = false;
    }
    done();
  }
});

// Start the server
const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
