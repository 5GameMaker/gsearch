"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSite = void 0;
require("colors");
const jsdom_1 = require("jsdom");
const node_fetch_1 = __importDefault(require("node-fetch"));
class WebSite {
    constructor(url) {
        this.url = url;
        this.dom = undefined;
    }
    async finalize() {
        const text = await (await node_fetch_1.default(this.url)).text();
        require('fs').writeFileSync('./latest.html', text);
        this.dom = new jsdom_1.JSDOM(text);
        for (const wsd of WebSite.wsds) {
            if (wsd.check(this.url)) {
                await wsd.prompt(this);
                return;
            }
        }
        console.log("No parsers found".red);
    }
}
exports.WebSite = WebSite;
WebSite.wsds = [];
//# sourceMappingURL=website.js.map