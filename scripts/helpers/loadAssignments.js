'use strict';

const fs = require('fs');
const path = require('path');
const defines = require('../../defines.json');
const json = require('./json');

/**
 * Loads the assignments file.
 * @param {*} targetDir Directory to look in.
 * @returns {import('../types').LoadAssignmentsResult} Assignments data and
 * path to respective json file.
 */
function loadAssignments(targetDir) {
    const assignmentsPath = path.join(
        process.cwd(), targetDir, defines.assignmentsConfig);
    return {
        assignmentsPath: assignmentsPath,
        assignments:
            fs.existsSync(assignmentsPath) ? json.read(assignmentsPath) : []
    };
}

module.exports = loadAssignments;
