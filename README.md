## ENCRIPTY END-TO-END

- **Public key** (use to encrypt chat key)
- **Private key** (use to decrypt chat key)
- **Tranfer key** (use to get chat key)
- **Chat key** (use to encrypt and decrypt messages)

### 1 STEP - CONFIG

- Create a `public` and `private key` on server

### 2 STEP - GET PUBLIC KEY

- Server returns `public key` to the user

### 3 STEP - CREATE A NEW CHAT

- Generate a chat key (e.g. %SECRET_CHAT%)
- Encrytp the chat key by `public key`
- Save the encrypt key on the chat

On client

```js
const chatKey = uuid(); // %SECRET_CHAT%
const encryptedChatKey = encrypt(chatKey, public_key); // #ENCRYPTED_SECRET_CHAT#

const request = { uid: "1", key: encryptedChatKey };
```

### 4 STEP - GET CHAT KEY

On client

- Generate a new key (e.g. @KEY@)
- Encrytp the key by `public key`
- Send the id's chat and the new key the server

```js
const transferKey = uuid(); // @KEY@;
const encryptedTransferKey = encrypt(transferKey, public_key); // @ENCRYPTED_KEY@

const request = { uid: "1", key: encryptedTransferKey }; // { uid: '1', key: @ENCRYPTED_KEY@ }
```

On server

- Get the chat data by id
- Decrypt the chat key
- Decrypt the transfer key
- Encrypt the chat key by the transfer key
- Responds the the decrypt key to the client

```js
const { body } = request; // { uid: '1', key: @ENCRYPTED_KEY@ }

const chat = getChatById(body.uid); // { uid: '1', key: '#ENCRYPTED_SECRET_CHAT#' }

const decryptedChatKey = decrypt(chat.key, private_key); // %SECRET_CHAT%
const transferKey = decrypt(body.key, private_key); // @KEY@
const decryptKey = encrypt(decryptedChatKey, transferKey); // $ENCRYPTED_DECRYPT_KEY$

const response = { decryptKey }; // { hashKey: '$KEY$' }
```

On client

- Use the transferKey to decrypt the decryptKey
- Use the chat key to decrypt or encrypt the messages

```js
const transferKey = uuid(); // @KEY@; // '@KEY@';
const { decryptKey } = response; // $ENCRYPTED_DECRYPT_KEY$
const chatKey = decrypt(decryptKey, transferKey); // %SECRET_CHAT%
const message = decrypt("H3110 W0R1D!", chatKey); // "Hello World!"
```
