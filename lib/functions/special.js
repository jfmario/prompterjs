
var basicFunctions = require ( './basic' );

var booleanTranslator = function ( s )
{

    var character = s.toLowerCase () [0];
    if ( character == 'y' ) return true;

    return false;
}

this.getIpAddress = function ( prompt, options )
{

    if ( !options ) options = {};
    if ( !options.hasOwnProperty ( 'allowLocalhost' ) )
        options.allowLocalhost = true;

    var getOptions = {
        errorMessage: "Please type a valid IPv4 address or the word localhost.",
        regex: /(^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^localhost$)/
    };
    if ( options.hasOwnProperty ( 'default' ) )
        getOptions.default = options.default;
    if ( options.showDefault ) getOptions.showDefault = true;

    if ( !options.allowLocalhost )
    {
        getOptions.errorMessage = "Please type a valid IPv4 address.";
        getOptions.regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    }

    return basicFunctions.getString ( prompt, getOptions );
};
this.getPassword = function ( prompt, options )
{

    if ( !options ) options = {};

    var getOptions = {
        errorMessage: "Please type an alphanumeric string of 4 to 16 characters.",
        hidden: true,
        regex: /[a-zA-Z0-9]{4,16}/,
        replacement: ''
    };
    if ( options.hasOwnProperty ( 'errorMessage' ) )
        getOptions.errorMessage = options.errorMessage;
    if ( options.hasOwnProperty ( 'regex' ) )
        getOptions.regex = options.regex;
    if ( options.hasOwnProperty ( 'replacement' ) )
        getOptions.replacement = options.replacement;
    return basicFunctions.get ( prompt, getOptions );
};
this.getUsername = function ( prompt, options )
{

    if ( !options ) options = {};

    var getOptions = {
        errorMessage: "Please type an alphanumeric string of 4 to 16 characters.",
        regex: /[a-zA-Z0-9]{4,16}/
    };
    if ( options.hasOwnProperty ( 'errorMessage' ) )
        getOptions.errorMessage = options.errorMessage;
    if ( options.hasOwnProperty ( 'regex' ) )
        getOptions.regex = options.regex;
    return basicFunctions.get ( prompt, getOptions );
};
this.getYesNo = function ( prompt )
{
    var options = {
        errorMessage: "Please type yes or no.",
        regex: /(y|yes|n|no)/i,
        wrappers: [booleanTranslator]
    };
    return basicFunctions.get ( prompt, options );
};
this.getSelection = function ( prompt, options )
{

    if ( !options ) throw "NoOptions";
    if ( !options.options ) throw "NoOptions";

    var fullPrompt = '';
    if ( options.header ) fullPrompt = options.header + '\n\n';

    for ( var i = 0; i < options.options.length; ++i )
        fullPrompt += ( i + 1 ) + " - " + options.options [i] + '\n';
    fullPrompt += '\n' + prompt;

    var getOptions = { min: 1, max: options.options.length };
    if ( options.hasOwnProperty ( 'default' ) )
        getOptions.default = options.default;
    if ( options.showDefault ) getOptions.showDefault = true;

    var selection = basicFunctions.getInt ( fullPrompt, getOptions );

    if ( options.returnNumber ) return selection;
    else return options.options [ selection - 1 ];
};
