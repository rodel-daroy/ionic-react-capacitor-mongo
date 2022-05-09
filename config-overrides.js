const path = require('path');
const tsconfig = require("./tsconfig.paths.json");
const { pathsToModuleNameMapper } = require('ts-jest/utils');

module.exports = {
  webpack: function override(config, env) {
      const target = config.module.rules[1].oneOf.find((rule) => String(rule.test) === String(/\.(js|mjs|jsx|ts|tsx)$/));
      target.options.plugins.push([
          "formatjs",
          {
              "idInterpolationPattern": "[sha512:contenthash:base64:6]",
              "ast": true
          }
      ]);

      config.resolve = {
          ...config.resolve,
          alias: {
              ...config.alias,
              'src': path.resolve(__dirname, 'src')
          },
      };

      config.plugins = config.plugins.map(plugin => {
          if (plugin.constructor.name === 'InjectManifest') {
              plugin.config.maximumFileSizeToCacheInBytes = 10000000;
          }

          return plugin;
      });

      return config;
  },

  jest: function override(config) {
    config.moduleNameMapper = {
      ...config.moduleNameMapper,
      ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/' }),
    };

    return config;
  }
}
