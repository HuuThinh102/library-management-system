import CryptoJS from 'crypto-js';

const SECRET = process.env.NEXT_PUBLIC_CRYPTO_SECRET || 'cachabaclachabon';

export const encrypt = (text: string): string => {
  return CryptoJS.AES.encrypt(text, SECRET).toString();
};

export const decrypt = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};
