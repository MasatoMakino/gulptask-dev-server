"use strict";
exports.server = require("./").generateTask("./dist", { ignore: "**/*.json" });

exports.server_with_php = require("./bin").generateTask("./dist", {
  ignore: "**/*.json",
  usePhpDevServer: true,
});
