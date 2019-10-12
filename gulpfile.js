"use strict";
const server = require("./bin").get("./dist", {ignore:"**/*.json"});
exports.server = server;