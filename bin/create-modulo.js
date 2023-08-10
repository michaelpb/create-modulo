#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const http = require('http'); // or 'https' for https:// URLs
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
    console.log(TERM.LOGO, '       ', ...args);
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
            "start": "cd src && npm exec -y http-server",
            "startcms": "cd src && npm exec -y netlify-cms-proxy-server",
            "build": "npm install --dev && modulocli ssg -f",
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
    if (argArray[0].endsWith('modulo.js') || argArray[0].endsWith('create-modulo')) {
        argArray.shift(); // shift again, if necessary
    }
    return argArray;
}

function downloadFile(url, outPath, callback) {
    const file = fs.createWriteStream(outPath, 'utf8');
    //const request = http.get(url, (response) => {
    http.get(url, response => {
        response.pipe(file);
        file.on("finish", () => {
            file.close(); // After download completed close filestream
            callback();
        });
    });
}


/*
function npmInstallSync(name) {
    log(`Beginning "npm install express"`);
    child_process.execSync(`cd ${name} && npm install --save-dev express`);

    log(`Beginning "npm install mdu.js"`);
    child_process.execSync(`cd ${name} && npm install --save-dev mdu.js`);
    const mjsInput = `${ name }/node_modules/mdu.js/src/Modulo.js`;
    const mjsOutput = `${ name }/src/static/js/Modulo.js`;
    copyRecursiveSync(mjsInput, mjsOutput);
}
*/

function jsonWriteSync(name) {
    const path = `./${ name }/package.json`;
    const data = getPackageJSON(name);
    const dataStr = JSON.stringify(data, null, 4);
    fs.writeFileSync(path, dataStr);
    log(`Created Modulo project at: ${ name }/`);
}

function main() {
    const VERSION = '0.0.53';
    const FULL_URL = `http://unpkg.com/mdu.js@${ VERSION }/src/Modulo.js`;
    const args = parseArgs(Array.from(process.argv));
    let name = 'new-modulo-app';
    if (args.length < 1) {
        log(`Defaulting to "${ name }"`);
    } else {
        name = args[0];
    }

    let templateName = null;
    if (args.length < 2) {
        templateName = 'jamstack-cms';
    } else {
        templateName = args[1];
    }
    log(`Project template: "${ templateName }"`);

    const templatePath = path.join(__dirname, '..', 'ptemplates', templateName);
    copyRecursiveSync(templatePath, name);
    jsonWriteSync(name);
    // npmInstallSync(name);
    downloadFile(FULL_URL, `${ name }/src/static/js/Modulo.js`, () => {
        logSuccess(`Run the following to run http-server:`);
        log(`cd ${ name }/`);
        log(`npm start`);
    });
}

main();
