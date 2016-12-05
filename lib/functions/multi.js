
var basicFunctions = require ( './basic' );
var complexFunctions = require ( './complex' );
var specialFunctions = require ( './special' );

var PTYPES = {
    get: basicFunctions.get,
    str: basicFunctions.getString,
    num: basicFunctions.getNumber,
    int: basicFunctions.getInt,
    ack: basicFunctions.getAck,
    arr: complexFunctions.getArray,
    numarr: complexFunctions.getNumberArray,
    intarr: complexFunctions.getIntArray,
    obj: complexFunctions.getObject,
    ip: specialFunctions.getIpAddress,
    user: specialFunctions.getUsername,
    pass: specialFunctions.getPassword,
    ask: specialFunctions.getYesNo,
    sel: specialFunctions.getSelection
};

this.prompt = function ( obj )
{
    return PTYPES [obj.pType] ( obj.prompt, obj );
};
this.multi = function ( prompts )
{
    var returnObj = {};
    for ( var i = 0; i < prompts.length; ++i )
        returnObj [prompts[i].name] = this.prompt ( prompts [i] );
    return returnObj;
};
