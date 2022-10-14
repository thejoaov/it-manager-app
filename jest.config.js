module.exports = {
  globals: {
    __DEV__: false,
  },
  silent: true,
  preset: "jest-expo",
  // timers: 'fake',
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    // "@testing-library/jest-native/extend-expect",
    "./jest.setup.js",
  ],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  // moduleNameMapper: {
  //   "@assets/(.*)": "<rootDir>/src/assets/$1",
  //   "@components/(.*)": "<rootDir>/src/components/$1",
  //   "@constants/(.*)": "<rootDir>/src/constants/$1",
  //   "@contexts/(.*)": "<rootDir>/src/contexts/$1",
  //   "@data/(.*)": "<rootDir>/src/data/$1",
  //   "@hooks/(.*)": "<rootDir>/src/hooks/$1",
  //   "@navigation/(.*)": "<rootDir>/src/navigation/$1",
  //   "@screens/(.*)": "<rootDir>/src/screens/$1",
  //   "@services/(.*)": "<rootDir>/src/services/$1",
  //   "@translations/(.*)": "<rootDir>/src/translations/$1",
  //   "@utils/(.*)": "<rootDir>/src/utils/$1",
  //   "@translations": "<rootDir>/src/translations",
  // },
  reporters: ["default"],
};
