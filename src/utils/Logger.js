// Logger util untuk development / debug
export const Logger = {
    info: (label, value) => console.info(`[INFO] ${label}:`, value),
    warn: (label, value) => console.warn(`[WARN] ${label}:`, value),
    error: (label, value) => console.error(`[ERROR] ${label}:`, value),
    debug: (label, value) => console.debug(`[DEBUG] ${label}:`, value)
};
