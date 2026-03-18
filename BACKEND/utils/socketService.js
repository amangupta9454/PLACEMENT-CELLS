import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*', // Set frontend URL in production
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join user-specific room for targeted notifications
    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their personal room`);
    });

    // Chat specific rooms
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User joined chat room: ${roomId}`);
    });

    socket.on('sendMessage', (data) => {
      // data: { roomId, message, senderModel, senderId }
      io.to(data.roomId).emit('receiveMessage', data);
    });

    socket.on('typing', (data) => {
      socket.to(data.roomId).emit('typing', data);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io is not initialized!');
  }
  return io;
};

export const emitNotification = (target, event, data) => {
  const socketIo = getIO();
  if (target === 'all') {
    socketIo.emit(event, data);
  } else {
    // specific user room
    socketIo.to(target).emit(event, data);
  }
};
