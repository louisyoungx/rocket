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
        appleMobileWebAppStatusBarStyle: 'black',
        iconPaths:{
            favicon16: "./img/icons/colors/Rocket-32x.png",
            favicon32: "./img/icons/single/Rocket-16x.png",
            appleTouchIcon: "./img/icons/colors/Rocket-192x.png",
            maskIcon: "./img/icons/colors/Rocket-16x.svg",
            msTileImage: "./img/icons/colors/Rocket-144x.png",
        }
    }
}
