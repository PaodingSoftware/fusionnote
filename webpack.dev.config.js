const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.tsx"
    },
    mode: "production",
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: { noEmit: false, sourceMap: true },
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "manifest.json",
                    to: "manifest.json"
                },
                {
                    from: "background.js",
                    to: "background.js"
                },
                {
                    from: "python_manifest.json",
                    to: "python_manifest.json"
                },
                {
                    from: "main.py",
                    to: "main.py"
                },
                {
                    from: "public/",
                },
            ],
        }),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
    },
};