function createPushNotificationsJobs(jobs, queue) {
    if (!Array.isArray(jobs)) {
        throw new Error('Jobs is not an array');
    }

    jobs.forEach((job) => {
        const jobInstance = queue.create('push_notification_code_3', job)
            .on('enqueue', () => {
                console.log(`Notification job created: ${jobInstance.id}`);
            })
            .on('complete', () => {
                console.log(`Notification job ${jobInstance.id} completed`);
            })
            .on('failed', (error) => {
                console.log(`Notification job ${jobInstance.id} failed: ${error}`);
            })
            .on('progress', (progress, data) => {
                console.log(`Notification job ${jobInstance.id} ${progress}% complete`);
            });

            job.save();
});
}

export default createPushNotificationsJobs;