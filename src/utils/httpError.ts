

export class HttpException extends Error {
    public statusCode: number;

    constructor(statusCode: number, message: string | Error) {
        if(message instanceof Error){
            super(message.message);
            this.stack = message.stack;

        }else{
        super(message? message.toString(): '');
        this.name = " ";
        }
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
