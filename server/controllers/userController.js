import bcrypt from "bcrypt";
import User from '../models/User.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import { verifyJwtToken } from '../lib/jwt.js';

dotenv.config();
// http://localhost:5000/api/v1/user/signup -> adresine post isteği kullanıcı oluşturma işlemi.
export const signUp = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Maille kaydedilen kullanıcı var mı kontrol ediyorum.
        const userExist = await User.findOne({ email });

        // daha önce kaydedilmiş ise hata mesajı gönderiyorum.
        if (userExist) 
            return res.status(400).json({ success: false, message: 'Bu kullanıcı zaten kayıtlı.'});
        
        // kullanıcının parolası kriptolanmış haliyle db'ye kaydı yapılıyor.
        const hashedPass = await bcrypt.hash(password, 10);

        // Kullanıcı oluşturma işlemi
        const createUser = await User.create({
            fullname,
            email,
            password: hashedPass
        });
        
        // kullanıcının password'ünü response'tan çıkarıyoruz
        const userWithoutPassword = { ...createUser.toObject(), password: undefined };
        // success olduğunda response olarak dönüyorum.
        return res.status(201).json({ success: true, message:'Kullanıcı Oluşturuldu.', data: userWithoutPassword});
    } catch (error) {
        //beklenmeyen bir hata olduğunda dönülen response
        return res.status(500).json({ error: error.message });
    }
}

// http://localhost:5000/api/v1/user/signin -> adresine post isteği kullanıcı giriş işlemlerinde kullanılır.

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcı sistemde kayıtlı mı kontrol ediyorum.
        const user = await User.findOne({ email });

        // kayıtlı değilse bulunamadı şeklinde mesaj iletiyorum.
        if( !user )
            return res.status(400).json({ message: 'Kayıtlı kullanıcı bulunamadı.'});

        // eğer kayıt var ise şifre doğrulaması yapıyorum
        const isPassCorrectly = await bcrypt.compare(password, user.password);

        // şifre doğrulaması başarısız olursa şifre yanlış şeklinde mesaj. 
        // şifre doğru ise access ve refresh token ile beraber girişin başarılı olduğuna dair response dönüyorum.
        if( !isPassCorrectly ) {
            return res.status(400).json({ message: 'Yanlış şifre' });
        } else {
            const userId = user.id;
            const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
            const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '24h'});

            return res.status(200).json({ 
                success: true, 
                message: 'Giriş başarılı', 
                access: accessToken, 
                refresh: refreshToken 
            });
        }
        } catch (error) {
            //beklenmeyen bir hata olduğunda dönülen response
        return res.status(500).json({ error: error.message });
    }
}

// http://localhost:5000/api/v1/user/all -> tüm kullanıcıları listeler
export const allUsers = async (req, res) => {
    try {
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
       //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTZkZGQyYTFkMzg1NTg4YzY3YWIzZWIiLCJpYXQiOjE3MDIwNTQ5NTMsImV4cCI6MTcwMjA1Nzk1M30.suqXZoHE9PZPtClb6WdLqcCdbROToPu2y2WuTnIUKdY
        const users = await User.find({}, { password: 0 });
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// http://localhost:5000/api/v1/user/get-me -> kullanıcının kendi bilgilerini getirir.
export const getMe = async (req, res) => {
    try {
        const { userId } = req.query;
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(403).json({ message: 'Authorization header required' });
        }

       const accessToken = authorization.split(' ')[1];

       if (!accessToken) {
           return res.status(403).json({ message: 'Access token required' });
       }
       
       const decodedToken = verifyJwtToken(accessToken)
       if (!decodedToken) {
           return res.status(403).json({ message: 'Invalid access token' });
       }
        const user = await User.findOne({ _id: userId }, { password: 0 });
        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
