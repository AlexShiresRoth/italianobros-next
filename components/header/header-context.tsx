"use client";
import { createContext, useState } from "react";

export const HeaderContext = createContext<{
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
  mobileMenuToggled: boolean;
  setMobileMenuToggled: (toggled: boolean) => void;
}>({
  toggled: false,
  setToggled: () => {},
  mobileMenuToggled: false,
  setMobileMenuToggled: () => {},
});

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [toggled, setToggled] = useState(false);
  const [mobileMenuToggled, setMobileMenuToggled] = useState(false);
  return (
    <HeaderContext.Provider
      value={{ toggled, setToggled, mobileMenuToggled, setMobileMenuToggled }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
