/*const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));  // Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

let users = [];  // Store users that are currently connected

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle a new connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle user joining the chat
    socket.on('user join', (username) => {
        users.push({ id: socket.id, username });  // Add user to the list
        console.log(`${username} joined the chat`);

        // Notify all users about the new user
        io.emit('user join', users.map(u => u.username));  // Send the updated user list to all clients
    });

    // Handle incoming chat messages
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);  // Broadcast the message to all clients
    });

    // Handle user disconnecting
    socket.on('disconnect', () => {
        const userIndex = users.findIndex(u => u.id === socket.id);
        if (userIndex !== -1) {
            const username = users[userIndex].username;
            users.splice(userIndex, 1);  // Remove user from the list
            console.log(`${username} left the chat`);

            // Notify all users about the user leaving
            io.emit('user leave', users.map(u => u.username));
        }
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});*/

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve the HTML file directly
});

let users = []; // Store users that are currently connected

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('user join', (username) => {
        if (!users.includes(username)) {
            users.push(username);
        }
        io.emit('user join', users); // Emit the updated user list to everyone
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Emit the chat message to everyone
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        users = users.filter(user => user !== socket.username);
        io.emit('user leave', users); // Emit the updated user list to everyone
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})