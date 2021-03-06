  // Hook up benchmarking to each sorting algorithm
  for (var algorithm in algorithms) {
    if (algorithms.hasOwnProperty(algorithm)) {
      algorithms[algorithm] = _prepareBenchmarking(algorithm);
    }
  }

  // Return performance numbers from each sorting algorithm
  function _prepareBenchmarking(algorithm) {
    var sort = algorithms[algorithm];
    
    return function sortAndBenchmark(array) {
      var startTime = _now();
      
      stats.sort = algorithm;
      stats.runtime = 0;
      stats.comparisons = 0;
      stats.swaps = 0;
      _array = array;
      
      sort(_array);
      
      _array = [];
      stats.runtime = _now() - startTime; 
      return stats;
    };
  }