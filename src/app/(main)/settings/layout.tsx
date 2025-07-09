import React from 'react';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="settings-layout">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      {children}
    </div>
  );
}