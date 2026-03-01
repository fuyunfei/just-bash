/**
 * Safe Object Utilities
 *
 * Defense-in-depth against JavaScript prototype pollution attacks.
 * These utilities prevent malicious JSON from accessing or modifying
 * the JavaScript prototype chain via keys like "__proto__", "constructor", etc.
 */
/**
 * Keys that could be used to access or pollute the prototype chain.
 * These should never be used as direct object property names when
 * setting values from untrusted input.
 */
const DANGEROUS_KEYS = new Set(["__proto__", "constructor", "prototype"]);
/**
 * Extended list of potentially dangerous keys for extra paranoia.
 * These include Node.js-specific and DOM-specific properties.
 */
const EXTENDED_DANGEROUS_KEYS = new Set([
    ...DANGEROUS_KEYS,
    // Additional properties that could cause issues in specific contexts
    "__defineGetter__",
    "__defineSetter__",
    "__lookupGetter__",
    "__lookupSetter__",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toLocaleString",
    "toString",
    "valueOf",
]);
/**
 * Check if a key is safe to use for object property access/assignment.
 * Returns true if the key is safe, false if it could cause prototype pollution.
 */
export function isSafeKey(key) {
    return !DANGEROUS_KEYS.has(key);
}
/**
 * Check if a key is safe using the extended dangerous keys list.
 * More paranoid version that blocks additional Object.prototype methods.
 */
export function isSafeKeyStrict(key) {
    return !EXTENDED_DANGEROUS_KEYS.has(key);
}
/**
 * Safely get a property from an object using hasOwnProperty check.
 * Returns undefined if the key is dangerous or doesn't exist as own property.
 */
export function safeGet(obj, key) {
    if (!isSafeKey(key)) {
        return undefined;
    }
    if (Object.hasOwn(obj, key)) {
        return obj[key];
    }
    return undefined;
}
/**
 * Safely set a property on an object.
 * Silently ignores dangerous keys to prevent prototype pollution.
 */
export function safeSet(obj, key, value) {
    if (isSafeKey(key)) {
        obj[key] = value;
    }
    // Dangerous keys are silently ignored - this matches jq behavior
    // where __proto__ is treated as a regular key that happens to not work
}
/**
 * Safely delete a property from an object.
 * Ignores dangerous keys.
 */
export function safeDelete(obj, key) {
    if (isSafeKey(key)) {
        delete obj[key];
    }
}
/**
 * Create a safe object from entries, filtering out dangerous keys.
 */
export function safeFromEntries(entries) {
    // Use null-prototype for additional safety
    const result = Object.create(null);
    for (const [key, value] of entries) {
        safeSet(result, key, value);
    }
    return result;
}
/**
 * Safely spread/assign properties from source to target.
 * Only copies own properties and filters dangerous keys.
 */
export function safeAssign(target, source) {
    for (const key of Object.keys(source)) {
        safeSet(target, key, source[key]);
    }
    return target;
}
/**
 * Create a shallow copy of an object, filtering dangerous keys.
 */
export function safeCopy(obj) {
    const result = Object.create(null);
    for (const key of Object.keys(obj)) {
        if (isSafeKey(key)) {
            // @banned-pattern-ignore: iterating via Object.keys() which only returns own properties
            result[key] = obj[key];
        }
    }
    return result;
}
/**
 * Check if object has own property safely (not inherited from prototype).
 */
export function safeHasOwn(obj, key) {
    return Object.hasOwn(obj, key);
}
/**
 * Create a null-prototype shallow copy of an object.
 * This prevents prototype chain lookups without filtering any keys.
 */
export function nullPrototypeCopy(obj) {
    return Object.assign(Object.create(null), obj);
}
/**
 * Merge multiple objects into a new null-prototype object.
 * This prevents prototype chain lookups without filtering any keys.
 */
export function nullPrototypeMerge(...objs) {
    return Object.assign(Object.create(null), ...objs);
}
