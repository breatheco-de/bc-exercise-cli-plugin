
const path = require('path');
const nodeModulesPath = path.resolve(__dirname, '../../../../node_modules');
const babelTransformPath = require.resolve('./babelTransform.js');

module.exports = {
    verbose: true,
    prettierPath: nodeModulesPath+'/prettier',
    moduleDirectories: [nodeModulesPath],
    transform: {
      "^.+\\.js?$": babelTransformPath
    }
};