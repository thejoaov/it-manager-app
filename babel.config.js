module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // "@babel/plugin-proposal-export-namespace-from",
      "babel-plugin-tsconfig-paths",
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        },
      ],
      "react-native-paper/babel",
      "react-native-reanimated/plugin",
    ],
  };
};
