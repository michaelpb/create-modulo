#!/usr/bin/env

const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

function getPackageJSON(name, moduloVersion = "*") {
    // For now, only do "*" for new ones. Later should "lock-in" latest stable
    // version.
    return {
        "name": name,
        "version": "0.0.0",
        "private": true,
        "description": "...a new project...",
        "scripts": {
            "start": "modulocli devserve",
            "devserve": "modulocli devserve",
            "generate": "modulocli generate",
            "help": "modulocli help",
            "serve": "modulocli serve",
            "ssg": "modulocli ssg",
            "watch": "modulocli watch",
        },
        "dependencies": {
            "mdu-cli": moduloVersion,
        },
    };
}

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        try {
            fs.mkdirSync(dest);
        } catch {
            // Ignore errors
        }
        for (const childItemName of fs.readdirSync(src)) {
            copyRecursiveSync(path.join(src, childItemName),
                              path.join(dest, childItemName));
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}


function parseArgs(argArray, shiftFirst=true) {
    if (shiftFirst) {
        argArray.shift(); // always get rid of first argument
    }
    if (argArray.length < 1) {
        return argArray;
    }
    if (argArray[0].endsWith('modulo.js')) {
        argArray.shift(); // shift again, if necessary
    }
    // TODO: Need to test this with "npm exec create-modulo"
    return argArray;
}

function npmInstallSync(name) {
    console.log(`create-modulo: Beginning "npm install"`);
    child_process.execSync(`cd ${name} && npm install`);
    const mjsInput = `${ name }/node_modules/mdu-cli/src/Modulo.js`;
    const mjsOutput = `${ name }/src/static/js/Modulo.js`;
    copyRecursiveSync(mjsInput, mjsOutput);
    console.log(`create-modulo: SUCCESS  Run the following to get started:`);
    console.log(`create-modulo:          cd ${ name }/`);
    console.log(`create-modulo:          npm start`);
}

function jsonWriteSync(name) {
    const path = `./${ name }/package.json`;
    const data = getPackageJSON(name);
    const dataStr = JSON.stringify(data, null, 4);
    fs.writeFileSync(path, dataStr);
    console.log(`create-modulo: Created Modulo project at: ${ name }/`);
}

function main() {
    const templatePath = __dirname + '/ptemplates/simple-ssg/';
    const dest = '.';
    const args = parseArgs(Array.from(process.argv));
    let name = 'new-modulo-app';
    if (args.length < 1) {
        console.warn(`create-modulo: Defaulting to "${ name }"`);
    } else {
        name = args[0];
    }
    copyRecursiveSync(templatePath, name);
    jsonWriteSync(name);
    npmInstallSync(name);
}

main();
