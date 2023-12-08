

export const configureSocket = (io) => {
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

}