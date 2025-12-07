"use client"

/**
 * Simple localStorage wrapper with error handling
 */
export class StorageManager {
  private static isAvailable(): boolean {
    try {
      const test = "__storage_test__"
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }

  static save<T>(key: string, data: T): void {
    if (!this.isAvailable()) return

    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.warn("Failed to save to localStorage:", error)
    }
  }

  static load<T>(key: string, defaultValue: T): T {
    if (!this.isAvailable()) return defaultValue

    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn("Failed to load from localStorage:", error)
      return defaultValue
    }
  }

  static remove(key: string): void {
    if (!this.isAvailable()) return

    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn("Failed to remove from localStorage:", error)
    }
  }

  static clear(): void {
    if (!this.isAvailable()) return

    try {
      localStorage.clear()
    } catch (error) {
      console.warn("Failed to clear localStorage:", error)
    }
  }
}
