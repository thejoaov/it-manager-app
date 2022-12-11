module.exports = {
  globals: {
    __DEV__: false,
  },
  silent: true,
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  moduleNameMapper: {
    // "@assets/(.*)": "<rootDir>/src/assets/$1",
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@constants/(.*)': '<rootDir>/src/constants/$1',
    '@contexts/(.*)': '<rootDir>/src/contexts/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@routes/(.*)': '<rootDir>/src/routes/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '@services/(.*)': '<rootDir>/src/services/$1',
    '@i18n/(.*)': '<rootDir>/src/i18n/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
  },
  reporters: ['default'],
};
