#!/usr/bin/env node
// console.log('hello I am web cli base vue3!')

import { Command } from "commander";
// const pkg = require("../package.json")
import pkg from '../package.json' assert { type: "json" };

const program = new Command()

program.version(pkg.version, "-v --version")
// 子命令
program.command('create [projectName]', 'create a new project')//[projectName] 是可选参
program.command('open [projectName]', 'create a new project')//[projectName] 是可选参

program.parse(process.argv)