const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin');

function createDefaultConfig (htmlName) {
  return {
    title: htmlName,
    template: `${paths.src}/${htmlName}.html`,
    filename: `${htmlName}.html`
  }
}

exports.createHtmlWebpackPluginSet = function (htmlFileSet) {
  let HtmlWebpackPluginSet = []
  let config = {
    title: null,
    template: null,
    filename: null,
    minify: { collapseWhitespace: true, removeComments: true },
    meta: {
      viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
    },
    chunks: ['main']
  }
  if (!htmlFileSet || !htmlFileSet.length) {
    return HtmlWebpackPluginSet;
  }
  for (let [s, slen] = [0, htmlFileSet.length]; s < slen; s++) {
    let newHTMLConfig = {}
    if (typeof htmlFileSet[s] === 'object') {
      newHTMLConfig = { ...config, ...createDefaultConfig(htmlFileSet[s].name) }
      if (htmlFileSet[s].chunks) {
        newHTMLConfig.chunks = [ ...config.chunks, ...htmlFileSet[s].chunks]
      }
    } else {
      newHTMLConfig = { ...config, ...createDefaultConfig(htmlFileSet[s]) }
    }
    HtmlWebpackPluginSet.push(new HtmlWebpackPlugin(newHTMLConfig))
  }
  return HtmlWebpackPluginSet
};
