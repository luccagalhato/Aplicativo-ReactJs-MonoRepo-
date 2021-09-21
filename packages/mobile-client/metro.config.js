/* eslint-disable @typescript-eslint/no-var-requires */
const { createMetroConfiguration } = require("expo-yarn-workspaces");
const { mergeConfig } = require("metro-config");
const { assetExts, sourceExts } = require("metro-config/src/defaults/defaults");

const workspaceConfig = createMetroConfiguration(__dirname);

module.exports = mergeConfig(workspaceConfig, {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
  },
});
