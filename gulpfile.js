/**
 * This is a sample gulpfile.js
 */

"use strict";
exports.server = require("./").generateTask("./dist", { ignore: "**/*.json" });

exports.server_with_php = require("./").generateTask("./dist", {
  ignore: "**/*.json",
  usePhpDevServer: true,
});
