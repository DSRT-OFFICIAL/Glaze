export class Logger {
    static debug(...args) { console.debug('[Glaze DEBUG]', ...args); }
    static info(...args) { console.info('[Glaze INFO]', ...args); }
    static warn(...args) { console.warn('[Glaze WARN]', ...args); }
    static error(...args) { console.error('[Glaze ERROR]', ...args); }
}
