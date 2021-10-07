const path = require('path');
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
}

// all pages pug 

let pages_pug = [];
let pages = glob.sync(PATHS.src + '/pages/*/*.pug');
pages.forEach(function (file) {
    let base = path.basename(file, '.pug');
    pages_pug.push(
        new HtmlWebpackPlugin({
            filename: './' + base + '.html',
            template: PATHS.src + '/pages/' + base + '/' + base + '.pug',
            inject: true,
            minify: false
        })
    )
});

module.exports = {
    entry: {
        'entry': PATHS.src + "/entry.js",
    },

    output: {
        path: PATHS.dist,
        filename: "./js/[name].js",
    },

    devServer: {
        open: true,
        compress: true,
        hot: true,
        port: 8080,
        static: PATHS.src,
        devMiddleware: {
            writeToDisk: true
        }
    },

    plugins: [
        //Очищаем dist
        new CleanWebpackPlugin(),

        // Компиляция всех страниц pug в html
        ...pages_pug,

        // Компиляция index.pug в html
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: PATHS.src + '/pages/index/index.pug',
            inject: true,
            minify: false
        }),

        new miniCss({
            filename: './css/[name].min.css',
            chunkFilename: '[name]',
        }),

    ],

    module: {
        rules: [

            // js babel
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },

            // pug loader
            {
                test: /\.pug$/,
                loader: "pug-loader",
                options: {
                    pretty: true
                }
            },

            // images
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/img/*/*',
            },

            // scss loader
            {
                test: /\.(scss|css)$/,
                use: [miniCss.loader, 'css-loader', 'sass-loader'],
            },


        ]
    },

    // resolve: {
    //     extensions: ['.js', '.json'],
    // },

};