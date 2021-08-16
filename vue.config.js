module.exports = {
    // css 相关选项
    css: {
        /*为预处理器 loader 传递自定义选项*/
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/common.scss";`
            }
        }
    },
    devServer: {
        proxy: {
            '/': {
                target: 'http://127.0.0.1:8777/',
                changeOrigin: true
            }
        }
    }
}