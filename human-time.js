/*!
 * human-time
 * https://github.com/tfoxy/human-time
 *
 * Copyright 2015 Tomás Fox
 * Released under the MIT license
 */


(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.humanTime = factory();
  }
}(this, function () {
  'use strict';

  var names = {
    'zero': 0,
    'millisecond': ' millisecond`',
    'second': ' second`',
    'minute': ' minute`',
    'hour': ' hour`',
    'day': ' day`',
    'week': ' week`',
    'month': ' month`',
    'year': ' year`'
  };

  var plurals = {
    'millisecond': 's',
    'second': 's',
    'minute': 's',
    'hour': 's',
    'day': 's',
    'week': 's',
    'month': 's',
    'year': 's'
  };

  var T = function(name, time) {
    this.name = name;
    this.time = time;
  };

  var times = [
    new T('millisecond', 1),
    new T('second', 1000),
    new T('minute', 60 * 1000),
    new T('hour', 60 * 60 * 1000),
    new T('day', 24 * 60 * 60 * 1000),
    new T('week', 7 * 24 * 60 * 60 * 1000),
    new T('month', 30 * 24 * 60 * 60 * 1000),
    new T('year', 365 * 24 * 60 * 60 * 1000)
  ];


  var fixedRound = function(num, n) {
    return +num.toFixed(n);
  };


  var makeCopyOf = function(obj) {
    return JSON.parse(JSON.stringify(obj));
  };


  var mergeObjects = function(baseObj, addObj) {
    var mergeObj = makeCopyOf(baseObj);

    if (typeof addObj === 'object') {
      for (var key in addObj) {
        if (Object.prototype.hasOwnProperty.call(addObj, key))
          mergeObj[key] = addObj[key];
      }
    }

    return mergeObj;
  };


  var HumanTime = function(options) {
    options = options || {};

    this.names = mergeObjects(names, options.names);

    this.plurals = mergeObjects(plurals, options.plurals);

    if (typeof options.round === 'function') {
      this.round = options.round;
    }
    else {
      this.round = fixedRound;
    }

    this.digits = options.digits;
  };


  HumanTime.prototype.print = function(time) {
    if (time < 1) {
      return names.zero.toString();
    }

    for (var i = 0; i < times.length; ++i) {
      var t = times[i];
      if (time < t.time) {
        return this._print(time, times[i-1]);
      }
    }

    return this._print(time, times[times.length - 1]);
  };


  HumanTime.prototype._print = function(time, t) {
    var printedTime = this.round(time / t.time, this.digits);
    var name = this.names[t.name];
    var plural = printedTime === 1? '' : this.plurals[t.name];

    return printedTime + name.replace('`', plural);
  };


  return HumanTime;
}));
