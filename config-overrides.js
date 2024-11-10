const path = require("path");
const { override, addWebpackAlias } = require("customize-cra");

module.exports = override(
  addWebpackAlias({
    "@components/shared": path.resolve(
      __dirname,
      "src/app/components/shared/index.ts"
    ),
    "@components": path.resolve(__dirname, "src/app/components/index.ts"),
    "@config": path.resolve(__dirname, "src/app/config.ts"),
    "@hoc": path.resolve(__dirname, "src/app/hoc/index.ts"),
    "@helpers": path.resolve(__dirname, "src/app/helpers/index.ts"),
    "@services": path.resolve(__dirname, "src/app/services/index.ts"),
    "@models": path.resolve(__dirname, "src/app/models/index.ts"),
  })
);
