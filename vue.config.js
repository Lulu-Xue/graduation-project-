module.exports = {
    // 选项...
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/css/_common.scss";`
            }
        }
    },
    //3.当运行vue-cli-service build时生成的生产环境构建环境的目录。用法和webpack的output.path一样，不要修改output.path
    outputDir: 'server/public',

    //4.放置打包后生成的静态资源（js、css、img、fonts）的目录，该目录相对于outputDir。
    // assetsDir: '../',

    //5.指定生成的index.html的输出路径，相对于outputDir。也可以是一个绝对路径。
    // indexPath: '../index.html',

    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                // pathRewrite: {
                //     '^/api': ''
                // }
            }
        }
    }
}