import pretty from 'pretty';
import requirefresh from 'requirefresh';
import prettyError from './utils/errors';

require('babel-register')({
  extensions: ['.js', '.jsx'],
});

class StaticRenderHtmlWebpackPlugin {
  constructor(options) {
    this.options = Object.assign({}, {
      entry: '',
      pretty: false,
    }, options);
  }

  apply(compiler) {
    const entry = this.options.entry;

    compiler.plugin('emit', (compilation, callback) => {
      let result = '';

      if (!entry) {
        compilation.errors.push(prettyError.emptyEntry(compiler.context));
        return callback();
      }

      const FILE_SUPPORT_REGEXP = /.(js|jsx)$/g;
      let fileExtension = entry.split('.');
      fileExtension = `.${fileExtension[fileExtension.length - 1]}`;

      if (!FILE_SUPPORT_REGEXP.test(fileExtension)) {
        compilation.errors.push(prettyError.fileExtension(entry, compiler.context));
        return callback();
      }

      try {
        result = requirefresh(entry);
      } catch (error) {
        compilation.errors.push(prettyError.errorWrapper(error));
        return callback();
      }

      compilation.fileDependencies.push(entry);

      if (result.default && typeof result.default === 'object') {
        result = result.default;
      }

      Object.keys(result).map((key) => {
        const file = {
          name: `${key}.html`,
          source: result[key],
          size: result[key].length,
        };

        let html = file.source;

        if (this.options.pretty) {
          try {
            html = pretty(html);
          } catch (error) {
            html = `Error: '${error}'\nFile: '${entry}'\nProperty: '${key}'`;
            compilation.errors.push(prettyError.errorWrapper(error));
          }
        }

        compilation.assets[file.name] = {
          source: () => (
            html
          ),
          size: () => (
            file.size
          ),
        };
      });
      callback();
    });
  }
}

module.exports = StaticRenderHtmlWebpackPlugin;
