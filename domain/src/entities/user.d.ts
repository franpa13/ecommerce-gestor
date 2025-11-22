export declare class User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: 'customer' | 'admin';
    constructor(id: string, name: string, email: string, passwordHash: string, role?: 'customer' | 'admin');
}
//# sourceMappingURL=user.d.ts.map