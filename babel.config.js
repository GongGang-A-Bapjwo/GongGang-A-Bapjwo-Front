module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        ['@babel/plugin-transform-class-properties', { loose: true }],
        ['@babel/plugin-transform-private-methods', { loose: true }],
        ['@babel/plugin-transform-private-property-in-object', { loose: true }],
        'react-native-reanimated/plugin', // 필요한 경우 유지
        ['module:react-native-dotenv', {
            "moduleName": "@env",
            "path": ".env",
        }]
    ],
};
