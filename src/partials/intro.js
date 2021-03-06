(function() {
  'use strict';
  var algorithms = {},
      // Storing reference to array to be sorted, for use with internal helper functions
      _array,
      // Timestamp function to benchmark the runtime of each sorting algorithm
      _now;

  /* Stats on latest sort - runtime in ms, array element comparisons, 
    array element accesses, sort type */
  var stats = {
    sort: null,
    runtime: 0,
    comparisons: 0,
    swaps: 0
  };
  
  if (typeof window === 'undefined') {
    // http://stackoverflow.com/questions/11725691/how-to-get-a-microtime-in-node-js
    _now = function _now() {
      var hrTime = process.hrtime();
      return (hrTime[0] * 100000 + hrTime[1] / 100000);
    };
  } else { 
    // performance.now() polyfill https://gist.github.com/paulirish/5438650
    if (typeof window.performance === 'undefined') {
      window.performance = {};
    }

    if (!window.performance.now) {
      var nowOffset = Date.now();

      if (window.performance.timing && window.performance.timing.navigationStart) {
        nowOffset = window.performance.timing.navigationStart;
      }

      window.performance.now = function now() {
        return Date.now() - nowOffset;
      };
    }

    _now = function _now() {
      return window.performance.now();
    };
  }

  function _noop() {}
  
  function _min(first, second) {
    return first <= second ? first : second;
  }
  
  // Swaps the values at two given array indexes - two array element accesses
  function _swap(first, second) {
    var temp;
    
    if (first === second) {
      return; 
    }
    
    temp = _array[first];
    _array[first] = _array[second];
    _array[second] = temp;
    
    stats.swaps++;
    algorithms.afterSwap(_array, first, second);
  }
  
  // Compares the value at two given array indexes
  function _compare(first, operator, second) {
    var bool;
    
    if (operator === '>') {
      bool = _array[first] > _array[second];    
    }
    else if (operator === '>=') {
      bool = _array[first] >= _array[second];  
    }
    else if (operator === '<') {
      bool = _array[first] < _array[second];    
    } 
    else if (operator === '<=') {
      bool = _array[first] <= _array[second];
    } else {
      throw new Error('Unknown operator used.');  
    }
    
    stats.comparisons++;
    algorithms.afterComparison(_array, first, second);
    return bool;
  }