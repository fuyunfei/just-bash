/**
 * Worker thread for Python execution via Pyodide.
 * Keeps Pyodide loaded and handles multiple execution requests.
 *
 * Defense-in-depth activates AFTER Pyodide loads (WASM init needs unrestricted JS).
 * User Python code runs with dangerous globals blocked.
 */
import { type WorkerDefenseStats } from "../../security/index.js";
export interface WorkerInput {
    sharedBuffer: SharedArrayBuffer;
    pythonCode: string;
    cwd: string;
    env: Record<string, string>;
    args: string[];
    scriptPath?: string;
}
export interface WorkerOutput {
    success: boolean;
    error?: string;
    /** Defense-in-depth stats if enabled */
    defenseStats?: WorkerDefenseStats;
}
