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
import { configureSocket } from "./connection/index.js";

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

configureSocket(io);