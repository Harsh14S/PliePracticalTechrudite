import React, {createContext, useContext, useState, ReactNode} from 'react';

interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isSplashCompleted: boolean;
  setIsSplashCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSplashCompleted, setIsSplashCompleted] = useState<boolean>(false);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        isSplashCompleted,
        setIsSplashCompleted,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a AuthProvider');
  }
  return context;
};
