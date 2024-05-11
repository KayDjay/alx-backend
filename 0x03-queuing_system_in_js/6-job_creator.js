import kue from 'kue';

const queue = kue.createQueue();

const jobData = {
    phoneNumber: '4153518780',
    message: 'Hello, this is a notification about your order',
};

const job = queue.create('push_notification_code', jobData);

job.on('enqueue', (id, type) => {
    console.log(`Notification job created: ${id}`);
});

job.on('complete', () => {
    console.log('Notification job completed');
});

job.on('failed', () => {
    console.log('Notification job failed');
});
