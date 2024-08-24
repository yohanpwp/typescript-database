
interface HTMLStatusCode<N=number,T=string>  {code:N, status:T, message?:string}

class HTMLStatus implements HTMLStatusCode {
    code
    status
    message
    constructor(code:number,status:string,message?:string) {
        this.code = code;
        this.status = status;
        this.message = message;
    }
    getMessage(code:number):string {
        if (code === this.code) {
            return this.message!;
        }
        return 'Unknown status code';
    }
}

const statusOK = new HTMLStatus (200, 'OK' , 'Success');

const statusError = new HTMLStatus (400, 'Error' , 'Bad request');

const statusNotFound = new HTMLStatus (404 , 'Error' , 'Not found');

const statusInternal = new HTMLStatus (500 ,'Error' ,'Internal server error');

const statusInternalError : HTMLStatusCode = {code : 501 , status : 'Error'};

console.log(statusOK);
console.log(statusInternalError);

console.log(statusError.getMessage(404)); // Expected: 'Not found'
