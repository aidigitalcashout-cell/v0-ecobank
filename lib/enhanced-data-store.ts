"use client"

/**
 * ------------------------------------------------------------------
 *  Enhanced Data Store Shim
 * ------------------------------------------------------------------
 *  Older code may import from "@/lib/enhanced-data-store".
 *  After several roll-backs the real file disappeared, so those
 *  imports now fail at build time.
 *
 *  This file proxies **all** requests to the current in-memory
 *  `dataStore` (defined in "@/lib/data-store.ts") and re-exports
 *  the same types, guaranteeing full backward compatibility.
 * ------------------------------------------------------------------
 */

import { dataStore } from "./data-store"

/* ------------------------------------------------------------------ */
/*  Proxy singleton                                                   */
/* ------------------------------------------------------------------ */
export const enhancedDataStore = dataStore

/* ------------------------------------------------------------------ */
/*  Type re-exports                                                   */
/* ------------------------------------------------------------------ */
export type {
  Transaction,
  Beneficiary,
  UserData,
  Notification,
} from "./data-store"

/* ------------------------------------------------------------------ */
/*  Default export for legacy                                         */
/* ------------------------------------------------------------------ */
export default enhancedDataStore
