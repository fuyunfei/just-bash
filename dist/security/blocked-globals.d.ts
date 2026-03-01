/**
 * Blocked Globals for Defense-in-Depth Box
 *
 * This module defines which JavaScript globals should be blocked during
 * bash script execution to prevent code execution escape vectors.
 *
 * IMPORTANT: This is a SECONDARY defense layer. The primary security comes
 * from proper sandboxing and architectural constraints.
 *
 * NOTE: Dynamic import() CANNOT be blocked by this approach. See the
 * "KNOWN LIMITATION" section in defense-in-depth-box.ts for details
 * and recommended mitigations.
 */
import type { SecurityViolationType } from "./types.js";
/**
 * Strategy for handling a blocked global.
 * - "throw": Replace with a proxy that throws on access/call
 * - "freeze": Freeze the object to prevent modification
 */
export type BlockStrategy = "throw" | "freeze";
/**
 * Configuration for a blocked global.
 */
export interface BlockedGlobal {
    /**
     * The property name on the target object (e.g., "Function", "eval").
     */
    prop: string;
    /**
     * The target object containing the property.
     * Usually globalThis, but can be other objects like Object.prototype.
     */
    target: object;
    /**
     * Type of violation to record when this global is accessed.
     */
    violationType: SecurityViolationType;
    /**
     * Strategy for blocking this global.
     */
    strategy: BlockStrategy;
    /**
     * Human-readable description of why this is blocked.
     */
    reason: string;
}
/**
 * Get the list of globals to block during script execution.
 *
 * Note: This function must be called at runtime (not module load time)
 * because some globals may not exist in all environments.
 */
export declare function getBlockedGlobals(): BlockedGlobal[];
