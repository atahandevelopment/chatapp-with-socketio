import Room from "../models/Room.js";
import { verifyJwtToken } from "../lib/jwt.js";

// http://localhost:5000/api/v1/rooms/add-room -> oda oluşturma işlemini karşılar
export const newRoom = async (req, res) => {
    try {
      const { name, users } = req.body;
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
  
      const newRoom = await Room.create({
        name,
        users,
        messages: [], // Başlangıçta boş bir mesaj dizisi
      });

      return res.status(201).json({success: true, message:'Oda oluşturuldu.'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Sunucu Hatası' });
    }
}

// http://localhost:5000/api/v1/rooms/get-rooms -> oda getirme işlemlerini karşılar
export const getRooms = async (req, res) => {
    try {
        // roomId query'ye eklendiyse ilgili odayı bulur. eklenmediyse tüm odaları getirir.
        const { roomId } = req.query;
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

        if (!roomId) {
            const allRooms = await Room.find();
            if (!allRooms.length > 0) return res.status(400).json({ message: 'Veritabanında kayıtlı oda yok.'});

            return res.status(200).json({ success: true, data: allRooms });
        } else {
            const findRoom = await Room.findOne({ _id: roomId });
            if (!findRoom) return res.status(400).json({ message: 'Oda bulunamadı.' });

            return res.status(200).json({ success: true, data: findRoom });
        }
        
    } catch (error) {
        return res.status(500).json({ error: 'Sunucu Hatası' });
    }
};