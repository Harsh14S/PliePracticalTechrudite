import React, {createContext, ReactNode, useContext} from 'react';

interface DataContextType {}

export const DataContext = createContext<DataContextType | undefined>(
  undefined,
);

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider = ({children}: DataProviderProps) => {
  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
};

export default DataProvider;

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
