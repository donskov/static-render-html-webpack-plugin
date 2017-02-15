import chalk from 'chalk';

const errorWrapper = error => (
  chalk.red(`Static Render Html Webpack Plugin: ${error}`)
);

export default {
  emptyEntry: context => (
    errorWrapper(`Could not find entry property in options.\n${context}`)
  ),
  fileExtension: (file, context) => (
    errorWrapper(`Entry file extension ${file} don't correct. Expect '.js' or '.jsx' file.\n${context}`)
  ),
  errorWrapper: error => (
    errorWrapper(error)
  ),
};
