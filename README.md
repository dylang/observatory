# Observatory [![Build Status](https://secure.travis-ci.org/dylang/observatory.svg?branch=master)](http://travis-ci.org/dylang/observatory)

> Beautiful UI for showing tasks running on the command line.

## Purpose

Instead of just logging long running tasks to the console, give your users a simple status dashboard.

![observatory](https://f.cloud.github.com/assets/51505/1339977/2cccefbe-361a-11e3-9cca-3bcf74f7e59b.gif)

## Installation

```bash
$ npm -g install observatory
```

## Examples

### `node ./examples/buzzwords.js`

An example using fake data that tries to look like a real-world usage.

### `node ./examples/long-line.js`

An example of what happens when text is so long it needs to wrap to another line.

## Usage Example

```js
var observatory = require('observatory');

//add a task to display
var task = observatory.add('Install packages...');

//while working on the task, update the status
task.running('Copying Files');

//optionally give details
task.details(percent + '% ' + filename);

//chain commands
task.status('Compressing Images')
    .details(directoryName);

//when complete
task.done('Finished!');

//or if it failed
task.fail('Ooops');
```

## Terminology

```text
[Test Runner] Running tests on Safari  Running Now  50%  CSS3 Tests
⇧ prefix      ⇧ description            ⇧ status     ⇧ details
```

## API

### `observatory.add(description)`

`description` _string_ Required description.  
**returns** a new `task`

Adds a task to the console. This method returns a `task` object, you should store it in a variable so you can use it for the methods bellow.

```
var copyFilesTask = observatory.add('Copy files');
```

## Task Methods

All task methods return the `task` object so that you can chain functions, such as `task.done().status('Installed!');`.

### `task.status(statusLabel)`

`statusLabel` _string_ Set the status value.

Displays a short message to the right of the description. Use it to show users in a word or two that suggests what is happening.

Examples:

* `task.status('Downloading');`
* `task.status('Running');`
* `task.status('Complete');`

### `task.details(detailsLabel)`

`detailsLabel` _string_ Set the details value.

Optional provide details about what's happening, such as file names, urls, tests names.

Examples:

* `task.details('Copying var/tmp/whatever to var/whater/tmp');`
* `task.details('Compressing bigimage.png');`
* `task.details('Testing services');`

### `task.done(statusLabel)`

`statusLabel` _string_ Set the status value. Default: `✓ Done`.

* `task.done();`
* `task.done('Compressed!')`

### `task.fail(statusLabel)`

`statusLabel` _string_ Set the status value. Default: `✗ Failed`.

* `task.fail();`
* `task.fail('Disconnected');


## Override Settings

### `observatory.settings(settingsObject)`

Tweak how tasks are rendered. 

`settingsObject`

* `width` Integer, width in _characters_ of the `description` and `status` area. This is used to right justify the `status`. Default is `55`.
* `prefix` Sting, Text to prepend each line. Default is `' ⫸  '`.
* `write` Function(content). Writes the content to the output. Defaults to `process.stdout.write`.
* `formatStatus` Function(statusLabel, STATE)

> **returns** `observatory` so you can use it on the `require` statement.

```
var observatory = require('observatory').settings({
  prefix: '[bower] '.white
});
```

### observatory.STATE

A constant for the different states. Only useful if you need to change `formatStatus` above.

The values:

* `observatory.STATE.active` Defaults to using default console color.
* `observatory.STATE.done` Defaults to using green.
* `observatory.STATE.fail` Defaults to using red.

## Acknowledgements

### Inspiration

* My coworker Nick at Opower for inspiring the need for this library.
* Bower, inspiring the clean layout.
* Inqurire.js, for showing console apps can have a nice UI.


## Release History
* 15 October 2015 - 1.0.0 - Update dependencies, fix tests and bugs thanks to @rstacruz.
* 20 October 2013 - 0.1.0 - Some cleanup thanks to @nickheiner, new write method.
* 15 October 2013 - 0.0.1 - First version

## License
Copyright (c) 2015 Dylan Greene  
Licensed under the MIT license.
