import React, { createContext, useState, ReactNode } from 'react';
import { ProtocolFormData } from '../types/protocol';

interface ProtocolContextType {
  formData: Partial<ProtocolFormData> | null;
  updateFormData: (data: Partial<ProtocolFormData>) => void;
  resetFormData: () => void;
}

export const ProtocolContext = createContext<ProtocolContextType>({
  formData: null,
  updateFormData: () => {},
  resetFormData: () => {},
});

interface ProtocolProviderProps {
  children: ReactNode;
}

export const ProtocolProvider: React.FC<ProtocolProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<Partial<ProtocolFormData> | null>(null);

  const updateFormData = (data: Partial<ProtocolFormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const resetFormData = () => {
    setFormData(null);
  };

  return (
    <ProtocolContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </ProtocolContext.Provider>
  );
};
