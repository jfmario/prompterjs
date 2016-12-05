
var prompter = require ( '../' );

console.log ( prompter.getSelection ( "Pick one: ", {
    default: 1,
    header: "These are the choices of Pokemon",
    options: [ "Bulbasaur", "Charmander", "Squirtle" ],
    showDefault: true,
    returnNumber: true
}));
