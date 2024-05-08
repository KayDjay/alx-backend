import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Event handler for successful connection
client.on('connect', () => {
    console.log('Redis client connected to the server');
});

// Event handler for connection error
client.on('error', (err) => {
    console.error(`Redis client not connected to the server: ${err}`);
});

// Function to set a new school in Redis
function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print);
}

// Function to display the value of a school
function displaySchoolValue(schoolName) {
    client.get(schoolName, (err, resp) => {
        if (err) {
            console.error();
            return;
        }
        console.log(resp);
    })
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

process.on('exit', () => {
    client.quit();
});
