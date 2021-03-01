"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const website_1 = require("./website");
require("./plugins/gsearch-google-plugin");
require("./plugins/gsearch-github-gist-plugin");
__exportStar(require("./website"), exports);
const readline_1 = require("readline");
readline_1.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
async function main(args) {
    if (!process.stdout.isTTY) {
        console.log(`This command must run on tty`.red);
        return;
    }
    if (args.length === 0) {
        console.log(`Usage: gsearch ${"<request>".yellow}`);
        return;
    }
    const request = `https://google.com/search?q=${encodeURIComponent(args[0])}`;
    const site = new website_1.WebSite(new URL(request));
    await site.finalize();
}
if (require.main == module && !require.parent)
    main(process.argv.slice(2));
//# sourceMappingURL=index.js.map