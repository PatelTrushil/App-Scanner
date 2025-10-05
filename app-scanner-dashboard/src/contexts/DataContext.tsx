import React, { createContext, useEffect, useState } from "react";
import { collectFindings, normalizeApps, RawApp } from "../utils/transoform";

type AppAug = RawApp & { _findings?: any[] };

type DataContextType = {
  apps: AppAug[];
  loading: boolean;
  error?: string;
  reload: () => Promise<void>;
  loadFromFile: (file: File) => Promise<void>;
  totals: { apps: number; findings: number; high: number; medium: number; low: number };
};

export const DataContext = createContext<DataContextType>({
  apps: [],
  loading: true,
  reload: async () => {},
  loadFromFile: async () => {},
  totals: { apps: 0, findings: 0, high: 0, medium: 0, low: 0 },
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apps, setApps] = useState<AppAug[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|undefined>(undefined);

  const parseWithWorker = (text: string) => {
    return new Promise<any>((resolve, reject) => {
      const worker = new Worker(new URL("../workers/parse.worker.ts", import.meta.url), { type: "module" });
      worker.onmessage = (ev) => {
        const d = (ev.data as any);
        if (d.ok) resolve(d.data);
        else reject(new Error(d.error || "parse error"));
        worker.terminate();
      };
      worker.onerror = (err) => { reject(err); worker.terminate(); };
      worker.postMessage(text);
    });
  };

  const transform = (raw: any) => {
    const normalized = normalizeApps(raw);
    const augmented = normalized.map(a => {
      const f = collectFindings(a);
      return {
        ...a,
        _findings: f,
        name: a.name || a.package || a.id || "Unnamed",
        version: a.version || a.appVersion,
        platform: a.platform || a.os || a.type,
      } as AppAug;
    });
    setApps(augmented);
  };

  const loadRemote = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const resp = await fetch("/data/apps.json");
      if (!resp.ok) throw new Error(`No /data/apps.json (status ${resp.status})`);
      const text = await resp.text();
      const parsed = (text.length > 1_000_000 && typeof Worker !== "undefined")
        ? await parseWithWorker(text)
        : JSON.parse(text);
      transform(parsed);
    } catch (err: any) {
      setError(err.message || String(err));
      setApps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRemote(); }, []);

  const loadFromFile = async (file: File) => {
    setLoading(true); setError(undefined);
    try {
      const text = await file.text();
      const parsed = (text.length > 1_000_000 && typeof Worker !== "undefined")
        ? await parseWithWorker(text)
        : JSON.parse(text);
      transform(parsed);
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const totals = React.useMemo(() => {
    const t = { apps: apps.length, findings: 0, high: 0, medium: 0, low: 0 };
    apps.forEach(a => {
      const f = a._findings || [];
      t.findings += f.length;
      f.forEach((it: any) => {
        const s = (it.severity || it.sev || "").toString().toLowerCase();
        if (s.includes("high") || s.includes("crit")) t.high++;
        else if (s.includes("med") || s.includes("medium")) t.medium++;
        else t.low++;
      });
    });
    return t;
  }, [apps]);

  return (
    <DataContext.Provider value={{ apps, loading, error, reload: loadRemote, loadFromFile, totals }}>
      {children}
    </DataContext.Provider>
  );
};
