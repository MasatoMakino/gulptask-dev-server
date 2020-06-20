"use strict";
exports.server = require("./bin").get("./dist", { ignore: "**/*.json" });

exports.server_without_php = require("./bin").get("./dist", {
  ignore: "**/*.json",
  usePhpDevServer: false,
});
