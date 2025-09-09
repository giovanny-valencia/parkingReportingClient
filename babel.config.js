module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@app": "./src/app",
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@utils": "./src/utils",
            "@hooks": "./src/hooks",
            "@queries": "./src/queries",
            "@store": "./src/store",
            "@models/*": "./src/models",
            "@features/*": "./src/features",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
