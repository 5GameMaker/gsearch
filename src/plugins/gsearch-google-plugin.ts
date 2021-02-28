import { WebSite, WebSiteDialog } from "../website"

export class GoogleWebSiteDialog implements WebSiteDialog {
    check(site: URL): boolean {
        return !!site.hostname.match(/(www\.)?google\.com/);
    }

    async prompt(site: WebSite): Promise<void> {
        const results = site.dom?.window.document.querySelectorAll('body > div#main > div > div.ZINbbc.xpd.O9g5cc.uUPGi');

        if (!results || results.length == 0) {
            console.log("No search results".red);
            return;
        }

        const data = [...results.values()].map(e => {
            return {
                title: (e.querySelector('h3.zBAuLc > div') || { innerHTML: 'untitled' }).innerHTML,
                href: new URL(`https://google.com${(e.querySelector('div.kCrYT > a') as (any | undefined) || { href: '/url' }).href}`).searchParams.get('q'),
                description: (e.querySelector('div.Ap5OSd > div.BNeawe.s3v9rd.AP7Wnd') || { innerHTML: 'no description' }).innerHTML,
            }
        });

        for (const piece of data) {
            if (!piece.href || piece.href == 'about:blank') continue;

            let supported = false;
            for (const p of WebSite.wsds) {
                if (p.check(new URL(piece.href))) {
                    supported = true;
                    break;
                }
            }

            console.log(`${piece.title.yellow}${supported ? '' : ' [NOT SUPPORTED]'.red}\n${piece.href.white}\n${piece.description.gray}\n\n`);
        }
    }
}

WebSite.wsds.push(new GoogleWebSiteDialog());
