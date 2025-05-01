"use client";

import React, { useState, useEffect } from 'react';
import { GlobalSettings, getGlobalSettings, updateGlobalSettings } from '@/lib/mockSettings';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<GlobalSettings>(getGlobalSettings());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    const updatedSettings = updateGlobalSettings({ [name]: newValue });
    setSettings(updatedSettings);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Global Settings</h1>
      <form>
        <div className="mb-4">
          <label className="block mb-2">Theme:</label>
          <select name="theme" value={settings.theme} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Language:</label>
          <input type="text" name="language" value={settings.language} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Date Format:</label>
          <input type="text" name="dateFormat" value={settings.dateFormat} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Time Format:</label>
          <select name="timeFormat" value={settings.timeFormat} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="12h">12-hour</option>
            <option value="24h">24-hour</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Default Board View:</label>
          <select name="defaultBoardView" value={settings.defaultBoardView} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="kanban">Kanban</option>
            <option value="list">List</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" name="notificationsEnabled" checked={settings.notificationsEnabled} onChange={handleChange} className="mr-2" />
            Enable Notifications
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Auto-save Interval (minutes):</label>
          <input type="number" name="autoSaveInterval" value={settings.autoSaveInterval} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
      </form>
    </div>
  );
};

export default Settings;