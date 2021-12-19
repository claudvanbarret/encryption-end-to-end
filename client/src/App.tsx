import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import api from "./services/api.service";
import { encryptByPublicKey, decryptAES } from "./helpers/cryptography";

interface Chat {
  id: string | number;
  key: string;
  messages: Message[];
}

interface Message {
  id: string | number;
  content: string;
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const getPublicKey = async () => {
    const { data } = await api.get("/public-key");
    const { publicKey } = data;
    localStorage.setItem("publicKey", publicKey);
  };

  const encrypt = async (data: string) => {
    const publicKey = localStorage.getItem("publicKey") || "";

    const encryptedKey = await encryptByPublicKey(data, publicKey);

    return encryptedKey;
  };

  const getChat = async (chatId: string | number) => {
    const transferKey = uuidv4();
    const encryptedTransferKey = await encrypt(transferKey);

    const { data } = await api.get(`/chat/${chatId}`, {
      params: { key: encryptedTransferKey },
    });

    const { chat, encryptedChatKey } = data;
    const { messages } = chat;

    const decryptedChatKey = decryptAES(encryptedChatKey, transferKey);

    const decryptedMessages = messages.map((message: Message) => ({
      ...message,
      content: decryptAES(message.content, decryptedChatKey),
    }));

    setMessages(decryptedMessages);
  };

  return (
    <div className="App">
      <button className="button" onClick={getPublicKey}>
        Get Public Key
      </button>
      <button className="button" onClick={() => getChat(1)}>
        Get Chat
      </button>
      <ul>
        {messages.map((message: Message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
