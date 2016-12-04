
var basicFunctions = require ( './basic' );

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
