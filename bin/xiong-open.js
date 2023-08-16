#!/usr/bin/env node
// const path = require('path');
import fs from 'fs';
import shelljs from 'shelljs'
import { Command } from "commander";
import chalk from "chalk"
const program = new Command()
// const inquirerPrompt = require('inquirer-autocomplete-prompt');
// const inquirer = require("inquirer")
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';

const workspace = '/Users/john/workspace';
const testPath = '/Users/john/test';
const projects = []
function read(dir) {
    let files = []
    try {
        files = fs.readdirSync(dir);

    } catch (error) {
        return;
    }
    // console.log(files, 'files');
    files.forEach(file => {
        const isProject = fs.existsSync(`${dir}/${file}/package.json`);
        if (file.startsWith('.')) return;
        if(file.match('node_modules')) return;
        if (isProject) {
            projects.push({
                file,
                dir
            })
        } else {
            read(`${dir}/${file}`)
        }
    })
}
read(workspace);
read(testPath);


inquirer.registerPrompt('autocomplete', inquirerPrompt);
inquirer
    .prompt([
        {
            type: 'autocomplete',
            name: 'multiline',
            pageSize: 20,
            message: '打开某个workspace的项目',
            source: (test, input) =>
                projects.filter(i => i.file.match(input)).map(i => `${i.dir}/${i.file}`),
        },
    ])
    .then((answers) => {
        // etc
        console.log(answers, 'answers');
        const { multiline } = answers;

        shelljs.exec(`code ${multiline}`)
    });