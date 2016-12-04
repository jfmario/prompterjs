
var basicFunctions = require ( './basic' );

var usernameValidator = function ( s )
{
    if ( s.length > 16 ) return false;
    if ( s.length < 4 ) return false;
    return true;
};

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
}
