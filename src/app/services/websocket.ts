class Socket {
    users: any[];

    constructor() {
        this.users = [];
    }

    addNewUser(user: object) {
        this.users.push(user);
    }
}

export default Socket;
