/**
 * Shared utilities for real-filesystem-backed IFileSystem implementations
 * (OverlayFs and ReadWriteFs).
 *
 * Security-critical path validation logic lives here so both implementations
 * stay consistent.
 */
/**
 * Normalize a virtual path: resolve `.` and `..`, ensure it starts with `/`,
 * strip trailing slashes.  Pure function, no I/O.
 */
export declare function normalizePath(path: string): string;
/**
 * Check whether `resolved` is equal to, or a child of, `canonicalRoot`.
 * Uses a boundary-safe prefix check (appends `/`) so that `/data` does not
 * match `/datastore`.
 */
export declare function isPathWithinRoot(resolved: string, canonicalRoot: string): boolean;
/**
 * Validate that a real filesystem path stays within the sandbox root after
 * resolving all OS-level symlinks (including in parent components).
 *
 * Uses `realpathSync`; when the path does not exist (`ENOENT`) it walks up
 * to the nearest existing parent.  Returns `false` for any path that escapes
 * the sandbox (fail-closed on unexpected errors).
 */
export declare function validateRealPath(realPath: string, canonicalRoot: string): boolean;
/**
 * Resolve a real filesystem path to its canonical form and verify it stays
 * within the sandbox root.  Returns the canonical path on success, or `null`
 * if the path escapes the root (fail-closed on unexpected errors).
 *
 * Unlike `validateRealPath` (which returns a boolean), this function returns
 * the canonical path so callers can use it for subsequent I/O, closing the
 * TOCTOU gap where the original (unresolved) path could be swapped between
 * validation and use.
 */
export declare function resolveCanonicalPath(realPath: string, canonicalRoot: string): string | null;
/**
 * Resolve a real filesystem path to its canonical form, verify it stays
 * within the sandbox root, AND reject the path if any symlinks were
 * traversed.
 *
 * Detection: compare the relative path from `root` (unresolved) with the
 * relative path from `canonicalRoot` (resolved).  A mismatch means a
 * symlink was followed somewhere in the path.
 *
 * This piggybacks on the `realpathSync` call inside `resolveCanonicalPath`
 * — the only extra cost is one string comparison.
 */
export declare function resolveCanonicalPathNoSymlinks(realPath: string, root: string, canonicalRoot: string): string | null;
/**
 * Validate that a root directory exists and is actually a directory.
 * Throws with a descriptive message including `fsName` (e.g. "OverlayFs",
 * "ReadWriteFs") on failure.  Does NOT include the real root path in the
 * error message to prevent information leakage.
 */
export declare function validateRootDirectory(root: string, fsName: string): void;
export { sanitizeErrorMessage } from "./sanitize-error.js";
/**
 * Validate that a path does not contain null bytes.
 * Null bytes in paths can be used to truncate filenames or bypass security
 * filters.
 */
export declare function validatePath(path: string, operation: string): void;
/**
 * Sanitize a raw OS symlink target so it does not leak real filesystem paths
 * outside the sandbox.
 *
 * - Relative targets are returned as-is (they don't leak real paths).
 * - Absolute targets that resolve within the canonical root are converted to
 *   a path relative to the root (the caller decides how to present it).
 * - Absolute targets outside the root are reduced to `basename` only.
 *
 * Returns `{ withinRoot: true, relativePath }` when the target is inside the
 * sandbox, or `{ withinRoot: false, safeName }` when it is outside.
 */
export declare function sanitizeSymlinkTarget(rawTarget: string, canonicalRoot: string): {
    withinRoot: true;
    relativePath: string;
} | {
    withinRoot: false;
    safeName: string;
};
