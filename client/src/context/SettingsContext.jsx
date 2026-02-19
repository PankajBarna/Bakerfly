import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { siteConfig } from "../config/siteConfig.js";
import { apiGet } from "../lib/api.js";

const SettingsCtx = createContext(null);

export function SettingsProvider({ children }) {
  const [dbSettings, setDbSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/api/settings")
      .then((data) => setDbSettings(data || {}))
      .finally(() => setLoading(false));
  }, []);

  // merge: DB overrides config
  const settings = useMemo(() => {
    const businessOverride = dbSettings.business || {};
    return {
      ...siteConfig,
      business: { ...siteConfig.business, ...businessOverride }
    };
  }, [dbSettings]);

  return (
    <SettingsCtx.Provider value={{ settings, dbSettings, setDbSettings, loading }}>
      {children}
    </SettingsCtx.Provider>
  );
}

export function useSettingsCtx() {
  return useContext(SettingsCtx);
}
