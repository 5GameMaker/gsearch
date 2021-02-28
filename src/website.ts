import 'colors';
import { JSDOM } from 'jsdom';
import { default as fetch } from 'node-fetch';

export class WebSite {
    public url : URL;
    public dom? : JSDOM;

    constructor(url : URL) {
        this.url = url;
        this.dom = undefined;
    }

    async finalize() {
        const text = await (await fetch(this.url)).text();

        require('fs').writeFileSync('./latest.html', text);

        this.dom = new JSDOM(text);

        for (const wsd of WebSite.wsds) {
            if (wsd.check(this.url)) {
                await wsd.prompt(this);
                return;
            }
        }

        console.log("No parsers found".red);
    }

    static wsds : WebSiteDialog[] = [];
}

export interface WebSiteDialog {
    check(site: URL) : boolean;
    prompt(site : WebSite) : Promise<void>;
}
