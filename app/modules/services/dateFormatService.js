// http://qiita.com/osakanafish/items/c64fe8a34e7221e811d0

'use strict';

var dateFormatService = angular.module('dateFormatService', []);

dateFormatService.factory('DateFormat', function() {
  function format(date, formatPattern) {
    if (!formatPattern) {
      formatPattern =  'YYYY-MM-DDThh:mm:ss';
    }

    formatPattern = formatPattern.replace(/YYYY/g, date.getFullYear());
    formatPattern = formatPattern.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    formatPattern = formatPattern.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    formatPattern = formatPattern.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    formatPattern = formatPattern.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));

    if (formatPattern.match(/S/g)) {
      var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
      var length = formatPattern.match(/S/g).length;
      for (var i = 0; i < length; i++) {
        formatPattern = formatPattern.replace(/S/, milliSeconds.substring(i, i + 1));
      }
    }

    return formatPattern;
  }

  return {
    format: format
  };

});
