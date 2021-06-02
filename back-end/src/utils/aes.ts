import { createDecipheriv, createCipheriv, scryptSync } from 'crypto';

const key = scryptSync('youling', 'salt', 16);
const iv = key;

export const encrypt = (plain) => {
  const decipher = createCipheriv('aes-128-cbc', key, iv);
  return decipher.update(plain, 'binary', 'base64') + decipher.final('base64');
};

export const decrypt = (crypted) => {
  const decipher = createDecipheriv('aes-128-cbc', key, iv);
  return decipher.update(crypted, 'base64', 'utf8') + decipher.final('utf8');
};
