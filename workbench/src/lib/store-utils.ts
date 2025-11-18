import type { StateCreator } from 'zustand'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface StoreConfig {
  name: string;
  persist?: boolean;
  devtools?: boolean;
}

/**
 * Utility function to create a Zustand store with optional persistence and devtools.
 *
 * This allows you to create modular, independent stores throughout your application.
 * Each component or feature can have its own store without centralization.
 *
 * @example
 * ```ts
 * interface CounterState {
 *   count: number
 *   increment: () => void
 * }
 *
 * const useCounterStore = createStore<CounterState>('counter', (set) => ({
 *   count: 0,
 *   increment: () => set((state) => ({ count: state.count + 1 })),
 * }))
 * ```
 */
export function createStore<T extends object>(
  config: StoreConfig | string,
  fn: StateCreator<T>,
) {
  const storeConfig: StoreConfig
    = typeof config === 'string' ? { name: config } : config

  // Apply middleware based on config
  if (storeConfig.persist) {
    return create<T>()(
      persist(
        devtools(fn, {
          name: storeConfig.name,
          enabled: import.meta.env.DEV && (storeConfig.devtools !== false),
        }),
        {
          name: storeConfig.name,
        },
      ),
    )
  } else if (storeConfig.devtools !== false) {
    // Only add devtools in development
    return create<T>()(
      devtools(fn, {
        name: storeConfig.name,
        enabled: import.meta.env.DEV,
      }),
    )
  } else {
    return create<T>()(fn)
  }
}
