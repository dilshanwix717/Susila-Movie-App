import { format, parse } from 'date-fns';

class ContactUsMessage {
    constructor(userId, name, email, message) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.message = message;
        this.createdAt = new Date();
        this.lastUpdated = new Date();
    }

    toJson() {
        const formatString = "MMMM d, yyyy 'at' h:mm:ss a 'UTC'XXX";

        return {
            userId: this.userId,
            name: this.name,
            email: this.email,
            message: this.message,
            createdAt: format(this.createdAt, formatString),
            lastUpdated: format(this.lastUpdated, formatString),
        };
    }

    static fromJson(json) {
        const formatString = "MMMM d, yyyy 'at' h:mm:ss a 'UTC'XXX";

        const createdAt = parse(json.createdAt, formatString, new Date());
        const lastUpdated = parse(json.lastUpdated, formatString, new Date());

        const message = new ContactUsMessage(
            json.userId,
            json.name,
            json.email,
            json.message
        );

        message.createdAt = createdAt;
        message.lastUpdated = lastUpdated;

        return message;
    }
}

export default ContactUsMessage;
