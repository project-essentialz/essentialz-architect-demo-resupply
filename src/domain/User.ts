export class User{
    username?: string
    password?: string
    role?: string

    details?: {
        name: string,
        phone?: string,
        email?: string
    }

    authorization?: {
        token: string
    }
}
