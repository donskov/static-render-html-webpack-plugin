import fs from 'fs-extra';
import path from 'path';
import { expect } from 'chai';
import webpack from 'webpack';
import rimraf from 'rimraf';
import StaticRenderHtmlWebpackPlugin from '../src';
import prettyError from '../src/utils/errors';

const RELATIVE_DIR = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, '../dist_test');
const ENTRY_FILE = path.join(__dirname, './fixtures/index.js');

const testWebpackCompile = (webpackConfig, expectedResults, outputFile, done, expectErrors) => {
  webpack(webpackConfig, (error, stats) => {
    const compilationErrors = (stats.compilation.errors || []).join('\n');

    if (expectErrors) {
      expect(compilationErrors).to.equal(expectErrors.join('\n'));
      return done();
    }
    expect(compilationErrors).to.equal('');

    if (
      outputFile && Array.isArray(outputFile) &&
      expectedResults && Array.isArray(expectedResults)
    ) {
      outputFile.map((fileName, key) => {
        expect(stats.compilation.assets).to.have.property(fileName);
        return expect(stats.compilation.assets[fileName].source()).to.equal(expectedResults[key]);
      });
    }

    return done();
  });
};

describe('Static Render Html Webpack Plugin', () => {
  const config = {
    entry: ENTRY_FILE,
    output: {
      path: OUTPUT_DIR,
      filename: 'main.js',
    },
    plugins: [],
  };

  beforeEach((done) => {
    rimraf(OUTPUT_DIR, [], done);
  });

  afterEach((done) => {
    rimraf(OUTPUT_DIR, [], done);
  });

  it('should add error entry property not found to compilation', (done) => {
    config.plugins = [new StaticRenderHtmlWebpackPlugin()];
    testWebpackCompile(config, 'Error', null, done, [prettyError.emptyEntry(RELATIVE_DIR)]);
  });

  it('should add error entry file extension to compilation', (done) => {
    const entry = path.join(__dirname, './fixtures/styles.css');
    config.plugins = [new StaticRenderHtmlWebpackPlugin({
      entry,
    })];
    testWebpackCompile(config, 'Error', null, done, [prettyError.fileExtension(entry, RELATIVE_DIR)]);
  });

  it('should add error not valid ReactElement to compilation', (done) => {
    const entry = path.join(__dirname, './fixtures/some_function.js');
    config.plugins = [new StaticRenderHtmlWebpackPlugin({
      entry,
    })];
    testWebpackCompile(config, 'Error', null, done, [prettyError.errorWrapper('Invariant Violation: renderToStaticMarkup(): You must pass a valid ReactElement.')]);
  });

  it('should create main.html in output dir', (done) => {
    const entry = path.join(__dirname, './fixtures/main.jsx');
    config.plugins = [new StaticRenderHtmlWebpackPlugin({
      entry,
      pretty: true,
    })];

    const expectHtmlNames = [
      'main.html',
    ];
    const expectHtmlSources = [
      fs.readFileSync(path.join(__dirname, './fixtures/main.html'), 'utf8'),
    ];
    testWebpackCompile(config, expectHtmlSources, expectHtmlNames, done);
  });

  it('should create main.html, about.html, contacts.html in output dir', (done) => {
    const entry = path.join(__dirname, './fixtures/multiple_html.jsx');
    config.plugins = [new StaticRenderHtmlWebpackPlugin({
      entry,
      pretty: true,
    })];

    const expectHtmlNames = [
      'main.html',
      'about.html',
      'contacts.html',
    ];
    const expectHtmlSources = [
      fs.readFileSync(path.join(__dirname, './fixtures/main.html'), 'utf8'),
      fs.readFileSync(path.join(__dirname, './fixtures/about.html'), 'utf8'),
      fs.readFileSync(path.join(__dirname, './fixtures/contacts.html'), 'utf8'),
    ];
    testWebpackCompile(config, expectHtmlSources, expectHtmlNames, done);
  });
});
