const crypto = require("crypto")


class EncryptionServiceClass {
    constructor() {
        this.algorithm = 'aes-256-ctr'
    }
    encrypt(text, passphrase) {
        let cipher = crypto.createCipher(this.algorithm, passphrase)
        let crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    }
    decrypt(hash, passphrase, correctPassphrase, date) {
        if(passphrase !== correctPassphrase) {
            return false
        } 
        else if(date > Date.now()) {
            return false
        } 
        else {
            let decipher = crypto.createDecipher(this.algorithm, passphrase)
            let message = decipher.update(hash, 'hex', 'utf8')
            message += decipher.final('utf8');
            return message
        }
    }
}

module.exports = EncryptionServiceClass