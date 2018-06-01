// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

// module.exports = {
//   plugins: [
//     // your custom plugins
//   ],
//   module: {
//     rules: [
//       // add your custom rules.
//     ],
//   },
// };

const devWebpackConfig = require('../config/webpack.config.dev');
const paths = require('../config/paths');
var genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');


module.exports = (baseConfig, env) => {
  let defaultConfig = genDefaultConfig(baseConfig, env);

  defaultConfig.module.rules.unshift({
    test: /\.(ts|tsx)$/,
    include: [paths.appSrc, paths.storiesPath],
    loader: require.resolve('ts-loader'),
  });

  defaultConfig.module.rules.unshift(
    {
      test: /\.svg$/,
      use: [
        {
          loader: require.resolve('@storybook/react/node_modules/babel-loader')
        },
        {
          loader: require.resolve('react-svg-loader'),
          options:{
            jsx:true
          }
        }]
    }
  )



  // Push in resolve rules from dev config
  devWebpackConfig.resolve.extensions.forEach(e => {
    defaultConfig.resolve.extensions.push(e);
  })



  // // Push in extensions for dev config
  // devWebpackConfig.plugins.forEach(p => {
  //   defaultConfig.plugins.push(p)
  // });

  return defaultConfig;
}

