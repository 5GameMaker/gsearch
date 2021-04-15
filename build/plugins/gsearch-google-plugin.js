"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleWebSiteDialog = void 0;
const website_1 = require("../website");
function prompt() {
    return new Promise(res => {
        process.stdin.once('keypress', str => {
            res(str);
        });
    });
}
class GoogleWebSiteDialog {
    check(site) {
        return site.toString().match(/https?:\/\/google\.((com)|(ru))\/search/gum) != null;
    }
    async prompt(site) {
        const results = site.dom?.window.document.querySelectorAll('body > div#main > div > div.ZINbbc.xpd.O9g5cc.uUPGi');
        if (!results || results.length == 0) {
            console.log("No search results".red);
            return;
        }
        const data = [...results.values()].map(e => {
            return {
                title: (e.querySelector('h3.zBAuLc > div') || { innerHTML: 'untitled' }).innerHTML,
                href: new URL(`https://google.com${(e.querySelector('div.kCrYT > a') || { href: '/url' }).href}`).searchParams.get('q'),
                description: (e.querySelector('div.Ap5OSd > div.BNeawe.s3v9rd.AP7Wnd') || { innerHTML: 'no description' }).innerHTML,
            };
        }).filter(a => a.href && a.href != 'about:blank').map(a => {
            let supported = null;
            for (const p of website_1.WebSite.wsds) {
                if (p.check(new URL(a.href || ''))) {
                    supported = p;
                    break;
                }
            }
            return {
                title: a.title,
                href: a.href || '',
                description: a.description,
                supported,
            };
        });
        let i = 0;
        data.reverse();
        function redraw() {
            console.clear();
            for (let pi = 0; pi < data.length - i; pi++) {
                const piece = data[pi];
                console.log(`${data.length - pi})${' '}${(a => (data.length - pi - 1) == i ? a.yellow : a)(piece.title)}${piece.supported ? '' : ' [NOT SUPPORTED]'.red}\n${piece.href.white}\n${piece.description.gray}\n\n`);
            }
            process.stdout.write(':');
            prompt().then(async (d) => {
                switch (d) {
                    case 'q':
                        process.exit(0);
                    case 'w':
                        if (i < data.length - 1)
                            i++;
                        break;
                    case 's':
                        if (i > 0)
                            i--;
                        break;
                    case 'o':
                        if (!!data[i].supported && data[i].supported !== null) {
                            const ws = new website_1.WebSite(new URL(data[i].href || ''));
                            await ws.finalize();
                            (data[i].supported || { prompt: (..._) => { } }).prompt(ws);
                        }
                        break;
                }
                redraw();
            });
        }
        redraw();
    }
}
exports.GoogleWebSiteDialog = GoogleWebSiteDialog;
website_1.WebSite.wsds.push(new GoogleWebSiteDialog());
//# sourceMappingURL=gsearch-google-plugin.js.map