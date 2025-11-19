/**
 * COMBINING ZUSTAND + REACT QUERY - Best Practices
 *
 * THOUGHT PROCESS:
 * - Zustand: Client-side state (UI state, user preferences, temporary selections)
 * - React Query: Server state (data from APIs, cached responses)
 *
 * WHEN TO USE EACH:
 * - Zustand: Theme, sidebar open/closed, selected item ID, form state, filters
 * - React Query: User data, posts, API responses, anything from the server
 *
 * COMBINING THEM:
 * - Store selected IDs in Zustand, fetch details with React Query
 * - Store filters in Zustand, use them in React Query queries
 * - Store UI state in Zustand, fetch data with React Query
 */

import { useApiMutation, useApiQuery, useQueryClient } from '@lib/query-utils'
import { createStore } from '@lib/store-utils'
import requestService from '@services/request.service'

// ============================================================================
// EXAMPLE 1: Selected Item Pattern
// ============================================================================

/**
 * Store the selected user ID in Zustand (client state)
 * Fetch the user details with React Query (server state)
 *
 * THOUGHT PROCESS:
 * - The selected ID is UI state (which user is selected) - Zustand
 * - The user details come from the server - React Query
 * - Multiple components can read the selected ID
 * - Only the component that needs details fetches them
 */

interface SelectionState {
  selectedUserId: string | null;
  setSelectedUserId: (id: string | null) => void;
}

const useSelectionStore = createStore<SelectionState>('selection', set => ({
  selectedUserId: null,
  setSelectedUserId: id => set({ selectedUserId: id }),
}))

interface User {
  id: string;
  name: string;
  email: string;
}

// Component that shows the list and handles selection
export function UserList() {
  const { selectedUserId, setSelectedUserId } = useSelectionStore()

  // Fetch list of users
  const { data: users } = useApiQuery<User[]>({
    queryKey: ['users'],
    url: '/users',
  })

  return (
    <div>
      <h3>User List</h3>
      <ul>
        {users?.map(user => (
          <li
            key={user.id}
            onClick={() => setSelectedUserId(user.id)}
            style={{
              cursor: 'pointer',
              backgroundColor:
                selectedUserId === user.id ? '#e0e0e0' : 'transparent',
            }}
          >
            {user.name}
          </li>
        ))}
      </ul>
      <p>
        <em>
          Click a user to select them. The selection is stored in Zustand and
          shared with UserDetails component.
        </em>
      </p>
    </div>
  )
}

// Component that shows details of the selected user
export function UserDetails() {
  // Read the selected ID from Zustand
  const selectedUserId = useSelectionStore(state => state.selectedUserId)

  // Fetch user details using React Query (only if a user is selected)
  const { data: user, isLoading } = useApiQuery<User>({
    queryKey: ['user', selectedUserId],
    url: `/users/${selectedUserId}`,
    enabled: !!selectedUserId, // Only fetch if a user is selected
  })

  if (!selectedUserId) {
    return (
      <div>
        <h3>User Details</h3>
        <p>Select a user from the list to see details</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <h3>User Details</h3>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <h3>User Details</h3>
      <p>
        Name:
        {user?.name}
      </p>
      <p>
        Email:
        {user?.email}
      </p>
      <p>
        <em>
          This component automatically updates when you select a different user
          in the UserList component!
        </em>
      </p>
    </div>
  )
}

// ============================================================================
// EXAMPLE 2: Filters Pattern
// ============================================================================

/**
 * Store filters in Zustand (UI state)
 * Use filters in React Query query (server state)
 *
 * THOUGHT PROCESS:
 * - Filters are UI state - user can change them, they might persist
 * - The filtered results come from the server - React Query
 * - When filters change, React Query automatically refetches
 */

interface FilterState {
  searchTerm: string;
  category: string;
  setSearchTerm: (term: string) => void;
  setCategory: (category: string) => void;
}

const useFilterStore = createStore<FilterState>(
  { name: 'filters', persist: true }, // Persist filters to localStorage
  set => ({
    searchTerm: '',
    category: 'all',
    setSearchTerm: term => set({ searchTerm: term }),
    setCategory: category => set({ category }),
  }),
)

interface Product {
  id: string;
  name: string;
  category: string;
}

export function ProductList() {
  // Get filters from Zustand
  const { searchTerm, category, setSearchTerm, setCategory } = useFilterStore()

  // Use filters in React Query query
  // When filters change, React Query automatically refetches
  const { data: products, isLoading } = useApiQuery<Product[]>({
    queryKey: ['products', { search: searchTerm, category }], // Include filters in cache key
    url: '/products',
    params: { search: searchTerm, category }, // Pass filters as query params
  })

  return (
    <div>
      <h3>Products</h3>

      {/* Filter controls - update Zustand state */}
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>

      {/* Display filtered results */}
      {isLoading
        ? (
            <p>Loading products...</p>
          )
        : (
            <ul>
              {products?.map(product => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          )}

      <p>
        <em>
          Filters are stored in Zustand (persist to localStorage). When you
          change filters, React Query automatically refetches with new params.
        </em>
      </p>
    </div>
  )
}

// ============================================================================
// EXAMPLE 3: Form State + API Submission
// ============================================================================

/**
 * Store form state in Zustand (temporary UI state)
 * Submit form data with React Query mutation (server action)
 *
 * THOUGHT PROCESS:
 * - Form inputs are temporary UI state - Zustand
 * - Form submission is a server action - React Query mutation
 * - After submission, clear form state and invalidate queries
 */

interface FormState {
  name: string;
  email: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  reset: () => void;
}

const useFormStore = createStore<FormState>('user-form', set => ({
  name: '',
  email: '',
  setName: name => set({ name }),
  setEmail: email => set({ email }),
  reset: () => set({ name: '', email: '' }),
}))

export function UserForm() {
  const { name, email, setName, setEmail, reset } = useFormStore()
  const queryClient = useQueryClient()

  const createUserMutation = useApiMutation<User, { name: string; email: string }>(
    {
      mutationFn: data => requestService.post('/users', data),
      onSuccess: () => {
        // Clear form after successful submission
        reset()

        // Invalidate users list to show the new user
        queryClient.invalidateQueries({ queryKey: ['users'] })
      },
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createUserMutation.mutate({ name, email })
  }

  return (
    <div>
      <h3>Create User</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit" disabled={createUserMutation.isPending}>
          {createUserMutation.isPending ? 'Creating...' : 'Create User'}
        </button>
      </form>
      <p>
        <em>
          Form state is in Zustand (easy to reset, share across components).
          Submission uses React Query mutation (handles loading, errors,
          success).
        </em>
      </p>
    </div>
  )
}

// ============================================================================
// EXAMPLE 4: Optimistic Updates
// ============================================================================

/**
 * Update Zustand state optimistically (immediately)
 * Use React Query mutation to sync with server
 * Rollback if mutation fails
 *
 * THOUGHT PROCESS:
 * - Show immediate feedback to user (Zustand)
 * - Sync with server in background (React Query)
 * - If server fails, rollback the optimistic update
 */

interface LikeState {
  likedPosts: Set<string>;
  toggleLike: (postId: string) => void;
  setLiked: (postId: string, liked: boolean) => void;
}

const useLikeStore = createStore<LikeState>('likes', set => ({
  likedPosts: new Set<string>(),
  toggleLike: postId =>
    set((state) => {
      const newSet = new Set(state.likedPosts)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return { likedPosts: newSet }
    }),
  setLiked: (postId, liked) =>
    set((state) => {
      const newSet = new Set(state.likedPosts)
      if (liked) {
        newSet.add(postId)
      } else {
        newSet.delete(postId)
      }
      return { likedPosts: newSet }
    }),
}))

export function PostWithLike({ postId }: { postId: string }) {
  const { likedPosts, setLiked } = useLikeStore()
  const isLiked = likedPosts.has(postId)

  return (
    <div>
      <button onClick={() => setLiked(postId, !isLiked)}>
        {isLiked ? '❤️ Liked' : '🤍 Like'}
      </button>
    </div>
  )
}
