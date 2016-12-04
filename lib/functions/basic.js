
var chalk = require ( 'chalk' );
var ps = require ( 'prompt-sync' ) ();

this.get = function ( prompt, options )
{

    if ( !options ) options = {};
    // console.log ( options );
    if ( options.default && options.showDefault )
        prompt = prompt + " (" + options.default + ")";

    prompt = prompt + ' ';

    if ( !options.hasOwnProperty ( 'errorMessage' ) )
        options.errorMessage = "Something went wrong.";

    var psOptions = {};

    if ( options.hidden )
    {
        psOptions.echo = '';
        if ( options.replacement ) psOptions.echo = options.replacement;
    }

    var isValid = false;
    while ( !isValid )
    {

        var userInput = ps ( prompt, psOptions );
        isValid = true;

        // return default if input is blank, otherwise ask again
        if ( userInput == '' )
        {
            if ( options.hasOwnProperty ( 'default' ) ) return options.default;
            else
            {

                isValid = false;

                console.log ( chalk.red ( options.errorMessage ) );

                continue;
            }
        }
        // number mode
        if ( options.number )
        {

            userInput = Number ( userInput );
            if ( isNaN ( userInput ) )
            {

                isValid = false;

                console.log ( chalk.red ( options.errorMessage ) );

                continue;
            }

            if ( options.hasOwnProperty ( 'min' ) )
            {
                if ( userInput < options.min )
                {

                    isValid = false;

                    console.log ( chalk.red ( options.errorMessage ) );

                    continue;
                }
            }
            if ( options.hasOwnProperty ( 'max' ) )
            {
                if ( userInput > options.max )
                {

                    isValid = false;

                    console.log ( chalk.red ( options.errorMessage ) );

                    continue;
                }
            }
        }
        // regex validation
        if ( options.regex )
        {
            if ( !options.regex.test ( userInput ) )
            {

                isValid = false;

                console.log ( chalk.red ( options.errorMessage ) );

                continue;
            }
        }
        // custom validation
        if ( options.validator )
        {
            if ( !options.validator ( userInput ) )
            {

                isValid = false;

                console.log ( chalk.red ( options.errorMessage ) );

                continue;
            }
        }
    }

    if ( options.hasOwnProperty ( 'wrappers' ) )
    {
        for ( var i = 0; i < options.wrappers.length; ++i )
        {
            userInput = options.wrappers [i] ( userInput );
        }
    }

    return userInput;
};
this.getString = function ( prompt, options )
{

    var getOptions = {};

    if ( !options ) options = {};
    if ( options.hasOwnProperty ( 'default' ) )
        getOptions.default = options.default;
    if ( options.showDefault ) getOptions.showDefault = true;
    if ( options.errorMessage ) getOptions.errorMessage = options.errorMessage;
    if ( options.regex ) getOptions.regex = options.regex;
    if ( options.validator ) getOptions.validator = options.validator;

    return this.get ( prompt, getOptions );
};
this.getNumber = function ( prompt, options )
{

    var getOptions = { number: true };

    if ( !options ) options = {};
    if ( options.hasOwnProperty ( 'default' ) )
        getOptions.default = options.default;
    if ( options.showDefault ) getOptions.showDefault = true;
    if ( options.hasOwnProperty ( 'min' ) ) getOptions.min = options.min;
    if ( options.hasOwnProperty ( 'max' ) ) getOptions.max = options.max;

    getOptions.errorMessage = "Please input a number."
    if ( getOptions.hasOwnProperty ( 'min') && getOptions.hasOwnProperty ( 'max' ) )
        getOptions.errorMessage = "Please input a number between " +
            options.min + " and " + options.max + '.';
    else if ( getOptions.hasOwnProperty ( 'min' ) )
        getOptions.errorMessage = "Please input a number that is at least " +
            options.min + '.';
    else if ( getOptions.hasOwnProperty ( 'max' ) )
        getOptions.errorMessage = "Please input a number that is at most " +
            options.max + '.';

    return this.get ( prompt, getOptions );
};
this.getInt = function ( prompt, options )
{

    var getOptions = { number: true };

    if ( !options ) options = {};
    if ( options.hasOwnProperty ( 'default' ) )
        getOptions.default = options.default;
    if ( options.showDefault ) getOptions.showDefault = true;
    if ( options.hasOwnProperty ( 'min' ) ) getOptions.min = options.min;
    if ( options.hasOwnProperty ( 'max' ) ) getOptions.max = options.max;

    getOptions.errorMessage = "Please input an integer."
    if ( getOptions.hasOwnProperty ( 'min') && getOptions.hasOwnProperty ( 'max' ) )
        getOptions.errorMessage = "Please input an integer between " +
            options.min + " and " + options.max + '.';
    else if ( getOptions.hasOwnProperty ( 'min' ) )
        getOptions.errorMessage = "Please input an integer that is at least " +
            options.min + '.';
    else if ( getOptions.hasOwnProperty ( 'max' ) )
        getOptions.errorMessage = "Please input an integer that is at most " +
            options.max + '.';
    getOptions.validator = function (x)
    {
        if ( x == parseInt ( x ) ) return true;
        return false;
    }

    return this.get ( prompt, getOptions );
};
this.getAck = function ( prompt )
{
    ps ( prompt + ' ' );
    return;
};
