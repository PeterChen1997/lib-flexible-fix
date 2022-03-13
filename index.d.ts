interface IOptions {
    maxFontSize?: number;
    minFontSize?: number;
    enableDPI?: boolean;
}

export default function flexible(window: Window, document: Document, options?: IOptions): void;
