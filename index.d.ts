interface IOptions {
    maxFontSize?: number;
    minFontSize?: number;
    enableDPI?: boolean;
}

export default function flexible(window, document, options?: IOptions): void {}
