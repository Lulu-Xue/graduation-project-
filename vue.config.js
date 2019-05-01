module.exports = {
    // 选项...
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/css/_common.scss";`
            }
        }
    },
    // 输出文件目录
    outputDir: 'dist',
}