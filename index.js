export default function flexible(window, document, options) {
    const docEl = document.documentElement;
    const dpr = window.devicePixelRatio || 1;

    // adjust body font size
    function setBodyFontSize() {
        if (document.body) {
            // eslint-disable-next-line no-param-reassign
            document.body.style.fontSize = `${12 * dpr}px`;
        } else {
            document.addEventListener("DOMContentLoaded", setBodyFontSize);
        }
    }
    if (options && !!options.enableDPR) {
        setBodyFontSize();
    }

    function setRootFontSize(rem) {
        if (options && options.maxFontSize && rem > options.maxFontSize) {
            rem = options.maxFontSize;
        } else if (
            options &&
            options.minFontSize &&
            rem < options.minFontSize
        ) {
            rem = options.minFontSize;
        }

        docEl.style.fontSize = `${rem}px`;
    }

    // set 1rem = viewWidth / 10
    function setRemUnit() {
        let rem = docEl.clientWidth / 10;
        setRootFontSize(rem);

        const realitySize = Number(
            window.getComputedStyle(docEl).fontSize.slice(0, -2)
        );
        if (realitySize !== rem) {
            rem = (rem * rem) / realitySize;
            console.info(
                `[Info]由于系统字体异常，目前以还原至原始字符大小：${realitySize} => ${rem}`
            );
            setRootFontSize(rem);
        }
    }

    setRemUnit();

    // reset rem unit on page resize
    window.addEventListener("resize", setRemUnit);
    window.addEventListener("pageshow", function (e) {
        if (e.persisted) {
            setRemUnit();
        }
    });

    // detect 0.5px supports
    if (dpr >= 2) {
        const fakeBody = document.createElement("body");
        const testElement = document.createElement("div");
        testElement.style.border = ".5px solid transparent";
        fakeBody.appendChild(testElement);
        docEl.appendChild(fakeBody);
        if (testElement.offsetHeight === 1) {
            docEl.classList.add("hairlines");
        }
        docEl.removeChild(fakeBody);
    }
}
