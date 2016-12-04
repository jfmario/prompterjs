# PrompterJs #

An npm module that provides shortcut prompts using `prompt-sync`.

## Getting Started #

```
npm install prompterjs
```

## Why #

`prompt` is great, but is async. `prompt-sync` is great, but I wanted a few more features.

## Use #

```js
var prompter = require ( 'prompterjs' );
var username = prompter.getString ( "What is your name?" );
```

## Docs #

For more detailed options, view the [API Guide](API.md).

## Dependencies #

* [chalk](https://www.npmjs.com/package/chalk)
* [prompt-sync](https://www.npmjs.com/package/prompt-sync)

## Author #

John F Marion
