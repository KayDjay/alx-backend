import kue from 'kue';

// Array of blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send a notification
function sendNotification(phoneNumber, message, job, done) {
    // Track progress of the job
    job.progress(0, 100);

    // If phoneNumber is blacklisted, fail the job
    if (blacklistedNumbers.includes(phoneNumber)) {
        const errorMessage = `Phone number ${phoneNumber} is blacklisted`;
        job.failed(errorMessage);
        return done(new Error(errorMessage));
    }

    // Track progress to 50%
    job.progress(50, 100);

    // Log sending notification
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

    // Finish job
    done();
}

// Create a queue to process jobs
const queue = kue.createQueue({
    concurrency: 2 // Process two jobs at a time
});

// Process jobs in the queue
queue.process('push_notification_code_2', 2, (job, done) => {
    const { phoneNumber, message } = job.data;

    // Call the sendNotification function
    sendNotification(phoneNumber, message, job, done);
});

// Log when the queue is ready
queue.on('ready', () => {
    console.log('Queue is ready!');
});
