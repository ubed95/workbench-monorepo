/**
 * REACT QUERY EXAMPLE - Understanding Server State Management
 *
 * THOUGHT PROCESS:
 * - React Query is for SERVER STATE (data from APIs)
 * - It handles caching, refetching, background updates automatically
 * - Use it for any async data fetching (GET requests)
 * - Use mutations for data modifications (POST, PUT, DELETE)
 *
 * KEY CONCEPTS:
 * - Queries: For fetching/reading data
 * - Mutations: For creating/updating/deleting data
 * - Query Keys: Unique identifiers for cached data
 * - Cache Invalidation: Refreshing data after mutations
 */

import { useApiMutation, useApiQuery, useQueryClient } from '@lib/query-utils'
import requestService from '@services/request.service'

// ============================================================================
// EXAMPLE 1: Simple Data Fetching (GET request)
// ============================================================================

interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * Component that fetches and displays user data
 *
 * THOUGHT PROCESS:
 * - useApiQuery handles loading, error, and success states
 * - Data is automatically cached and shared across components
 * - If another component uses the same queryKey, it gets the cached data
 * - React Query handles refetching, retries, and background updates
 */
export function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useApiQuery<User>({
    queryKey: ['user', userId], // Unique cache key
    url: `/users/${userId}`,
    enabled: !!userId, // Only fetch if userId exists
  })

  if (isLoading) { return <div>Loading user...</div> }
  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    )
  }
  if (!user) { return <div>User not found</div> }

  return (
    <div>
      <h3>User Profile</h3>
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
          This data is cached. If you navigate away and come back, it won't
          refetch immediately (uses stale data first, then refetches in
          background).
        </em>
      </p>
    </div>
  )
}

// ============================================================================
// EXAMPLE 2: List of Items with Loading States
// ============================================================================

interface Post {
  id: string;
  title: string;
  body: string;
}

export function PostsList() {
  const { data: posts, isLoading, isError, error } = useApiQuery<Post[]>({
    queryKey: ['posts'], // Cache key for all posts
    url: '/posts',
  })

  if (isLoading) {
    return (
      <div>
        <h3>Posts</h3>
        <p>Loading posts...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <h3>Error</h3>
        <p>{error?.message || 'Failed to load posts'}</p>
      </div>
    )
  }

  return (
    <div>
      <h3>
        Posts (
        {posts?.length || 0}
        )
      </h3>
      <ul>
        {posts?.map((post: Post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ============================================================================
// EXAMPLE 3: Mutations (Creating/Updating Data)
// ============================================================================

interface CreateUserData {
  name: string;
  email: string;
}

/**
 * Component that creates a new user
 *
 * THOUGHT PROCESS:
 * - Mutations are for modifying data (POST, PUT, DELETE)
 * - After successful mutation, we usually want to:
 *   1. Invalidate related queries (so they refetch)
 *   2. Update the cache optimistically (for better UX)
 *   3. Show success/error notifications
 */
export function CreateUserForm() {
  const queryClient = useQueryClient()

  const createUserMutation = useApiMutation<User, CreateUserData>({
    mutationFn: data => requestService.post('/users', data),
    onSuccess: (_newUser: User) => {
      // Invalidate the users list so it refetches with the new user
      queryClient.invalidateQueries({ queryKey: ['users'] })

      // Optionally: Add the new user to the cache immediately (optimistic update)
      // queryClient.setQueryData(['users'], (old: User[]) => [...old, newUser])
    },
    onError: (_error: Error) => {
      // Handle error (e.g., show toast notification)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userData: CreateUserData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    }

    createUserMutation.mutate(userData)
  }

  return (
    <div>
      <h3>Create User</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <button
          type="submit"
          disabled={createUserMutation.isPending}
        >
          {createUserMutation.isPending ? 'Creating...' : 'Create User'}
        </button>
      </form>
      {createUserMutation.isError && (
        <p style={{ color: 'red' }}>
          Error:
          {' '}
          {createUserMutation.error?.message}
        </p>
      )}
      {createUserMutation.isSuccess && (
        <p style={{ color: 'green' }}>User created successfully!</p>
      )}
    </div>
  )
}

// ============================================================================
// EXAMPLE 4: Updating Data (PUT request)
// ============================================================================

interface UpdateUserData {
  name?: string;
  email?: string;
}

export function UpdateUserForm({ userId }: { userId: string }) {
  const queryClient = useQueryClient()

  // First, fetch the current user data
  const { data: user } = useApiQuery<User>({
    queryKey: ['user', userId],
    url: `/users/${userId}`,
  })

  const updateUserMutation = useApiMutation<User, UpdateUserData>({
    mutationFn: data => requestService.put(`/users/${userId}`, data),
    onSuccess: (updatedUser: User) => {
      // Update the cache immediately with the new data
      queryClient.setQueryData(['user', userId], updatedUser)

      // Also invalidate the users list in case it shows this user
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const updateData: UpdateUserData = {
      name: formData.get('name') as string || undefined,
      email: formData.get('email') as string || undefined,
    }

    updateUserMutation.mutate(updateData)
  }

  if (!user) { return <div>Loading...</div> }

  return (
    <div>
      <h3>Update User</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          defaultValue={user.name}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={user.email}
        />
        <button
          type="submit"
          disabled={updateUserMutation.isPending}
        >
          {updateUserMutation.isPending ? 'Updating...' : 'Update User'}
        </button>
      </form>
    </div>
  )
}

// ============================================================================
// EXAMPLE 5: Dependent Queries (Query that depends on another)
// ============================================================================

/**
 * This component fetches user data first, then fetches their posts
 * The posts query is disabled until we have the userId
 */
export function UserWithPosts({ userId }: { userId: string }) {
  // First query: Get user
  const { data: user } = useApiQuery<User>({
    queryKey: ['user', userId],
    url: `/users/${userId}`,
  })

  // Second query: Get user's posts (only runs after we have userId)
  const { data: posts } = useApiQuery<Post[]>({
    queryKey: [
      'user',
      userId,
      'posts',
    ],
    url: `/users/${userId}/posts`,
    enabled: !!userId, // Only fetch if userId exists
  })

  if (!user) { return <div>Loading user...</div> }

  return (
    <div>
      <h3>
        {user.name}
        's Posts
      </h3>
      {posts
        ? (
            <ul>
              {posts.map((post: Post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          )
        : (
            <p>Loading posts...</p>
          )}
    </div>
  )
}

// ============================================================================
// EXAMPLE 6: Manual Cache Invalidation
// ============================================================================

/**
 * Sometimes you need to manually refresh data
 * This is useful for "Refresh" buttons or after certain actions
 */
export function RefreshButton() {
  const queryClient = useQueryClient()

  const handleRefresh = () => {
    // Invalidate all queries with key starting with 'posts'
    queryClient.invalidateQueries({ queryKey: ['posts'] })

    // Or invalidate all queries
    // queryClient.invalidateQueries()

    // Or refetch a specific query immediately
    // queryClient.refetchQueries({ queryKey: ['posts'] })
  }

  return (
    <div>
      <button onClick={handleRefresh}>Refresh Posts</button>
      <p>
        <em>
          Clicking this will refetch all posts queries, updating any components
          that display posts.
        </em>
      </p>
    </div>
  )
}
