const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
    OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
    isDevMode = process.env.NODE_ENV !== "production",
    optimization = {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins = [];

if (!isDevMode) {
    plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
    )
}

module.exports = {
    publicPath: isDevMode ? "/" : "./",
    // outputDir: '/static',
    devServer: {
        disableHostCheck: true,
    },
    pwa: {
        name: process.env.VUE_APP_TITLE,
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/scss/_variables.scss";`
            }
        }
    },
    configureWebpack: {
        devtool: isDevMode ? "source-map" : "eval",
        plugins,
        optimization: isDevMode ? {} : optimization,
        resolve: {
            alias: {
                assets: 'src/assets/'
            }
        }
    }
};
