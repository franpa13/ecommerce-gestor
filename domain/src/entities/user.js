"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    id;
    name;
    email;
    passwordHash;
    role;
    constructor(id, name, email, passwordHash, role = 'customer') {
        this.id = id;
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map