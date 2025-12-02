import React, {createContext, useContext, useState, useEffect} from 'react'

const AuthContext = createContext()

export function AuthProvider({children}){
  const [user,setUser] = useState(null)

  // Load user from localStorage on page refresh
  useEffect(() => {
    const saved = localStorage.getItem('sp_user')
    if(saved) setUser(JSON.parse(saved))
  }, [])

  function signin(userObj){
    localStorage.setItem('sp_user', JSON.stringify(userObj))
    setUser(userObj)
  }

  function signout(){
    localStorage.removeItem('sp_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{user, signin, signout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
