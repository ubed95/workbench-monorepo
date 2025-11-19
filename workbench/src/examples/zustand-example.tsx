/**
 * ZUSTAND EXAMPLE - Understanding Global State
 *
 * IMPORTANT: Zustand stores are GLOBAL SINGLETONS
 * - When you create a store, it's accessible from ANY component
 * - Changing state in one component updates ALL components using that store
 * - Stores are created once and shared across the entire app
 *
 * THOUGHT PROCESS:
 * - Use Zustand for CLIENT-SIDE state (UI state, user preferences, etc.)
 * - NOT for server data (use React Query for that)
 * - Each store is independent - create multiple stores for different concerns
 */

import { createStore } from '@lib/store-utils'

// ============================================================================
// EXAMPLE 1: Simple Counter Store (Global State)
// ============================================================================

/**
 * This store is created ONCE when this module loads.
 * It's a singleton - the same instance is used everywhere.
 */
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// Store is created at module level - NOT inside a component
const useCounterStore = createStore<CounterState>('counter', set => ({
  count: 0,
  increment: () => set((state: CounterState) => ({ count: state.count + 1 })),
  decrement: () => set((state: CounterState) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))

// ============================================================================
// Component A - Uses the counter store
// ============================================================================
export function CounterDisplay() {
  // This hook subscribes to the GLOBAL counter store
  // Any change to 'count' will re-render this component
  const count = useCounterStore(state => state.count)

  return (
    <div>
      <h3>Counter Display (Component A)</h3>
      <p>
        Current count:
        {count}
      </p>
      <p>
        <em>
          This component only reads the count. Changing it in Component B will
          update this component automatically!
        </em>
      </p>
    </div>
  )
}

// ============================================================================
// Component B - Modifies the counter store
// ============================================================================
export function CounterControls() {
  // This component uses the actions from the store
  // When these are called, ALL components using this store will update
  const { increment, decrement, reset } = useCounterStore()

  return (
    <div>
      <h3>Counter Controls (Component B)</h3>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
      <p>
        <em>
          Clicking these buttons will update Component A automatically because
          they share the same global store!
        </em>
      </p>
    </div>
  )
}

// ============================================================================
// EXAMPLE 2: UI State Store (Theme, Sidebar, etc.)
// ============================================================================

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
}

/**
 * This store persists to localStorage automatically
 * The state will survive page refreshes
 */
const useUIStore = createStore<UIState>(
  { name: 'ui-state', persist: true },
  set => ({
    theme: 'light',
    sidebarOpen: false,
    setTheme: (theme: 'light' | 'dark') => set({ theme }),
    toggleSidebar: () => set((state: UIState) => ({ sidebarOpen: !state.sidebarOpen })),
  }),
)

// ============================================================================
// Component using UI store
// ============================================================================
export function ThemeSwitcher() {
  const { theme, setTheme } = useUIStore()

  return (
    <div>
      <h3>Theme Switcher</h3>
      <p>
        Current theme:
        {theme}
      </p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <p>
        <em>
          This state persists to localStorage. Refresh the page - it will
          remember your theme!
        </em>
      </p>
    </div>
  )
}

export function SidebarToggle() {
  const { sidebarOpen, toggleSidebar } = useUIStore()

  return (
    <div>
      <h3>Sidebar Toggle</h3>
      <p>
        Sidebar is:
        {sidebarOpen ? 'Open' : 'Closed'}
      </p>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      <p>
        <em>
          Any component can read/write this state. It's shared globally!
        </em>
      </p>
    </div>
  )
}

// ============================================================================
// EXAMPLE 3: Selective Subscriptions (Performance Optimization)
// ============================================================================

interface ComplexState {
  user: { name: string; email: string };
  settings: { notifications: boolean };
  preferences: { language: string };
}

const useComplexStore = createStore<ComplexState>('complex', () => ({
  user: { name: 'John', email: 'john@example.com' },
  settings: { notifications: true },
  preferences: { language: 'en' },
}))

/**
 * BEST PRACTICE: Only subscribe to the state you need
 * This component will ONLY re-render when 'user' changes
 * It won't re-render when 'settings' or 'preferences' change
 */
export function UserDisplay() {
  // Selector function - only subscribes to 'user' part of state
  const user = useComplexStore((state: ComplexState) => state.user)

  return (
    <div>
      <h3>User Display (Optimized)</h3>
      <p>
        Name:
        {user.name}
      </p>
      <p>
        Email:
        {user.email}
      </p>
      <p>
        <em>
          This component only re-renders when 'user' changes, not when other
          parts of the store change!
        </em>
      </p>
    </div>
  )
}

/**
 * This component only subscribes to 'settings'
 */
export function SettingsDisplay() {
  const settings = useComplexStore((state: ComplexState) => state.settings)

  return (
    <div>
      <h3>Settings Display</h3>
      <p>
        Notifications:
        {settings.notifications ? 'On' : 'Off'}
      </p>
    </div>
  )
}
