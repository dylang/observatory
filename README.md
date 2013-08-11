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
> **returns** a new `task`

Adds a task to the console. This method returns a `task` object, you should store it in a variable so you can use it for the methods bellow.

```
var copyFilesTask = taskWatch.add('Copy files');
```

### `taskWatch.settings(settingsObject)`

`settingsObject`

* `width` Integer, width in _characters_ of the `description` and `status` area. This is used to right justify the `status`. Default is `55`.
* `prefix` Sting, Text to prepend each line. Default is `' ⫸  '`.
* `formatStatus` Function(statusLabel, state)

> **returns** a `task` object so you can chain methods.



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
* `task.done('Compressed!')

### `task.fail(statusLabel)`

`statusLabel` _string_ Set the status value. Default: `✗ Failed`.


## Acknowledgements

### Inspiration

* Nick, inspiring the need for this library.
* Bower, inspiring the clean layout.
* Inqurire.js, for showing console apps can have a nice UI.
* Grunt, for making it easy and fun to build the kind of tasks that could benefit from this.

### Code

* cliColor, used for colors and moving the cursor

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Dylan Greene  
Licensed under the MIT license.
