import redis from 'redis';
import { promisify } from 'util';

// Create a Redis client
const client = redis.createClient();

// Promisify the get function of the client
const getAsync = promisify(client.get).bind(client);

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
async function displaySchoolValue(schoolName) {
    try {
        const reply = await getAsync(schoolName);
        console.log(reply);
    } catch (err) {
        console.error(err);
    }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

process.on('exit', () => {
    client.quit();
});
