import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { api } from '../utils/api-utils'

const defaultUser = { getLoading: false, getError: null }

const AuthContext = createContext({
  user: defaultUser,
  isLoggedIn: false,
  isAdmin: false,
  isEmployee: false,
  isContractor: false,

  logout: () => {},
  login: () => {},
  signup: () => {},
  setUser: () => {}
})

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser)

  const login = useCallback(async (email) => {
    const newUser = await api
      .post('/auth/login', { email })
      .then((response) => response.data)
    setUser((user) => ({
      ...user,
      ...newUser,
      getLoading: false,
      getError: null
    }))
  }, [])

  const signup = useCallback(async (email, password) => {
    const newUser = await api
      .post('/auth/signup', { email, password })
      .then((response) => response.data)
    setUser((user) => ({
      ...user,
      ...newUser,
      getLoading: false,
      getError: null
    }))
  }, [])

  const logout = useCallback(async () => {
    try {
      // Send empty body to get Axios to send this as JSON
      await api.post('/auth/logout', {})
      setUser(defaultUser)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }, [])

  const fetchCurrentUser = useCallback(async () => {
    try {
      setUser((user) => ({ ...user, getLoading: true, getError: null }))
      const res = await api.get('/auth/me')
      const user = res.data || defaultUser
      setUser((oldUser) => ({
        ...oldUser,
        ...user,
        getLoading: false,
        getError: null
      }))
    } catch (err) {
      if (err.response?.status === 401) {
        setUser(defaultUser)
        return
      }
      setUser((user) => ({ ...user, getLoading: false, getError: err }))
    }
  }, [])

  const contextValue = useMemo(
    () => ({
      user,
      isLoggedIn: !!user.id,
      isAdmin: user.rank === 'admin',
      isEmployee: user.rank === 'employee',
      isContractor: user.rank === 'contractor',

      logout,
      login,
      signup,
      setUser
    }),
    [user, logout, login, signup, setUser]
  )

  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
