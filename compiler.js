// compiler.js - Official Transpiler for VisuLang (/vɪʒuˈləŋ/)
// Translates VisuLang indentation-based syntax into executable JavaScript

const fs = require('fs');

// Built-in System and UI simulation wrappers for execution
const Sys = {
    print_raw: (msg) => console.log(`[Sys LOG]: ${msg}`),
    delay: (ms) => {
        const start = Date.now();
        while (Date.now() - start < ms) {} // Synchronous block for terminal testing
    }
};

const UI = {
    window: (title, w, h) => console.log(`[UI WINDOW]: Opened "${title}" (${w}x${h})`),
    text: (msg) => console.log(`[UI TEXT]: ${msg}`),
    space: (px) => console.log(`[UI SPACE]: ${px}px padding`),
    button: (label, callback) => {
        console.log(`\n[UI BUTTON RENDERED]: "${label}"`);
        console.log(`[Simulating click event...]`);
        if (callback) callback();
    },
    show_dialog: (title, msg) => console.log(`\n🔹 POPUP [${title}]: ${msg}\n`),
    render: () => console.log(`\n[UI RENDER]: Interface active and listening.`)
};

function transpileAndRun(filePath) {
    let sourceCode = fs.readFileSync(filePath, 'utf-8');

    // 1. Remove VisuLang block comments ( /- ... -/ )
    sourceCode = sourceCode.replace(/\/\-[\s\S]*?-\//g, '');

    const lines = sourceCode.split('\n');
    let jsCode = "const forever = true;\n"; // Injection for forever loop simulation
    let currentIndent = 0;
    let blockStack = [];

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('//')) return; // Ignore blank lines or inline comments

        // Calculate indentation level (count spaces)
        const indentMatch = line.match(/^ */);
        const indentCount = indentMatch ? indentMatch[0].length : 0;

        // Close blocks if indentation decreases
        while (blockStack.length > 0 && indentCount < currentIndent) {
            jsCode += " ".repeat(currentIndent - 4) + "}\n";
            blockStack.pop();
            currentIndent -= 4;
        }

        // Process VisuLang keywords
        if (trimmed.startsWith('import')) {
            // Native built-ins handled by global wrappers, skipping import text translation
            return;
        }

        let translatedLine = trimmed;

        // Translate variable declarations (var syntax matches JS natively)
        if (trimmed.startsWith('var ')) {
            translatedLine = trimmed + ";";
        }

        // Translate 'define function()' structure
        else if (trimmed.startsWith('define ')) {
            const funcName = trimmed.replace('define ', '').replace(':', '');
            translatedLine = `function ${funcName} {`;
            blockStack.push('function');
            currentIndent += 4;
        }

        // Translate control flow conditionals (if, elif, else)
        else if (trimmed.startsWith('if ') && trimmed.endsWith(':')) {
            const condition = trimmed.substring(3, trimmed.length - 1);
            translatedLine = `if (${condition}) {`;
            blockStack.push('if');
            currentIndent += 4;
        }
        else if (trimmed.startsWith('elif ') && trimmed.endsWith(':')) {
            const condition = trimmed.substring(5, trimmed.length - 1);
            translatedLine = `else if (${condition}) {`;
            blockStack.push('elif');
            currentIndent += 4;
        }
        else if (trimmed.startsWith('else:')) {
            translatedLine = `else {`;
            blockStack.push('else');
            currentIndent += 4;
        }

        // Translate loops (while, until, forever)
        else if (trimmed.startsWith('while ') && trimmed.endsWith(':')) {
            const condition = trimmed.substring(6, trimmed.length - 1);
            translatedLine = `while (${condition}) {`;
            blockStack.push('while');
            currentIndent += 4;
        }
        else if (trimmed.startsWith('until ') && trimmed.endsWith(':')) {
            const condition = trimmed.substring(6, trimmed.length - 1);
            translatedLine = `while (!(${condition})) {`; // until condition is opposite of while
            blockStack.push('until');
            currentIndent += 4;
        }
        else if (trimmed.startsWith('forever:')) {
            translatedLine = `while (forever) {`;
            blockStack.push('forever');
            currentIndent += 4;
        }

        // Translate UI buttons with indented execution blocks
        else if (trimmed.startsWith('UI.button') && trimmed.endsWith(':')) {
            const label = trimmed.match(/"([^"]*)"/)[0];
            translatedLine = `UI.button(${label}, () => {`;
            blockStack.push('button_callback');
            currentIndent += 4;
        }

        // Append line execution mapping native syntax
        jsCode += " ".repeat(indentCount) + translatedLine + "\n";
    });

    // Close any remaining opened blocks
    while (blockStack.length > 0) {
        jsCode += "}\n";
        blockStack.pop();
    }

    // Execute the compiled JavaScript code safely in scope
    try {
        eval(jsCode);
    } catch (err) {
        console.error("Compilation / Execution error inside VisuLang Runtime:\n", err.message);
    }
}

// Automatically transpile and run the historical milestone script
transpileAndRun('dejavu.vl');
      
