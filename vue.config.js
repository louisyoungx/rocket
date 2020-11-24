module.exports = {
    devServer: {
        proxy: {
            '/API': {
                //target: 'http://127.0.0.1:8000',
                target: 'http://45.40.234.190:8080',
                changeOrigin: true,
            }
        }
    },
    pwa: {
        name: 'Rocket',
        themeColor: '#2c3e50',
        msTileColor: '#2c3e50',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: '#2c3e50',
        iconPaths:{
            favicon16: './img/logos/Rocket-16x16.jpg',
            favicon32: './img/logos/Rocket-32x32.jpg',
            appleTouchIcon: './img/logos/Rocket-152x152.jpg',
            maskIcon: './img/logos/Rocket-16x16.svg',
            msTileImage: './img/logos/Rocket-144x144.jpg',
        }
    }
}
