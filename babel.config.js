module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          // alias: {
          //   '@': './src/*',
          //   //   '@features': './src/features',
          //   //   '@global': './src/global',
          //   //   '@theme': './src/theme',
          // },
          extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
        },
      ],
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          allowUndefined: false,
        },
      ],
    ],
  };
};
