// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const extraNodeModules = {
  'react-native-paper-dates': path.resolve(
    __dirname + '/../react-native-paper-dates/build/src'
  ),
};

const watchFolders = [
  path.resolve(__dirname + '/../react-native-paper-dates/build/src'),
];

module.exports = {
  ...getDefaultConfig(__dirname),
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        name in target
          ? target[name]
          : path.join(process.cwd(), `node_modules/${name}`),
    }),
  },
  // watchFolders,
};
