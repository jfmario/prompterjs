
var basicFunctions = require ( './lib/functions/basic' );
var complexFunctions = require ( './lib/functions/complex' );
var specialFunctions = require ( './lib/functions/special' );

this.get = basicFunctions.get;
this.getString = basicFunctions.getString;
this.getNumber = basicFunctions.getNumber;
this.getInt = basicFunctions.getInt;
this.getAck = basicFunctions.getAck;

this.getArray = complexFunctions.getArray;
this.getNumberArray = complexFunctions.getNumberArray;
this.getIntArray = complexFunctions.getIntArray;
this.getObject = complexFunctions.getObject;

this.getIpAddress = specialFunctions.getIpAddress;
