

class SignException extends Error {

    name = 'SignException';

    constructor(err) {
        super(err.message);
        this.code = err.code;
        this.message = this.handleMessage(err.message);
    }

    handleMessage = (message = "") => {
        if (this.code) return message;
        // config message
        this.code = 'ERR_SIGN_PDF';
        return message.split(":")[2] || message;
    }

}


module.exports = SignException;