const paths = require('./paths');
const autoprefixer = require('autoprefixer');

const fontRules = [
    {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
        loader: require.resolve('url-loader'),
        options:{
            limit:10000,
            mimetype:'application/font-woff'
        }        
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        loader: require.resolve('url-loader'),
        options:{
            limit:10000,
            mimetype:'application/octet-stream'
        } 
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        loader: require.resolve('file-loader')
      }
]

// "url" loader works like "file" loader except that it embeds assets
// smaller than specified limit in bytes as data URLs to avoid requests.
// A missing `test` is equivalent to a match.
const imageRule = {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: require.resolve('url-loader'),
    options: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]',
    },
};

// Use the SVG Loader to load svg files as react components
const svgReactRule = {
    test: /\.svg$/,
    use: [
        "babel-loader",
        {
            loader: require.resolve('react-svg-loader'), // 'react-svg'
            query: {
                svgo: {
                    pretty: true,
                    plugins: [{ removeStyleElement: true }]
                }
            }
        }
    ]
};

// Use the SVG Loader to load svg files as urls
const svgUrlRule = {
    test: /\.svg$/,
    resourceQuery: /url/,
    loader: require.resolve('url-loader'),
    options: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]',
    }
}

const typescriptRule = {
    test: /\.(ts|tsx)$/,
    include: paths.appSrc,
    loader: require.resolve('ts-loader'),
}

const postCssRule = {
    loader: require.resolve('postcss-loader'),
    options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
            }),
        ],
    },
}

// "file" loader makes sure those assets get served by WebpackDevServer.
// When you `import` an asset, you get its (virtual) filename.
// In production, they would get copied to the `build` folder.
// This loader don't uses a "test" so it will catch all modules
// that fall through the other loaders.
const fileLoaderRule = {
    // Exclude `js` files to keep "css" loader working as it injects
    // it's runtime that would otherwise processed through "file" loader.
    // Also exclude `html` and `json` extensions so they get processed
    // by webpacks internal loaders.
    exclude: [/\.js$/, /\.html$/, /\.json$/],
    loader: require.resolve('file-loader'),
    options: {
        name: 'static/media/[name].[hash:8].[ext]'
    }
}

const tsLintRule = {
    test: /\.(ts|tsx)$/,
    loader: require.resolve('tslint-loader'),
    enforce: 'pre',
    include: paths.appSrc,
}

const sourceMapRule = {
    test: /\.js$/,
    loader: require.resolve('source-map-loader'),
    enforce: 'pre',
    include: paths.appSrc,
}

const defaultOneOfRules = [
    imageRule,
    svgUrlRule,
    svgReactRule,
    typescriptRule,
    ...fontRules
]

/**
 * function to get the common OneOfRules.  Passes the default rules
 * to a delegate that allows consumer to re-order insert and mutate 
 * oneOf rules before being handed back.  The fileLoaderRule is automatically
 * added to the bottom of the array that is handed back to catch everything
 * not handled by a rule.
 * @param {*} [rulesDelegate=(r) => r]
 * @returns
 */
function getOneOfRules(rulesDelegate = (r) => r) {
    const oneOfRules = rulesDelegate([...defaultOneOfRules]);
    return {
        oneOf:[
            ...oneOfRules,
            fileLoaderRule
        ]
    }
}

const mainRules = [
    // TODO: Disable require.ensure as it's not a standard language feature.
    // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
    // { parser: { requireEnsure: false } },

    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    tsLintRule,
    sourceMapRule
]


module.exports = {
    mainRules,
    getOneOfRules,
    rules: {        
        postCssRule,
        imageRule,
        svgReactRule,
        svgUrlRule,
        typescriptRule,
        sourceMapRule,
        tsLintRule,
        fileLoaderRule
    }
}