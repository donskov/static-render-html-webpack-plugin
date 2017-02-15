'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _errorWrapper = function _errorWrapper(error) {
  return _chalk2.default.red('Static Render Html Webpack Plugin: ' + error);
};

exports.default = {
  emptyEntry: function emptyEntry(context) {
    return _errorWrapper('Could not find entry property in options.\n' + context);
  },
  fileExtension: function fileExtension(file, context) {
    return _errorWrapper('Entry file extension ' + file + ' don\'t correct. Expect \'.js\' or \'.jsx\' file.\n' + context);
  },
  errorWrapper: function errorWrapper(error) {
    return _errorWrapper(error);
  }
};