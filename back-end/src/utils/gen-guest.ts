import { encrypt } from './aes';

const timestamp = Math.floor(new Date().valueOf() / 1000) + 3600 * 24 * 7;

console.log(encrypt(String(timestamp)));
