import { verifyJwtToken } from "../lib/jwt.js";
import Message from "../models/Message.js";

// http://localhost:5000/api/v1/private/add-msg -> mesaj gönderme işlemini karşılar
export const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(403).json({ message: 'Authorization header required' });
        }

       const accessToken = authorization.split(' ')[1];

       if (!accessToken) {
           return res.status(403).json({ message: 'Access token required' });
       }
       
       const decodedToken = verifyJwtToken(accessToken);
       if (!decodedToken) {
           return res.status(403).json({ message: 'Invalid access token' });
       }

        const data = await Message.create({
            message: { text: message },
            users: [ from, to ],
            sender: from,
        })
        if (data) {
            return res.json({ message: "Mesaj gönderildi."})
        } else {
            return res.json({ message: "Mesaj gönderilirken hata oluştu."})
        }
    } catch (error) {
        next(error);
    }
}
// http://localhost:5000/api/v1/private/get-msg -> gelen mesajları karşılar
export const getMessage = async (req, res, next) => {
    try {
        const { from, to } = req.query;
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(403).json({ message: 'Authorization header required' });
        }

       const accessToken = authorization.split(' ')[1];

       if (!accessToken) {
           return res.status(403).json({ message: 'Access token required' });
       }
       
       const decodedToken = verifyJwtToken(accessToken);
       if (!decodedToken) {
           return res.status(403).json({ message: 'Invalid access token' });
       }
        const messages = await Message.find({
            users: {
                $all: [from, to],
            }
        }).sort({ updatedAt: 1 });

        const getMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        });

        res.json({ getMessages });
    } catch (error) {
        next(error);
    }
}