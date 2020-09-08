const { mathjax } = require('mathjax-full/js/mathjax.js');
const { CHTML } = require('mathjax-full/js/output/chtml.js');
const { MathML } = require('mathjax-full/js/input/mathml.js');
const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js');
const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js');
const { AssistiveMmlHandler } = require('mathjax-full/js/a11y/assistive-mml.js');

const DEFAULT_OPTIONS = {
    width: 1280,
    ex: 8,
    em: 16,
    fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2'
}

function MMLToCHTML(str, opts) {
    const options = opts ? { ...DEFAULT_OPTIONS, ...opts } : DEFAULT_OPTIONS;

    const ASSISTIVE_MML = false, FONT_CACHE = true, INLINE = false, CSS = false;

    const adaptor = liteAdaptor();
    const handler = RegisterHTMLHandler(adaptor);
    if (ASSISTIVE_MML) AssistiveMmlHandler(handler);

    const mml = new MathML();
    const chtml = new CHTML({ fontURL: options.fontURL });
    const html = mathjax.document('', { InputJax: mml, OutputJax: chtml });

    const node = html.convert(str, {
        display: !INLINE,
        em: options.em,
        ex: options.ex,
        containerWidth: options.width
    });

    const svgString = CSS ? adaptor.textContent(svg.styleSheet(html)) : adaptor.outerHTML(node);

    return svgString.replace(
        /<mjx-container.*?>(.*)<\/mjx-container>/gi,
        "$1"
    );
}

module.exports = MMLToCHTML;