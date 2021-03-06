import { parse, PoDataCompact, PoData, PoDataOmni } from "../lib/parser";
import { iterateTranslations, convert2Compact } from "../lib/utils";
import * as fs from "fs";

export default function po2json(
    path: string,
    pretty: boolean,
    nostrip: boolean,
    format: "compact" | "verbose" | "nested"
) {
    let poData: PoData | PoDataCompact | PoDataOmni = parse(
        fs.readFileSync(path).toString()
    );
    const messages = iterateTranslations(poData.translations);
    if (!nostrip) {
        const header = messages.next().value;
        delete header.comments;
        for (const msg of messages) {
            delete msg.comments;
        }
    }
    if (format === "compact") {
        poData = convert2Compact(poData);
    }

    if (format === "nested") {
        const language: string = poData?.headers?.language || "en-US";
        poData = { [language]: poData };
    }

    process.stdout.write(JSON.stringify(poData, null, pretty ? 2 : 0));
}
