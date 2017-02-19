import beautify from 'js-beautify';
import { renderToStaticMarkup } from 'react-dom/server';
import requirefresh from 'requirefresh';
import prettyError from './utils/errors';

const beautifyHtml = beautify.html;

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

      let fileExtension = entry.split('.');
      fileExtension = `.${fileExtension[fileExtension.length - 1]}`;

      const FILE_SUPPORT_REGEXP = /.(js|jsx)$/g;
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
        let renderedStaticMarkup = '';
        try {
          renderedStaticMarkup = renderToStaticMarkup(result[key]);
        } catch (error) {
          renderedStaticMarkup = `Error: '${error}'\nFile: '${entry}'\nProperty: '${key}'`;
          compilation.errors.push(prettyError.errorWrapper(error));
        }

        const file = {
          name: `${key}.html`,
          source: renderedStaticMarkup,
          size: renderedStaticMarkup.length,
        };

        let html = file.source;

        if (this.options.pretty) {
          try {
            html = beautifyHtml(html, {
              indent_size: 2,
            });
          } catch (error) {
            html = `Error: '${error}'\nFile: '${entry}'\nProperty: '${key}'`;
            compilation.errors.push(prettyError.errorWrapper(error));
          }
        }

        compilation.assets[file.name] = {
          source: () => html,
          size: () => file.size,
        };
      });
      callback();
    });
  }
}

module.exports = StaticRenderHtmlWebpackPlugin;
