import kue from 'kue';

// Create a queue named push_notification_code
const queue = kue.createQueue();

// Function to send a notification
function sendNotification(phoneNumber, message) {
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs on the queue
queue.process('push_notification_code', (job, done) => {
    const { phoneNumber, message } = job.data;
    sendNotification(phoneNumber, message);
    done();
});