var mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');

var card_infoSchema = new mongoose.Schema({
    id_wallet: String,
    card_number: String,
    expiring_date : String
    // whatever else
});

// Add any other plugins or middleware here. For example, middleware for hashing passwords

var encKey = process.env.SOME_32BYTE_BASE64_STRING;
var sigKey = process.env.SOME_64BYTE_BASE64_STRING;

card_infoSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey , excludeFromEncryption: ['id_wallet']  });
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = Card_info = mongoose.model('Card_info', card_infoSchema);