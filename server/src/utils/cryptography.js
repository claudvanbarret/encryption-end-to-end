const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const { publicKey, privateKey } = require('../keys');

const privateDecrypt = (key) => {
  const decryptedKey = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(key, 'base64')
  );

  return decryptedKey.toString();
};

const publicEncrypt = (key) => {
  const encryptedData = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(key)
  );

  return encryptedData.toString('base64');
};

const encryptAES = (data, key) => {
  const encryptedData = CryptoJS.AES.encrypt(data, key).toString();

  return encryptedData;
};

const decryptAES = (cipherText, key) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, key);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

  return decryptedData;
};

module.exports = {
  privateDecrypt,
  publicEncrypt,
  encryptAES,
  decryptAES,
};
