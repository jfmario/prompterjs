
var prompter = require ( '../index' );

console.log ( prompter.getString ( "What is your name?" ) );
console.log ( prompter.getString ( "What is your name with a default?",
{
    default: 'John'
}));
console.log ( prompter.getString ( "What is your name with a default?",
{
    default: 'John',
    showDefault: true
}));
console.log ( prompter.get ( "What is your name with a default?",
{
    wrappers: [parseInt]
}));
