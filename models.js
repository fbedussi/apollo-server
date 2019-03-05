module.exports = {
    users: [
        {
            id: '1',
            name: 'Francesco Bedussi',
            age: 42,
            messageIds: ['1'],
        },
        {
            id: '2',
            name: 'Mario Rossi',
            messageIds: ['2'],
        }
    ],
    messages: [
        {
            id: '1',
            text: 'Hello world!',
            userId: '1',
        },
        {
            id: '2',
            text: 'It works!',
            userId: '2',
        },
    ],
}
