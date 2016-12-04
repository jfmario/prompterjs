
var prompter = require ( '../index' );

console.log ( prompter.getNumber ( "What is your favorite number?" ) );
console.log ( prompter.getNumber ( "Nonnegative number",
{
    min: 0
}));
console.log ( prompter.getNumber ( "Nonpositive number",
{
    default: -100,
    max: 0
}));
console.log ( prompter.getNumber ( "Number between 1 and 10.",
{
    min: 1,
    max: 10
}));
