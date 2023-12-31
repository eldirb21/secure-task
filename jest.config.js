const {defaults: tsjPreset} = require('ts-jest/presets');
module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['./setupTests'],

  transformIgnorePatterns: [
    'node_modules/(?!react-native|@react-navigation/stack|react-native-biometrics)/',
  ],
};
