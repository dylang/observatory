# taskwatch [![Build Status](https://secure.travis-ci.org/dylang/taskwatch.png?branch=master)](http://travis-ci.org/dylang/taskwatch)

Live updating checklist on the command line. Great for long-running tasks.

# taskwatch
# taskwatcher
# statusboard
# statuslogger
> Beautiful UI for showing tasks run on the command line. 

## Purpose

Instead of just logging long running tasks to the console, give your users a simple status dashboard.

## Example UI's built with statusfrog

### Running tests

### Installing depedencies

### Compressing images

### Server Messages

## Installation

```bash
$ npm -g install taskwatch
```
## Usage

```js
var taskWatch = require('taskwatch')

//add a task to display
var task = taskWatch.add('Install packages...');

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

## Terms

```text
[Test Runner] Running tests on Chrome          Done!
[Test Runner] Running tests on Safari  Running 35/90  CSS3 Tests
⇧ prefix      ⇧ description            ⇧    status ⇧  ⇧ details
```

## API

### `taskWatch.add(description)`

`description` _string_ Required description.  
**returns** a new `task`

Adds a task to the console. This method returns a `task` object, you should store it in a variable so you can use it for the methods bellow.

```
var copyFilesTask = taskWatch.add('Copy files');
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

### `taskWatch.settings(settingsObject)`

Tweak how tasks are rendered. 

`settingsObject`

* `width` Integer, width in _characters_ of the `description` and `status` area. This is used to right justify the `status`. Default is `55`.
* `prefix` Sting, Text to prepend each line. Default is `' ⫸  '`.
* `formatStatus` Function(statusLabel, STATE)

> **returns** `taskWatch` so you can use it on the `require` statement.

```
var taskWatch = require('taskwatch').settings({
  prefix: '[bower] '.white
});
```

### taskWatch.STATE

A constant for the different states. Only useful if you need to change `formatStatus` above.

The values:

* `taskWatch.STATE.active` Defaults to using default console color.
* `taskWatch.STATE.done` Defaults to using green.
* `taskWatch.STATE.fail` Defaults to using red.

## Acknowledgements

### Inspiration

* My coworker Nick at Opower for inspiring the need for this library.
* Bower, inspiring the clean layout.
* Inqurire.js, for showing console apps can have a nice UI.
* Grunt, for making it easy and fun to build the kind of tasks that could benefit from this.

### Dependencies

* cli-color, used for coloring text and moving the cursor. It does not modify the `string` prototype and supports moving the cursor around. Feel free to use any coloring library to color the text.

## Release History
* 11 Aug 2013 - 0.1.0 - First version

## License
Copyright (c) 2013 Dylan Greene  
Licensed under the MIT license.
