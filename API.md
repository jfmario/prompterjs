
# PrompterJs API #

* [Get](#get)
* [Basic Type Functions](#basic-type-functions)
    * [Get a String](#get-a-string)
    * [Get a Number](#get-a-number)
    * [Get an Integer](#get-an-integer)
    * [Get Ack](#get-ack)
* [Complex Type Function](#complex-type-functions)
    * [Get an Array](#get-an-array)
    * [Get an Array of Numbers](#get-an-array-of-numbers)
    * [Get an Array of Integers](#get-an-array-of-integers)
    * [Get an Object](#get-an-object)
* [Special Functions](#special-functions)
    * [Get an IP Address](#get-an-ip-address)
    * [Get Password](#get-password)
    * [Get Username](#get-username)
    * [Get Yes or No](#get-yes-or-no)
    * [Get Selection](#get-selection)
* [Multi-Prompt](#multi-prompt)
    * [Specified Prompt](#specified-prompt)
    * [Multiple Prompts](#multiple-prompts)

## Get #

The function `prompter.get(prompt,options)` allows full configuration.

```js
var prompter = require ( 'prompterjs' );
var username = prompter.get ( "Username: ", {
    errorMessage: "Please type an alphanumeric string with 6-18 characters.",
    regex: /[a-zA-Z0-9]{6,18}/
});
var myPrimeNumber = prompter.get ( "Prime number:", {
    errorMessage: "Please type a prime number.",
    number: true,
    validator: myIsPrimeFunction
});
```

**Possible Options**

* `default`: If the input is an empty string, return this value instead of running any validation or wrappers.
* `errorMessage`: The message to display before prompting again if validation fails.
* `hidden`: A boolean that, if true, hides the input. Useful for passwords.
* `max`: In number mode, the input must be less than or equal to this value.
* `min`: In number mode, the input must be greater than or equal to this value.
* `number`: A boolean that, if `true`, ignores any regex and attempts to convert the value to a number before running any other validation. This means a number will be passed to the `validator` and any wrapper functions.
* `regex`: A regular expression that the input should be forced to match.
* `replacement`: A character to replace input with if hidden is `true`. If nothing is provided a hidden input is completely hidden.
* `showDefault`: A boolean that, if `true` and if `default` is set, will display the default value to the user in parenthesis after the prompt.
* `validator`: A function that takes the string as an input and returns `true` or `false`. If provided, it will be run *after* the regular expression check.
* `wrappers`: A list of functions to be applied in order to the input before returning a value. See below for more details.

**Using Wrapper Functions**

If the `wrappers` option is set to `[parseFloat, parseInt]`, the return value
will be an integer. What will happen is equivalent to
`return parseInt(parseFloat(input))`. Make sure that whatever wrappers you
provide return a sane value.

**What Happens**

The prompt is displayed to the user with a trailing space:

```
What is your name:
```

If a `default` is provided and `showDefault` is `true`, the default is shown to
the user with the prompt:

```
What is your name: (John)
```

Once the user provides input, if it is the empty string and a `default` is
provided, the default is returned with no validation. This means that the
default can be an otherwise illegal input.

If `number` mode is `true`, the input is checked
to see if it converts successfully to a number. After that, it is checked to
see if it is between `min` and `max` if they are provided.

If not in `number` mode, the input string is checked against the `regex` if it
is provided.

Whether in `number` mode or not, a so far successful input is run against the
`validator` function if it is provided. If the function returns `true`, the
input is considered validated.

If the input is not validated for any reason, the `errorMessage` is displayed
in red and the process starts over.

If the input is validated, the wrappers are applied and the resulting value
is returned to the user.

## Basic Type Functions #

The basic type functions all allow the following options for `prompter.get`:

* `default`
* `showDefault`

Note that any "non-allowed" options are simply ignored.

### Get a String #

```js
prompter.getString ( "What is your name?", options );
```

Additional options:

* `errorMessage`
* `regex`
* `validator`

The default `errorMessage` is "Something when wrong." You will want to override
this if you provide validation.

### Get a Number #

```js
prompter.getNumber ( "What is your favorite number?", {
    min: 1,
    max: 100
});
```

The `errorMessage` will be set to one of the following, based on whether or
not `min` and `max` are provided.

* `Please input a number.`
* `Please input a number that is at least <min>.`
* `Please input a number that is at most <max>.`
* `Please input a number between <min> and <max>.`

### Get an Integer #

```js
prompter.getInt ( "What is your favorite integer?", {
    min: 1,
    max: 100
});
```

The `errorMessage` behaves exactly the same as with `prompter.getNumber`,
exepct that it says "integer" instead of "number".

### Get Ack #

```js
prompter.getAck ( "Press ENTER to continue..." );
```

This function takes no options and simply ignores any input and returns
nothing.

## Complex Type Functions #

For the complex type functions, no default can be set. The default is
automatically either an empty array or an empty object.

These are somewhat clunky and prone to give silly values back
 without user cooperation. Perform validation outside the function.

 These do allow wrappers, but note that by changing the return type of the
 wrapper you will override the whole point of the function.

### Get an Array #

```js
prompter.getArray ( "List out your favorite colors, comma-delimited." );
```

**Options**

* `itemWrappers`: A function chain that will be applied to every individual value in the
array. The first function is run first.
* `sep`: The item separator. Defaults to `,`.
* `wrappers`: A function chain that will be applied to the list as a whole, after the item wrappers are run.

It expects input like:

`orange, black, green,blue`

Which will return:

`['orange', ' black', ' green', 'blue']`

### Get an Array of Numbers #

```js
prompter.getNumberArray ( "List out some numbers:", {
    sep: ' '
});
```

**Options**

* `sep`: The item separator. Defaults to a space.

This function is equivalent to running `prompter.getArray()` with
`itemWrappers` as `[Number]`.

### Get an Array of Integers #

```js
prompter.getIntArray ( "List out some integers:", {
    sep: ' '
});
```

**Options**

* `sep`: The item separator. Defaults to a space.

This function is equivalent to running `prompter.getNumberArray()` except with
`itemWrappers` as `[Number,parseInt]`.

### Get an Object #

```js
prompter.getObject ( "Put an object down." );
```

**Options**

* `kvSep`: The separator between key and value within a pair. Defaults to `:`.
* `sep`: The separator BETWEEN key-value pairs. Defaults to `,`.
* `wrappers`: A function chain to be applied to whole object.

All leading and trailing white space is stripped from the keys.

This function expects input like:

`name: John, color: blue, age: 29`

Which will return:

```js
{
    age: ' 29',
    color: ' blue',
    name: ' John'
}
```

## Special Functions #

These special functions only allow `default` and `showDefault` as options
unless otherwise specified.

### Get an IP Address #

```js
prompter.getIpAddress ( "Type the server's ip: " );
```

Expects a valid IPv4 Address.

**Additional Options**

* `allowLocalhost`: A boolean value that, if `true`, allows the string
"localhost" to be accepted. Defaults to `true`.

The error message will be one of the following:

* `Please type a valid IPv4 address.`
* `Please type a valid IPv4 address or the word localhost.`

### Get Password #

```js
prompter.getPassword ( "Password", { replacement: '*' } );
```

No default is allowed.

**Options**

* `errorMessage`: The error message upon failed validation.
* `regex`: An optional regex to override the default one (see below).
* `replacement`: If provided, this character will be shown with each character typed.


### Get Username #

```js
prompter.getUsername ( "Username" );
```

No default is allowed.

**Options**

* `errorMessage`: The error message upon failed validation.
* `regex`: An optional regex to override the default one (see below).

The default regex allows 4 to 32 alphanumeric characters with no spaces. The
default error message reflects this.

### Get Yes or No #

```js
prompter.getYesNo ( "Are you cool?" );
prompter.ask ( "Are you cool?" );
```

These two functions are aliases for the same thing.

This function expects the word "yes" or "no" or the character "y" or "n". It
is case insensitive. The error message is "Please type yes or no."

A boolean is returned. Yes means `true` and no means `false`.

### Get Selection #

```js
prompter.getSelection ( "Pick one: ", {
    default: 1,
    header: "These are the choices of Pokemon",
    options: [ "Bulbasaur", "Charmander", "Squirtle" ],
    showDefault: true
});
```

The prompt will look like this:

```
These are the choices of Pokemon

1 - Bulbasaur
2 - Charmander
3 - Squirtle

Pick one: (1)
```

If 2 is selected, the string "Charmander" will be returned.

**Options**

* `default`: A default value. It should be an integer that should be the (index+1) of the value in `options` you want to be the default return value.
* `header`: An optional message to be displayed above the list.
* `options`: A list of values that must have a length of at least 1.
* `showDefault`: Whether or not to show the `default` value if it exists. Defaults to `false`.
* `returnNumber`: A boolean that, if `true`, will make this function return the number the user selected rather than the corresponding value in the options array.

The error message will be:

`Please input an integer between 1 and <options_length>.`

## Multi-Prompt #

The multi-prompt takes advantage of a special function that allows a prompt
to be specified from an object as a single argument.

### Specified Prompt #

```js
prompter.prompt ({
    allowLocalhost: false,
    prompt: "Type an ip:",
    pType: 'ip'
});
```

The above is equivalent to the following:

```js
prompter.getIpAddress ( "Type an ip:", { allowLocalhost: false } );
```

**Options**

* `prompt`: The prompt to be displayed.
* `pType`: The type of prompt, corresponding to an existing function (see below).

Everything else in the object is what should be passed as the options to that
function.

**p Types**

* `get` - `prompter.get`
* `str` - `prompter.getString`
* `num` - `prompter.getNumber`
* `int` - `prompter.getInt`
* `ack` - `prompter.getAck`
* `arr` - `prompter.getArray`
* `numarr` - `prompter.getNumberArray`
* `intarr` - `prompter.getIntegerArray`
* `obj` - `prompter.getObject`
* `ip` - `prompter.getIpAddress`
* `user` - `prompter.getUsername`
* `pass` - `prompter.getPassword`
* `ask` - `prompter.getYesNo`
* `sel` - `prompter.getSelection`

### Multiple Prompts #

The argument to `prompter.multi()` is an array of objects with a name key.
The rest of each object will be passed to `prompter.prompt()` and must include
a `prompt`, a `pType`, and all the options for that type of prompt.

The returned object will be an object containing all the responses.

```js
prompter.multi ([
    {
        name: 'username',
        prompt: "Type your username:",
        pType: 'user'
    },
    {
        name: 'password',
        prompt: "Type your password:",
        pType: 'pass'
    },
    {
        name: 'ip',
        prompt: "Type the server's IP address:",
        pType: 'ip'
    },
    {
        default: 8000,
        min: 0,
        max: 65535,
        name: 'port',
        prompt: "What port?"
        pType: 'int',
        showDefault: true
    },
    {
        name: 'amStupid',
        prompt: "Are you an idiot?",
        pType: 'ask'
    }
]);
```

The returned object will be something like this:

```js
{
    ip: '127.0.0.1',
    password: 'password123!',
    port: 8008,
    username: 'jfmario'
}
```
