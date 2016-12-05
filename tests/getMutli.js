
var prompter = require ( '../' );

console.log (prompter.multi ([
    {
        name: 'username',
        prompt: "Type your username:",
        pType: 'user'
    },
    {
        name: 'password',
        prompt: "Type your password:",
        pType: 'pass'
    },
    {
        name: 'ip',
        prompt: "Type the server's IP address:",
        pType: 'ip'
    },
    {
        default: 8000,
        min: 0,
        max: 65535,
        name: 'port',
        prompt: "What port?",
        pType: 'int',
        showDefault: true
    },
    {
        name: 'amStupid',
        prompt: "Are you an idiot?",
        pType: 'ask'
    }
]));
