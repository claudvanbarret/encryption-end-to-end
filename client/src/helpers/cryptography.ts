import CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';

const ALGORITHM_RSA = { name: 'RSA-OAEP', hash: 'SHA-256' };
const PEM_HEADER = '-----BEGIN PUBLIC KEY-----';
const PEM_FOOTER = '-----END PUBLIC KEY-----';

const base64StringToArrayBuffer = (b64str: string) => {
  const byteStr = Buffer.from(b64str, 'base64');
  return byteStr.buffer;
};

const arrayBufferToBase64String = (arrayBuffer: ArrayBuffer) => {
  return Buffer.from(arrayBuffer).toString('base64');
};

const convertPemToBinary = (pem: string) => {
  const content = pem.replace(PEM_HEADER, '').replace(PEM_FOOTER, '');

  return base64StringToArrayBuffer(content);
};

const importPublicKey = async (pem: string) => {
  const key = await crypto.subtle.importKey('spki', convertPemToBinary(pem), ALGORITHM_RSA, true, ['encrypt']);

  return key;
};

const encryptRSA = async (data: string, key: CryptoKey) => {
  const result = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, key, Buffer.from(data));

  return arrayBufferToBase64String(result);
};

const encryptByPublicKey = async (data: string, publicKey: string) => {
  const key = await importPublicKey(publicKey);

  const encryptedKey = await encryptRSA(data, key);

  return encryptedKey;
};

const encryptAES = (data: string, key: string) => {
  const encryptedData = CryptoJS.AES.encrypt(data, key).toString();

  return encryptedData;
};

const decryptAES = (cipherText: string, key: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, key);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

  return decryptedData;
};

export {
  base64StringToArrayBuffer,
  arrayBufferToBase64String,
  convertPemToBinary,
  importPublicKey,
  encryptByPublicKey,
  encryptRSA,
  encryptAES,
  decryptAES,
};
