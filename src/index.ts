import 'colors';
import { WebSite } from './website';

import './plugins/gsearch-google-plugin';
import './plugins/gsearch-github-gist-plugin';

export * from './website';

import { emitKeypressEvents } from 'readline';
emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

async function main(args : string[]) {
    if (!process.stdout.isTTY) {
        console.log(`This command must run on tty`.red);
        return;
    }
    
    if (args.length === 0) {
        console.log(`Usage: gsearch ${"<request>".yellow}`);
        return;
    }

    const request = `https://google.com/search?q=${encodeURIComponent(args[0])}`;

    const site = new WebSite(new URL(request));

    await site.finalize();
}
if (require.main == module && !(require as any).parent) main(process.argv.slice(2));
