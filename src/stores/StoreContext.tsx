import { createContext, useContext } from "react";
import cartStore from "./CartStore";

const StoreContext = createContext({
  cartStore,
});

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <StoreContext.Provider value={{ cartStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};
