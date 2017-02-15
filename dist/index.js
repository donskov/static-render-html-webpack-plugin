'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pretty = require('pretty');

var _pretty2 = _interopRequireDefault(_pretty);

var _requirefresh = require('requirefresh');

var _requirefresh2 = _interopRequireDefault(_requirefresh);

var _errors = require('./utils/errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('babel-register')({
  extensions: ['.js', '.jsx']
});

var StaticRenderHtmlWebpackPlugin = function () {
  function StaticRenderHtmlWebpackPlugin(options) {
    _classCallCheck(this, StaticRenderHtmlWebpackPlugin);

    this.options = Object.assign({}, {
      entry: '',
      pretty: false
    }, options);
  }

  _createClass(StaticRenderHtmlWebpackPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      var entry = this.options.entry;

      compiler.plugin('emit', function (compilation, callback) {
        var result = '';

        if (!entry) {
          compilation.errors.push(_errors2.default.emptyEntry(compiler.context));
          return callback();
        }

        var FILE_SUPPORT_REGEXP = /.(js|jsx)$/g;
        var fileExtension = entry.split('.');
        fileExtension = '.' + fileExtension[fileExtension.length - 1];

        if (!FILE_SUPPORT_REGEXP.test(fileExtension)) {
          compilation.errors.push(_errors2.default.fileExtension(entry, compiler.context));
          return callback();
        }

        try {
          result = (0, _requirefresh2.default)(entry);
        } catch (error) {
          compilation.errors.push(_errors2.default.errorWrapper(error));
          return callback();
        }

        compilation.fileDependencies.push(entry);

        if (result.default && _typeof(result.default) === 'object') {
          result = result.default;
        }

        Object.keys(result).map(function (key) {
          var file = {
            name: key + '.html',
            source: result[key],
            size: result[key].length
          };

          var html = file.source;

          if (_this.options.pretty) {
            try {
              html = (0, _pretty2.default)(html);
            } catch (error) {
              html = 'Error: \'' + error + '\'\nFile: \'' + entry + '\'\nProperty: \'' + key + '\'';
              compilation.errors.push(_errors2.default.errorWrapper(error));
            }
          }

          compilation.assets[file.name] = {
            source: function source() {
              return html;
            },
            size: function size() {
              return file.size;
            }
          };
        });
        callback();
      });
    }
  }]);

  return StaticRenderHtmlWebpackPlugin;
}();

module.exports = StaticRenderHtmlWebpackPlugin;