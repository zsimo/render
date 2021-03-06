"use strict";

/**
 * Given the "manifest" param, returns the content of a php config file.
 * Every page uses different hash based upon the content of the files themselves.
 * The manifest object has as key the page name and the file extension dot separated
 * and as the value the complete file name with the extension.
 * Only Css file have a sha256 based hash.
 * @example
 * {
 *   "feedback.js": "feedback_fbef9bfdaad4d79e95fd.js",
 *   "holidays.css": "holidays_f33c3a85282c0adaa520e7d4b6e6bc75972dba102efe318fad5026f39c315cd1.css",
 *   "holidays.js": "holidays_e3c136fcc339d974cd1b.js"
 * }
 *
 * @param {object} manifest
 *
 * @author Simone Sacchi
 * @version 2018/02/09
 */
module.exports = function (manifest) {

    var fileContent = `<?php

/**
  * WebPack manifest
  *
  * This file contains the hashes identifying the latest version of webpack-ed client files.
  * For each file, the hash is generated based upon the file content.
  *
  * It is automatically generated by WebPack:
  *  - humans MUST NOT touch it!
  *  - it must be uploaded together with client files
*/
return [
    ${Object.keys(manifest).map(page =>
        `'${page.replace(".", "_")}' => '${manifest[page]}'`
        ).join(",\n\t")}
];
`;

    return fileContent;


};