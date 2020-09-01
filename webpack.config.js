let path = require('path');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

let conf = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './public/'),
        filename: 'js/main.js',
        publicPath: 'public/'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/styles.css'
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['ru'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            "@babel/plugin-transform-react-jsx",
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose": true }]
                        ]
                    }
                }
            },
            {
                test: /\.module\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[local]__[sha1:hash:hex:7]'
                            }
                        }
                    }
                ]
            },
            {
                test: /^((?!\.module).)*css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    }, 
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.ts']
    },
    devServer: {
       historyApiFallback: true,
        overlay: true,
    }
};

module.exports = conf;