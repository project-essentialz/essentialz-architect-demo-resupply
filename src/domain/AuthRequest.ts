export class AuthRequest{
    username: string
    password: string
    provider: string

    constructor(username: string, password: string, provider: string) {
        this.username = username;
        this.password = password;
        this.provider = provider;
    }
}

