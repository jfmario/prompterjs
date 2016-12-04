
var prompter = require ( '../index' );

console.log ( prompter.getIpAddress ( "IP:" ) );
console.log ( prompter.getPassword ( "Password:" ) );
console.log ( prompter.getPassword ( "Password:", {
    replacement: '*'
}));
