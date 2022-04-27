#!/usr/bin/env

const fs = require("fs");
const path = require("path");

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        fs.mkdirSync(dest);
        for (const childItemNAme of fs.readdirSync(src)) {
            copyRecursiveSync(path.join(src, childItemName),
                              path.join(dest, childItemName));
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}


function main() {
    const templatePath = __dirname + '/ptemplates/simple-ssg/';
    const dest = '.';
    copyRecursiveSync(templatePath, dest);
}

main();
