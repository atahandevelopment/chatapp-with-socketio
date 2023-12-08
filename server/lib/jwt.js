import jwt from "jsonwebtoken";

// access token almak için kullnaılan fonksiyon
export function signJwtToken(payload, options = {}) {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  options.expiresIn = parseInt(options.expiresIn, 10);
  const token = jwt.sign(payload, secret, options);
  return token;
}

// access token doğrulama için kullanılır
export function verifyJwtToken(token) {
  try {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
// Refresh token generate etmek için kullanılır
export function signRefreshToken(payload, options = {}) {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  const token = jwt.sign(payload, secret, options);
  return token;
}

// Refresh token doğrulama işlemleri
export function verifyRefreshToken(token) {
  try {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
