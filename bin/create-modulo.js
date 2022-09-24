#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const child_process = require("child_process");


const TERM = {
    MAGENTA_BG: '\x1b[45m',

    BLACK_FG: '\x1b[30m',
    MAGENTA_FG: '\x1b[35m',
    RED_FG: '\x1b[31m',
    GREEN_FG: '\x1b[32m',
    YELLOW_FG: '\x1b[33m',
    BLUE_FG: '\x1b[34m',

    RESET: '\x1b[0m',
    BRIGHT: '\x1b[1m',
    DIM: '\x1b[2m',
    UNDERSCORE: '\x1b[4m',
};
TERM.LOGO = TERM.DIM + '[%]' + TERM.RESET;
// TERM.LOGOLINE = TERM.MAGENTA_FG + '[%]' + TERM.RESET + TERM.UNDERSCORE;

const log = (...args) => {
    console.log(TERM.LOGO, '        ', ...args);
};

const logSuccess = (...args) => {
    console.log(TERM.LOGO, TERM.GREEN_FG + 'SUCCESS' + TERM.RESET, ...args);
};

function getPackageJSON(name) {
    return {
        "name": name,
        "version": "0.0.0",
        "private": true,
        "description": "...a new project...",
        "scripts": {
            "help": "modulocli help",
            "start": "modulocli srcserve",
            "build": "modulocli ssg -f",
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
    log(`Beginning "npm install express"`);
    child_process.execSync(`cd ${name} && npm install --save-dev express`);

    log(`Beginning "npm install mdu.js"`);
    child_process.execSync(`cd ${name} && npm install --save-dev mdu.js`);
    const mjsInput = `${ name }/node_modules/mdu.js/src/Modulo.js`;
    const mjsOutput = `${ name }/src/static/js/Modulo.js`;
    copyRecursiveSync(mjsInput, mjsOutput);
    logSuccess(`Run the following to get started:`);
    log(`cd ${ name }/`);
    log(`npm start`);
}

function jsonWriteSync(name) {
    const path = `./${ name }/package.json`;
    const data = getPackageJSON(name);
    const dataStr = JSON.stringify(data, null, 4);
    fs.writeFileSync(path, dataStr);
    log(`Created Modulo project at: ${ name }/`);
}

function main() {
    const templateName = 'simple-ssg';
    const templatePath = path.join(__dirname, '..', 'ptemplates', templateName);
    const args = parseArgs(Array.from(process.argv));
    let name = 'new-modulo-app';
    if (args.length < 1) {
        log(`Defaulting to "${ name }"`);
    } else {
        name = args[0];
    }
    copyRecursiveSync(templatePath, name);
    jsonWriteSync(name);
    npmInstallSync(name);
}

main();
