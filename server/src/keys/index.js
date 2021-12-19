const publicKey =
  "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAqd5Y5R0ofVZ5z4mq1mPW\n8Ss3jOVstoaSNmgJhXHZfnqSzuuElw4sGJF9gGe9K27O9l88qbpIlkvjFDJg8h5t\nJuWCVz3fRLgWfbD7+TfRC1IJQkXwfAQeVHUp6mZWSblTjkp5xShEkxcLn6jDMu43\nuMpp2B55DV9x1sZ/HkXEKYXRYJj/oqXjy7kigfX75E4vYyzYuU2Aggle1l6ov7Of\nDLX4Ng4BCEePfw2ln6ro0ESCRSmSwKyEm8149Atji57N8ViEykhuwr1z2o1rlk8a\nTU06kcjZVjLk74EYd/0EEHuGD0Uqb4SdBd9LraUTyZLeQNCysNrgvlNGAhawTXhE\nvMjXwM3AP/TUaYGB4n/q882HE8im+Lp1Js+XqDyNwg66lV+nwehxfMVOI6VWGH1j\nzAq6hc09C9D4Ie1ieHbM2CVJkoVPdaBTqYXTg7xf7MKTOvmTTgp7Ikjojkys80rM\npAd+cMz9ulP8Xi1WiOIQmFEBH6UXApyGo7ZMc3qcaLLl9rOj65FYah3Fsaan3jkA\neM5uaL6njE+n8WAUBxs43FtmhagSqw1iA2vjDIfFLH4nWjp4uHQqNN3cjbJZhXmz\nsSEGA4UyKtDiCbq5ZEyF7Y5Cj5XtQtMfsYBtu7pZA65vMLpMpH9zYwblCJ+sAXhm\nuaOScNb5DEmtVWZMbdfWEX8CAwEAAQ==\n-----END PUBLIC KEY-----";

const privateKey =
  "-----BEGIN PRIVATE KEY-----\n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\nt+XLRCmjUsMBWRAmFT5r7zKOLHPcxpo=\n-----END PRIVATE KEY-----";

module.exports = {
  publicKey,
  privateKey,
};