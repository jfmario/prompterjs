
var prompter = require ( '../index' );

console.log ( prompter.getArray ( "List your children's names:" ) );
console.log ( prompter.getArray ( "Write some words:", {
    sep: ' '
}));
console.log ( prompter.getArray ( "Write some chars:", {
    sep: ''
}));
