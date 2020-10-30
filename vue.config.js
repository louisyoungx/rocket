module.exports = {
    devServer: {
        proxy: {
            '/API': {
                target: 'http://127.0.0.1:8000',
                //target: 'http://45.40.234.190:8080',
                changeOrigin: true,
            }
        }
    }
}
