const express = require('express');
const app = express();
const cors = require('cors');

const { privateDecrypt, encryptAES } = require('./utils/cryptography');
const { publicKey } = require('./keys');
const chats = require('./mock/chats.json');
const port = 3001;

app.use(cors());

app.get('/public-key', (req, res) => {
  res.json({ publicKey });
});

app.get('/chat/:id', (req, res) => {
  const { id } = req.params;
  const { key } = req.query;

  const chat = chats.find((chat) => chat.id == id);

  const decryptedChatKey = privateDecrypt(chat.key);
  const transferKey = privateDecrypt(key);
  const encryptedChatKey = encryptAES(decryptedChatKey, transferKey);

  res.json({ chat, encryptedChatKey });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
