import * as crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = Buffer.from(process.env.SECRET_KEY_CRYPTO as string, 'base64');
const initVector = Buffer.from(process.env.INIT_VECTOR_CRYPTO as string, 'base64');

// Función para encriptar
export function encrypt(text: string): string {
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, initVector);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Función para desencriptar
export function decrypt(encryptedData: string): string {
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, initVector);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
