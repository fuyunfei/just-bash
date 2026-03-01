/**
 * Safe Object Utilities
 *
 * Defense-in-depth against JavaScript prototype pollution attacks.
 * These utilities prevent malicious JSON from accessing or modifying
 * the JavaScript prototype chain via keys like "__proto__", "constructor", etc.
 */
/**
 * Check if a key is safe to use for object property access/assignment.
 * Returns true if the key is safe, false if it could cause prototype pollution.
 */
export declare function isSafeKey(key: string): boolean;
/**
 * Check if a key is safe using the extended dangerous keys list.
 * More paranoid version that blocks additional Object.prototype methods.
 */
export declare function isSafeKeyStrict(key: string): boolean;
/**
 * Safely get a property from an object using hasOwnProperty check.
 * Returns undefined if the key is dangerous or doesn't exist as own property.
 */
export declare function safeGet<T>(obj: Record<string, T>, key: string): T | undefined;
/**
 * Safely set a property on an object.
 * Silently ignores dangerous keys to prevent prototype pollution.
 */
export declare function safeSet<T>(obj: Record<string, T>, key: string, value: T): void;
/**
 * Safely delete a property from an object.
 * Ignores dangerous keys.
 */
export declare function safeDelete<T>(obj: Record<string, T>, key: string): void;
/**
 * Create a safe object from entries, filtering out dangerous keys.
 */
export declare function safeFromEntries<T>(entries: Iterable<[string, T]>): Record<string, T>;
/**
 * Safely spread/assign properties from source to target.
 * Only copies own properties and filters dangerous keys.
 */
export declare function safeAssign<T>(target: Record<string, T>, source: Record<string, T>): Record<string, T>;
/**
 * Create a shallow copy of an object, filtering dangerous keys.
 */
export declare function safeCopy<T extends Record<string, unknown>>(obj: T): T;
/**
 * Check if object has own property safely (not inherited from prototype).
 */
export declare function safeHasOwn(obj: object, key: string): boolean;
/**
 * Create a null-prototype shallow copy of an object.
 * This prevents prototype chain lookups without filtering any keys.
 */
export declare function nullPrototypeCopy<T extends object>(obj: T): T & Record<string, unknown>;
/**
 * Merge multiple objects into a new null-prototype object.
 * This prevents prototype chain lookups without filtering any keys.
 */
export declare function nullPrototypeMerge<T extends object>(...objs: T[]): T & Record<string, unknown>;
