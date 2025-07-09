export interface GlobalSettings {
  theme: 'light' | 'dark';
  language: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  defaultBoardView: 'kanban' | 'list';
  notificationsEnabled: boolean;
  autoSaveInterval: number; // in minutes
}

export const defaultGlobalSettings: GlobalSettings = {
  theme: 'light',
  language: 'en',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  defaultBoardView: 'kanban',
  notificationsEnabled: true,
  autoSaveInterval: 5,
};

export const getGlobalSettings = (): GlobalSettings => {
  const storedSettings = localStorage.getItem('globalSettings');
  if (storedSettings) {
    return JSON.parse(storedSettings);
  }
  return defaultGlobalSettings;
};

export const updateGlobalSettings = (newSettings: Partial<GlobalSettings>): GlobalSettings => {
  const currentSettings = getGlobalSettings();
  const updatedSettings = { ...currentSettings, ...newSettings };
  localStorage.setItem('globalSettings', JSON.stringify(updatedSettings));
  return updatedSettings;
};