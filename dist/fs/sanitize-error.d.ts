/**
 * Error message sanitization utility.
 *
 * This module has NO Node.js dependencies (no `node:fs`, etc.) so it can
 * safely be imported in browser bundles.
 */
/**
 * Sanitize an error message to strip real OS filesystem paths and stack traces.
 *
 * - Replaces common OS path prefixes (/Users/, /home/, /private/, C:\, etc.)
 *   with `<path>` to prevent information leakage about the host filesystem.
 * - Strips stack trace lines (`\n    at ...`).
 * - Preserves error codes (ENOENT, EACCES, etc.) and virtual paths that don't
 *   match known OS prefixes.
 */
export declare function sanitizeErrorMessage(message: string): string;
