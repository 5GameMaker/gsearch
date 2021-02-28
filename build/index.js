"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const website_1 = require("./website");
require("./plugins/gsearch-google-plugin");
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
main(process.argv.slice(2));
//# sourceMappingURL=index.js.map