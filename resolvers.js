const createId = require('uuid/v4');

module.exports = {
    Query: {
        me: (parent, args, {me}) => {
            return me;
        },
        user: (parent, {models}) => {
            return models.users.find((user) => user.id === id);
        },
        users: (parent, args, {models}) => models.users,
        messages: (parent, args, {models}) => models.messages,
        message: (parent, {models}) => {
            return models.messages.find((m) => m.id === id);
        },
    },
    Mutation: {
        createMessage: (parent, {text}, {me, models}) => {
            const message = {
                id: createId(),
                text,
                user: me,
            };

            models.messages.push(message);
            models.users = models.users.map((user) => 
                user.id === message.user.id ? 
                    {
                        ...user, 
                        messageIds: user.messageIds.concat(message.id), 
                    } 
                    : user
            
                    )

            return message;
        },
        deleteMessage: (parent, {id}, {models}) => {
            const updatedMessages = models.messages.filter((message) => message.id !== id);

            if (updatedMessages.length !== models.messages.length - 1) {
                return false;
            }

            models.messages = updatedMessages;
            
            models.users = models.users.map((user) => 
                user.messageIds.includes(id) ? 
                    {
                        ...user,
                        messageIds: user.messageIds.filter((mId) => mId !== id),
                    } 
                    : user
            );

            return true; 
        },
        editMessage: (parent, {message}, {models}) => {
            let updated = false;

            models.messages = models.messages.map((m) =>
                m.id === message.id ?
                    (updated = true, message)
                    : m
            );

            return updated;
        }
    },
    User: {
        messages: (parent, args, {models}) => {
            return models.messages.filter((m) => parent.messageIds.includes(m.id));    
        }
    },
    Message: {
        user: (parent, args, {models}) => {
            return models.users.find((u) => u.id === parent.userId);
        }
    }
};