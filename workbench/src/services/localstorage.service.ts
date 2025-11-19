const localStorageService = {
  get(key: string): any {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (e) {
      console.error('Error getting item from localStorage: ', e)
      return null
    }
  },
  set(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      // handle error
      console.error('Error setting item in localStorage: ', e)
    }
  },
  delete(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      // handle error
      console.error('Error deleting item from localStorage: ', e)
    }
  },
}

export default localStorageService
