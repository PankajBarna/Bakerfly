import { useSettingsCtx } from "../context/SettingsContext.jsx";
export function useSettings() {
  const { settings, loading } = useSettingsCtx();
  return { settings, loading };
}
