import RoomMessage from "../models/RoomMessage.js";
import { verifyJwtToken } from "../lib/jwt.js";

// http://localhost:5000/api/v1/public/add-msg -> mesaj gönderme işlemini karşılar
export const addMessage = async (req, res, next) => {
    try {
        const { from, roomId, message } = req.body;
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
        const data = await RoomMessage.create({
            message: { text: message },
            direction: [ from, roomId ],
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
// http://localhost:5000/api/v1/public/get-msg -> gelen mesajları karşılar
export const getMessage = async (req, res, next) => {
    try {
        const { from, room } = req.query;
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
        
        // MongoDb tarafında Mesaj şemasıyla User şemasını birleştirip veriyi client tarafına user bilgilerini dahil edip dönüyorum.
        const messagesWithUserInfo = await RoomMessage.aggregate([
            {
                $match: {
                    direction: {
                        $all: [room],
                    }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'sender',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $sort: { updatedAt: 1 }
            }
        ]);

        const getMessages = messagesWithUserInfo.map(message => {
            const user = message.user[0];
            return {
                fromSelf: message.sender.toString() === from,
                message: message.message.text,
                user: {
                    _id: user._id,
                    name: user.fullname
                }
            };
        });


        res.json({ getMessages });
    } catch (error) {
        next(error);
    }
};
