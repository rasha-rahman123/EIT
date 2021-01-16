declare module 'next-auth/clisent' {
    export interface User {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        id?: number | null;
    }

}