export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
    address: string;
    constructor(){
    }
    get fullName():string{
        return this.firstName + ' ' + this.lastName;
    }
}