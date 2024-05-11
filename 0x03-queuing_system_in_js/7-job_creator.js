import kue from 'kue';

// Array of jobs data
const jobs = [
    {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
    },
    {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account'
    },
    {
        phoneNumber: '4153518743',
        message: 'This is the code 4321 to verify your account'
    },
    {
        phoneNumber: '4153538781',
        message: 'This is the code 4562 to verify your account'
    },
    {
        phoneNumber: '4153118782',
        message: 'This is the code 4321 to verify your account'
    },
    {
        phoneNumber: '4153718781',
        message: 'This is the code 4562 to verify your account'
    },
    {
        phoneNumber: '4159518782',
        message: 'This is the code 4321 to verify your account'
    },
    {
        phoneNumber: '4158718781',
        message: 'This is the code 4562 to verify your account'
    },
    {
        phoneNumber: '4153818782',
        message: 'This is the code 4321 to verify your account'
    },
    {
        phoneNumber: '4154318781',
        message: 'This is the code 4562 to verify your account'
    },
    {
        phoneNumber: '4151218782',
        message: 'This is the code 4321 to verify your account'
    }
];

// Create a queue named push_notification_code_2
const queue = kue.createQueue();

// Process each job
jobs.forEach((jobData, index) => {
    // Create a new job
    const job = que.create ('push_notification_code_2', jobData).save (err => {
        if (err) console.error (`Failed to create job: ${err}`);
    });

    // Event handler for job creation
    job.on('enqueue', (id, type) => {
        console.log(`Notification job created: ${id}`);
    });

    // Event handler for job completion
    job.on('complete', () => {
        console.log(`Notification job ${job.id} completed`);
    });

    // Event handler for job failure
    job.on('failed', (err) => {
        console.error(`Notification job ${job.id} failed: ${err}`);
    });

    // Event handler for job progress
    job.on('progress', (progress, data) => {
        console.log(`Notification job ${job.id} ${progress}% complete`);
    });

    // Save the job to the queue
    job.save((err) => {
        if (err) {
            console.error(`Error creating job: ${err}`);
        }
    });
});
