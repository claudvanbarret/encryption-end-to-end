const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const CryptoJS = require("crypto-js");

const getPublicKey = () => {
  const publicKeyPath = path.join(__dirname, "../keys/public.pem");
  const publicKey = fs.readFileSync(publicKeyPath);

  return publicKey;
};

const privateDecrypt = (key) => {
  const privateKeyPath = path.join(__dirname, "../keys/private.pem");
  const privateKey = fs.readFileSync(privateKeyPath);

  const decryptedKey = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(key, "base64")
  );

  return decryptedKey.toString();
};

const publicEncrypt = (key) => {
  const publicKey = getPublicKey();

  const encryptedData = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(key)
  );

  return encryptedData.toString("base64");
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
  getPublicKey,
  privateDecrypt,
  publicEncrypt,
  encryptAES,
  decryptAES,
};
