const path = require("path");
const { override, addWebpackAlias } = require("customize-cra");

module.exports = override(
  addWebpackAlias({
    "@components": path.resolve(__dirname, "src/app/components/index.ts"),
    "@config": path.resolve(__dirname, "src/app/config.ts"),
  })
);
