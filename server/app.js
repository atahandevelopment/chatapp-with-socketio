import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRouter from "./routes/userRouter.js";
import privateRouter from "./routes/privateRouter.js";
import publicRouter from "./routes/publicRouter.js";
import roomsRouter from "./routes/roomsRouter.js";
import { Server } from 'socket.io';

dotenv.config();


// express uygulamasını oluşturuyoruz.
const app = express();

// farklı alan adlarından gelen http isteklerine izin veriyoruz güvenlik işlemi için gerekli
app.use(cors());

app.use(express.json());

const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Socket.IO-YD Yazılım Case',
        version: '1.0.0',
        description: 'Chat Uygulamasının api dokümantasyonunu içerir',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            in: 'header',
            name: 'Authorization',
            description: 'Bearer',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: {
        bearerAuth: [],
      },
      servers: [{
        url :"http://localhost:5000/api/v1/"
      }]
    },
    apis: ['./routes/*.js'],
    
  });

// api işlemleri bu kısımda.
app.use('/api/v1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/v1/user', userRouter);
app.use('/api/v1/private', privateRouter);
app.use('/api/v1/public', publicRouter);
app.use('/api/v1/rooms', roomsRouter);


// eğer farklı bir portta çalıştırılmak isteniyorsa env dosyasında PORT girilebilir. 
//PORT olmadığında 5000 portunda çalışacaktır.

const PORT = process.env.PORT || 5000;

// Geliştirme ortamı için "npm run dev" komutu çalıştırılabilir. Proje nodemon ile başlatılacaktır.

const server = app.listen(PORT, () => {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log('Mongodb bağlantısı başarılı.' + `${PORT}'inci portta dinliyor.`))
        .catch(err => console.log(err));
})

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
})


// Kullanıcıların odalara katılması için bir harita oluşturuyoruz.
global.rooms = new Map();

// Online kullanıcıları tutmak için bir harita oluşturuyoruz.
global.onlineUsers = new Map();

io.on("connection", (socket) => {
    // Yeni bir kullanıcı bağlandığında
    socket.on("add-user", (userId) => {
        // Kullanıcıyı genel odaya ekliyoruz.
        socket.join("general");
        // Kullanıcıyı online kullanıcılar listesine ekliyoruz.
        onlineUsers.set(userId._id, socket.id);

        // Yeni kullanıcıya mevcut odalardaki kullanıcıları gönderiyoruz.
        socket.emit("room-users", { general: Array.from(rooms.get("general") || []) });

        // Yeni kullanıcıyı genel odaya ekleyerek diğer kullanıcılara bildiriyoruz.
        io.to("general").emit("user-joined", { userId, roomId: "general" });
    });

    // Kullanıcı bir odaya katılmak istediğinde
    socket.on("join-room", (roomId) => {
        // Eğer oda zaten varsa, kullanıcıyı ekleyip güncelliyoruz.
        if (rooms.has(roomId.room)) {
            rooms.get(roomId.room).add(socket.id);
        } else {
            // Eğer oda yoksa, yeni bir oda oluşturup kullanıcıyı ekliyoruz.
            rooms.set(roomId.room, new Set([socket.id]));
        }

        // Kullanıcıyı odaya katıyoruz.
        socket.join(roomId.room);
        // Odadaki diğer kullanıcılara yeni kullanıcıyı bildiriyoruz.
        io.to(roomId.room).emit("user-joined", { userId: roomId.userId, roomId });

        // Odadaki diğer kullanıcılara güncellenmiş kullanıcı listesini gönderiyoruz.
        const roomUsers = Array.from(rooms.get(roomId.room));
        io.to(roomId.room).emit("room-users", {
            roomId: roomId.room,
            roomName: roomId.roomName,
            users: roomUsers.map(userId => {
                return {
                    userId,
                    user: roomId.user
                };
            })
        });
    });

    // Kullanıcı odadan ayrıldığında
    socket.on("leave-room", (roomId) => {
        // Kullanıcıyı odadan çıkarıyoruz.
        socket.leave(roomId);

        // Kullanıcıyı odadan çıkartarak diğer kullanıcılara bildiriyoruz.
        io.to(roomId).emit("user-left", { userId: socket.id, roomId });

        // Kullanıcıyı genel odaya geri ekliyoruz.
        socket.join("general");

        // Genel odaya ekleyerek diğer kullanıcılara bildiriyoruz.
        io.to(roomId).emit("user-joined", { userId: socket.id, roomId: roomId });

        // Genel odayaki diğer kullanıcılara güncellenmiş kullanıcı listesini gönderiyoruz.
        io.to(roomId).emit("room-users", { general: Array.from(rooms.get("general") || []) });
    });

    // Kullanıcıdan gelen mesajı işle
    socket.on("send-msg", ({ roomId, msg, to, fromName }) => {
        if (to) {
            // Özel bir kullanıcıya mesaj gönder
            const sendUserSocket = onlineUsers.get(to);
            if (sendUserSocket) {
                io.to(sendUserSocket).emit("msg-recieve", msg, fromName);
            }
        } else {
            // Odaya genel mesaj gönder
             rooms.has(roomId);
            io.to(roomId).emit("msg-recieve", msg, fromName);
        }
    });

    // kullanıcının disconnect olma işlemleri.
    socket.on("disconnect", () => {
        // kullanıcıyı online kullanıcılar listesinden çıkarıyoruz.
        onlineUsers.delete(socket.id);

        // Kullanıcının hangi odalara katılı olduğunu kontrol ediyoruz ve bu odalardan çıkarıyoruz.
        for (const [roomId, users] of rooms.entries()) {
            if (users.has(socket.id)) {
                users.delete(socket.id);
                io.to(roomId).emit("user-left", { userId: socket.id, roomId });
                io.to(roomId).emit("room-users", { [roomId]: Array.from(users) });
            }
        }
    });
});