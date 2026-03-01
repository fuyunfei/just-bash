/**
 * Defense-in-Depth Box
 *
 * A security layer that monkey-patches dangerous JavaScript globals during
 * bash script execution. Uses AsyncLocalStorage to track execution context,
 * so blocks only apply to code running within bash.exec() - not to concurrent
 * operations in the same process.
 *
 * IMPORTANT: This is a SECONDARY defense layer. It should never be relied upon
 * as the primary security mechanism. The primary security comes from proper
 * sandboxing, input validation, and architectural constraints.
 *
 * Key design decisions:
 * - AsyncLocalStorage for context tracking (blocks only affect sandboxed code)
 * - Reference counting for nested exec() calls
 * - Patches are process-wide but checks are context-aware
 * - Violations are recorded even in audit mode
 *
 * KNOWN LIMITATION - Dynamic import() cannot be blocked:
 * Dynamic `import()` is a language-level feature that cannot be intercepted
 * by property proxies or monkey-patching. An attacker with write access to
 * the filesystem could create a malicious JS module and import it:
 *   import('data:text/javascript,console.log("escaped")')
 *   import('/tmp/malicious.js')
 *
 * Mitigations for import() must be applied at other layers:
 * - Filesystem restrictions (prevent writing .js/.mjs files)
 * - Node.js module resolution hooks (--experimental-loader)
 * - Worker isolation (separate V8 contexts)
 */
import type { DefenseInDepthConfig, DefenseInDepthHandle, DefenseInDepthStats, SecurityViolation } from "./types.js";
/**
 * Error thrown when a security violation is detected and blocking is enabled.
 */
export declare class SecurityViolationError extends Error {
    readonly violation: SecurityViolation;
    constructor(message: string, violation: SecurityViolation);
}
/**
 * Defense-in-Depth Box
 *
 * Singleton class that manages security patches during bash execution.
 * Use getInstance() to get or create the instance.
 */
export declare class DefenseInDepthBox {
    private static instance;
    private config;
    private refCount;
    private originalDescriptors;
    private violations;
    private activationTime;
    private totalActiveTimeMs;
    private constructor();
    /**
     * Get or create the singleton instance.
     *
     * @param config - Configuration for the defense box. Only used on first call.
     */
    static getInstance(config?: DefenseInDepthConfig | boolean): DefenseInDepthBox;
    /**
     * Reset the singleton instance. Only use in tests.
     */
    static resetInstance(): void;
    /**
     * Check if the current async context is within sandboxed execution.
     */
    static isInSandboxedContext(): boolean;
    /**
     * Get the current execution ID if in a sandboxed context.
     */
    static getCurrentExecutionId(): string | undefined;
    /**
     * Check if defense-in-depth is enabled and functional.
     * Returns false if AsyncLocalStorage is unavailable or config.enabled is false.
     */
    isEnabled(): boolean;
    /**
     * Update configuration. Only affects future activations.
     */
    updateConfig(config: Partial<DefenseInDepthConfig>): void;
    /**
     * Activate the defense box. Returns a handle for scoped execution.
     *
     * Usage:
     * ```
     * const { run, deactivate } = box.activate();
     * try {
     *   await run(async () => {
     *     // Code here is protected
     *   });
     * } finally {
     *   deactivate();
     * }
     * ```
     */
    activate(): DefenseInDepthHandle;
    /**
     * Force deactivation, restoring all patches regardless of ref count.
     * Use for error recovery only.
     */
    forceDeactivate(): void;
    /**
     * Check if patches are currently applied.
     */
    isActive(): boolean;
    /**
     * Get statistics about the defense box.
     */
    getStats(): DefenseInDepthStats;
    /**
     * Clear stored violations. Useful for testing.
     */
    clearViolations(): void;
    /**
     * Get a human-readable path for a target object and property.
     */
    private getPathForTarget;
    /**
     * Check if current context should be blocked.
     * Returns false in audit mode, browser environment, or outside sandboxed context.
     */
    private shouldBlock;
    /**
     * Record a violation and optionally invoke the callback.
     */
    private recordViolation;
    /**
     * Create a blocking proxy for a function.
     */
    private createBlockingProxy;
    /**
     * Create a blocking proxy for an object (blocks all property access).
     */
    private createBlockingObjectProxy;
    /**
     * Apply security patches to dangerous globals.
     */
    private applyPatches;
    /**
     * Protect against .constructor.constructor escape vector.
     *
     * The pattern `{}.constructor.constructor` accesses Function via:
     * - {}.constructor → Object (via Object.prototype.constructor)
     * - Object.constructor → Function (via Function.prototype.constructor)
     *
     * By patching Function.prototype.constructor to return our blocked proxy,
     * we block the escape vector without breaking normal .constructor access.
     */
    private protectConstructorChain;
    /**
     * Protect Error.prepareStackTrace from being set in sandbox context.
     *
     * The attack vector is:
     * ```
     * Error.prepareStackTrace = (err, stack) => {
     *   return stack[0].getFunction().constructor; // Gets Function
     * };
     * const F = new Error().stack;
     * F("return process")();
     * ```
     *
     * We only block SETTING, not reading, because V8 reads it internally
     * when creating error stack traces.
     */
    private protectErrorPrepareStackTrace;
    /**
     * Patch a prototype's constructor property to block access in sandbox context.
     */
    private patchPrototypeConstructor;
    /**
     * Protect process.mainModule from being accessed or set in sandbox context.
     *
     * The attack vector is:
     * ```
     * process.mainModule.require('child_process').execSync('whoami')
     * process.mainModule.constructor._load('vm')
     * ```
     *
     * process.mainModule may be undefined in ESM contexts but could exist in
     * CommonJS workers. We block both reading and setting.
     */
    private protectProcessMainModule;
    /**
     * Protect process.execPath from being read or set in sandbox context.
     *
     * process.execPath is a string primitive (not an object), so it cannot be
     * proxied via the normal blocked globals mechanism. We use Object.defineProperty
     * with getter/setter (same pattern as protectProcessMainModule).
     */
    private protectProcessExecPath;
    /**
     * Protect Module._load from being called in sandbox context.
     *
     * The attack vector is:
     * ```
     * module.constructor._load('child_process')
     * require.main.constructor._load('vm')
     * ```
     *
     * We access the Module class and replace _load with a blocking proxy.
     */
    private protectModuleLoad;
    /**
     * Apply a single patch to a blocked global.
     */
    private applyPatch;
    /**
     * Restore all original values.
     */
    private restorePatches;
}
