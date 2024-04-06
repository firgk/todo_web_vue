const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9999', // 后端服务器的URL
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api' // 如果后端接口的URL中有/api前缀，可以通过pathRewrite将其去除
        }
      }
    },
    port: 8082 // 指定端口号
  }
}
