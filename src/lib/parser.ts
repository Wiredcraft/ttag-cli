import { po } from "gettext-parser";
import "../declarations";

export interface Comments {
    reference: string | undefined;
}
export type Message = {
    msgid: string;
    comments: Comments;
    msgstr: string[];
};

export type Messages = {
    [key: string]: Message;
};

export type Translations = {
    [key: string]: Messages;
};

export type PoData = {
    headers: Object;
    translations: Translations;
};

export function parse(str: string): PoData {
    return po.parse(str);
}
