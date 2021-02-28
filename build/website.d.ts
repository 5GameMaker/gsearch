import 'colors';
import { JSDOM } from 'jsdom';
export declare class WebSite {
    url: URL;
    dom?: JSDOM;
    constructor(url: URL);
    finalize(): Promise<void>;
    static wsds: WebSiteDialog[];
}
export interface WebSiteDialog {
    check(site: URL): boolean;
    prompt(site: WebSite): Promise<void>;
}
//# sourceMappingURL=website.d.ts.map