import { useState, useEffect } from 'react';
import { Sheet } from '../types';

export const useSheets = () => {
  const [sheets, setSheets] = useState<Sheet[]>([]);

  useEffect(() => {
    const savedSheets = localStorage.getItem('fichepro_sheets');
    if (savedSheets) {
      setSheets(JSON.parse(savedSheets));
    }
  }, []);

  const saveSheet = (sheet: Omit<Sheet, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => {
    const now = new Date().toISOString();
    const newSheets = [...sheets];
    
    if (sheet.id) {
      const index = newSheets.findIndex(s => s.id === sheet.id);
      if (index !== -1) {
        newSheets[index] = {
          ...newSheets[index],
          ...sheet,
          updatedAt: now,
        } as Sheet;
      }
    } else {
      const newSheet: Sheet = {
        ...sheet,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      newSheets.unshift(newSheet);
    }

    setSheets(newSheets);
    localStorage.setItem('fichepro_sheets', JSON.stringify(newSheets));
    return sheet.id || newSheets[0].id;
  };

  const deleteSheet = (id: string) => {
    const newSheets = sheets.filter(s => s.id !== id);
    setSheets(newSheets);
    localStorage.setItem('fichepro_sheets', JSON.stringify(newSheets));
  };

  const getSheet = (id: string) => {
    return sheets.find(s => s.id === id);
  };

  return { sheets, saveSheet, deleteSheet, getSheet };
};
