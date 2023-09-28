import { createContext, useContext, useState } from 'react';

const UpdatedDataContext = createContext();

export const useUpdatedData = () => {
  return useContext(UpdatedDataContext);
};

export const UpdatedDataProvider = ({ children }) => {
  const [updatedData, setUpdatedData] = useState({
    name: '',
    description: '',
  });

  return (
    <UpdatedDataContext.Provider value={{ updatedData, setUpdatedData }}>
      {children}
    </UpdatedDataContext.Provider>
  );
};