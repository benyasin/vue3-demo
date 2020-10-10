import path from 'path'

module.exports = {
    // 导入别名
    alias: {
        '/@/': path.resolve(__dirname, './src'),
        '/@views/': path.resolve(__dirname, './src/views'),
        '/@components/': path.resolve(__dirname, './src/components'),
        '/@utils/': path.resolve(__dirname, './src/utils'),
    },
    // 配置Dep优化行为
    optimizeDeps: {
        include: ["lodash"]
    },
    // 为开发服务器配置自定义代理规则。
    proxy: {
        '/foo': 'http://localhost:4567/foo',
        '/api': {
            target: 'http://jsonplaceholder.typicode.com',
            changeOrigin: true,
            rewrite: (path: string) => path.replace(/^\/api/, '')
        }
    }
    // ...
}
