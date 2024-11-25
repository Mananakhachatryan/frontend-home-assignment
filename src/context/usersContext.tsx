import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { User } from '@/types/userType'
import { saveToLocalStorage, loadFromLocalStorage } from '@/utils/localStorage'

interface UsersProviderProps {
  children: ReactNode
}

interface UsersContextType {
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

const UsersContext = createContext<UsersContextType | undefined>(undefined)

export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([])

  // Load users from localStorage or fetch from JSON on mount
  useEffect(() => {
    const initializeUsers = async () => {
      const storedUsers = loadFromLocalStorage<User[]>('users')
      if (storedUsers?.length) {
        setUsers(storedUsers)
        return
      }

      try {
        const { default: fetchedUsers } = await import('@/data/users.json')
        setUsers(fetchedUsers)
        saveToLocalStorage('users', fetchedUsers)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    initializeUsers()
  }, [])

  useEffect(() => {
    users.length && saveToLocalStorage('users', users)
  }, [users])

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  )
}

export const useUsers = (): UsersContextType => {
  const context = useContext(UsersContext)
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider')
  }
  return context
}
