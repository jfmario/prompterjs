
var prompter = require ( '../index' );

console.log ( prompter.getIpAddress ( "IP:" ) );
console.log ( prompter.getPassword ( "Password:" ) );
console.log ( prompter.getPassword ( "Password:", {
    replacement: '*'
}));
console.log ( prompter.getUsername ( "Username:" ) );
console.log ( prompter.getYesNo ( "Is this all correct?" ) );
