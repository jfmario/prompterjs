
var basicFunctions = require ( './basic' );

this.getArray = function ( prompt, options )
{

    if ( !options ) options = {};
    if ( !options.hasOwnProperty ( 'sep' ) ) options.sep = ',';

    var userInput = basicFunctions.get ( prompt, {
        default: ''
    });

    if ( userInput == '' ) return [];

    var arr = userInput.split ( options.sep );

    if ( options.hasOwnProperty ( 'itemWrappers') )
    {
        for ( var i = 0; i < arr.length; ++i )
        {
            for ( var j = 0; j < options.itemWrappers.length; ++j )
                arr [i] = options.itemWrappers [j] ( arr [i] );
        }
    }
    if ( options.hasOwnProperty ( 'wrappers' ) )
    {
        for ( var i = 0; i < options.wrappers.length; ++i )
            arr = options.wrappers [i] ( arr );
    }

    return arr;
};
this.getNumberArray = function ( prompt, options )
{

    if ( !options ) options = {};
    if ( !options.hasOwnProperty ( 'sep' ) ) options.sep = ' ';

    var arrOptions = {
        itemWrappers: [Number],
        sep: options.sep
    };
    return this.getArray ( prompt, arrOptions );
};
this.getIntArray = function ( prompt, options )
{

    if ( !options ) options = {};
    if ( !options.hasOwnProperty ( 'sep' ) ) options.sep = ' ';

    var arrOptions = {
        itemWrappers: [Number, parseInt],
        sep: options.sep
    };
    return this.getArray ( prompt, arrOptions );
};
this.getObject = function ( prompt, options )
{

    if ( !options ) options = {};
    if ( !options.hasOwnProperty ( 'sep' ) ) options.sep = ',';
    if ( !options.hasOwnProperty ( 'kvSep') ) options.kvSep = ':';

    var arr = this.getArray ( prompt, options );
    var obj = {};

    for ( var i = 0; i < arr.length; ++i )
    {

        var pair = arr [i].split ( options.kvSep );
        var key = pair [0];
        var value = pair [1];

        key = key.trim ();
        obj [key] = value;
    }

    return obj;
};
