human-time
==========

Prints milliseconds time for human reading. Very customizable. Designed for use with Node.js and the browser.

## Installation

To install it on Node.js:

```sh
npm install custom-human-time
```

Require in Node.js:

```js
var HumanTime = require('custom-human-time');
```

In the Browser

```html
<script type="text/javascript" src="human-time.js"></script>
<script type="text/javascript">
  var humanTime = new HumanTime;
  humanTime.print(1000);
</script>
```

## Usage

```js
var humanTime = new HumanTime;

humanTime.print(1000); // => "1 second"
humanTime.print(2000); // => "2 seconds"
humanTime.print(120 * 1000); // => "2 minutes"
humanTime.print(4900); // => "5 seconds"
humanTime.print(Date.now()) // => "45 years" (2015-1970)
```

## Options

The constructor accepts an options parameter.

* `names` is an object that can be used to print the time units in other format than the default. Can be used for appending "ago" or for using another language. The character `` ` `` (backtick) is used to indicate where the plural goes. For example:
```js
// In spanish:
var humanTime = new HumanTime({names: {
  millisecond: ' milisegundo`',
  second: ' segundo`',
  minute: ' minuto`',
  hour: ' hora`',
  day: ' día`',
  week: ' semana`',
  month: ' mes`',
  year: ' año`',
}});

// " time ago"
var humanTime = new HumanTime({names: {
  millisecond: ' millisecond` ago',
  second: ' second` ago',
  minute: ' minute` ago',
  hour: ' hour` ago',
  day: ' day` ago',
  week: ' week` ago',
  month: ' month` ago',
  year: ' year` ago',
}});

// time units
var humanTime = new HumanTime({names: {
  millisecond: 'ms',
  second: 's',
  minute: 'm',
  hour: 'h',
  day: 'd',
  week: 'w',
  month: 'M',
  year: 'y',
}});
```
* `plurals` is an object that can be used to change the letters of any name. In the above example, the plural for "mes" is "meses". So, to fix that, use the code below:
```js
var humanTime = new HumanTime({
  names: {
    millisecond: ' milisegundo`',
    second: ' segundo`',
    minute: ' minuto`',
    hour: ' hora`',
    day: ' día`',
    week: ' semana`',
    month: ' mes`',
    year: ' año`',
  },
  plurals: {
    month: 'es'
  }
});
```
* `digits` indicates how many digits to print after the decimal point. By default it is `undefined`.
```js
var humanTime = new HumanTime({digits: 2});
humanTime.print(1234); // "1.23 seconds"
```
* `round` is the function used to "round" the number. For example, if you want to use precision or truncate:
```js
// Precision
var precisionRound = function(num, digits) {
  return +num.toPrecision(digits);
};
var humanTime = new HumanTime({digits: 3, round: precisionRound});
humanTime.print(54321); // => "54.3 seconds"

// Truncate
var truncateRound = function(num) {
  return num >> 0;
};
var humanTime = new HumanTime({round: truncateRound});
humanTime.print(1999); // => "1 second"
```

All these options can be modified after using the constructor.
```js
var humanTime = new HumanTime;
humanTime.digits = 1;
humanTime.print(1234) // => "1.2 seconds"
```

