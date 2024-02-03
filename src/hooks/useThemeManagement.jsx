import { useContext } from 'react';
import { ThemeManagmentContext } from '../providers/ThemeManagmentProvider';

export const useThemeManagment = () => {
  return useContext(ThemeManagmentContext);
};