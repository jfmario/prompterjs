
var prompter = require ( '../index' );

console.log ( prompter.getInt ( "What is your favorite number?" ) );
console.log ( prompter.getInt ( "Nonnegative number",
{
    min: 0
}));
console.log ( prompter.getInt ( "Nonpositive number",
{
    default: -100,
    max: 0
}));
console.log ( prompter.getInt ( "Number between 1 and 10.",
{
    min: 1,
    max: 10
}));
