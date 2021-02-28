import 'colors';
import { WebSite } from './website';

import './plugins/gsearch-google-plugin';

export * from './website';

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
if (require.main == module) main(process.argv.slice(2));
