const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                sassOptions: {
                    includePaths: [`${__dirname}/src/styles`]
                }
            }
        }
    },
    publicPath: './',
    outputDir: path.resolve(__dirname, 'docs'),
    configureWebpack: {
        devServer: {
            hot: false,
            liveReload: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        },
        output: {
            chunkFilename: '[name].js?id=[chunkhash]',
            filename: '[name].js?id=[hash]',
            globalObject: 'window'
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            modules: [
                resolve('src'),
                resolve('node_modules')
            ],
            alias: {
                assets: path.resolve(__dirname, 'src/assets'),
                img: path.resolve(__dirname, 'src/assets/img'),
                components: path.resolve(__dirname, 'src/components'),
                handlers: path.resolve(__dirname, 'src/handlers'),
                helpers: path.resolve(__dirname, 'src/helpers'),
                models: path.resolve(__dirname, 'src/models'),
                styles: path.resolve(__dirname, 'src/styles'),
                views: path.resolve(__dirname, 'src/views')
            }
        }
    }
};
