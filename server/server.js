// server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

mongoose.connect('mongodb+srv://root:TOb8asod34UApwJT@cluster0.1ly2v5i.mongodb.net/chat-server', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(cors()); // Allow all origins, or you can configure it for specific origins

app.use('/user', userRoutes);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (data) => {
        console.log('Message received:', data.message);
        io.emit('chat message', { username: data.username, message: data.message });
    });

    socket.on('typing', (username) => {
        io.emit('typing', username);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 1166;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
