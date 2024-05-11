import kue from 'kue';

// Create a queue named push_notification_code
const queue = kue.createQueue();

// Object containing the Job data
const jobData = {
    phoneNumber: '4153518780',
    message: 'Hello, this is a notification about your order',
};

// Create a job with the object created before
const job = queue.create('push_notification_code', jobData);

// Event handler for job creation
job.on('enqueue', (id, type) => {
    console.log(`Notification job created: ${id}`);
});

// Event handler for job completion
job.on('complete', () => {
    console.log('Notification job completed');
});

// Event handler for job failure
job.on('failed', () => {
    console.log('Notification job failed');
});
