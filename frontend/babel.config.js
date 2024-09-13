 module.exports = function (api) {
   api.cache(true);
   return {
     presets: ['babel-preset-expo'],
   };
 };
{/*
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env', // This is where you'll import from
        path: '.env', // This is the path to your .env file
      }]
    ],
  };
};
*/}