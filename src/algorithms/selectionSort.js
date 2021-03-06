  algorithms.selectionSort = function selectionSort(array) {
    var len = array.length,
        min,
        i,
        j;
    
    for (i = 0; i < len - 1; ++i) {
      min = i;
      for (j = i + 1; j < len; ++j) {
        if (_compare(j, '<', min)) {
          min = j;
        }
      }
      
      _swap(i, min);
    }
  };