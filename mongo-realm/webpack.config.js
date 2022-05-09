const glob = require('glob')
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: glob.sync('./mongo-realm/functions/**/*.ts').reduce((acc, path) => {
      if (path.includes('/utility/')) return acc;
      const filename = path.split('/').pop();
      if (filename.includes('.d.ts')) return acc;
      if (filename.includes('.test.ts')) return acc;
      const entry = path.replace(`/${filename}`, '')
      acc[entry] = path
      return acc
  }, {}),

  mode: 'none',

  target: 'node',

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/node_modules/],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  output: {
    filename: './[name]/source.js',
    path: path.resolve(__dirname, '..'),
    iife: false,
    library: 'exports',
    libraryTarget: 'assign',
    libraryExport: 'default'
  },

  externals: [ nodeExternals(), { jsonwebtoken: 'commonjs2 jsonwebtoken' } ]
};
