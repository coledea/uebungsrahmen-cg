'use strict';

const fs = require('fs');
const path = require('path');
const defines = require('../../defines.json');
const findNewestFile = require('./findNewestFile');

function isTgz(file) {
    const lower = file.toLowerCase();
    return lower.endsWith('.tgz') || lower.endsWith('.tar.gz');
}

function isAssignementJson(file) {
    return path.basename(file) === defines.assignmentConfig;
}

function containsAssignementJson(dir) {
    return fs.readdirSync(dir, { withFileTypes: true })
        .some((e) => isAssignementJson(e.name));
}

/**
 * Chooses a tgz file, either by checking a given file or searching a directory.
 * If the given path is a file, it's checked if it seems to be a tgz archive.
 * If the given path is a dir, the newest file inside it is chosen.
 * @param {string} target Path to either a tgz archive or a folder containing
 * at least one tgz archive.
 * @returns {string?} The path to the chosen archive, or undefined if no valid
 * archive was found.
 */
function chooseArchive(target) {
    const exists = !!target && fs.existsSync(target);
    if (!exists) return undefined;

    const stat = fs.statSync(target);
    if (stat.isFile()) {
        if (isTgz(target)) return target;
        if (isAssignementJson(target)) console.log(
            `${target} is an unpacked ${defines.assignmentConfig}! ` +
            'Please do not unpack the archive manually.');
        console.log(`Given file ${target} isn't a tgz archive.`);
        return undefined;
    }
    else if (stat.isDirectory()) {
        if (containsAssignementJson(target)) console.log(
            `${target} contains an unpacked ${defines.assignmentConfig}! ` +
            'Please do not unpack the archive manually.');
        return findNewestFile(target, (e) => isTgz(e.name));
    }

    return undefined;
}

module.exports = chooseArchive;
