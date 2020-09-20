"use strict";
exports.server = require("./").generateTask("./dist", { ignore: "**/*.json" });

exports.server_without_php = require("./bin").generateTask("./dist", {
  ignore: "**/*.json",
  usePhpDevServer: false,
});
