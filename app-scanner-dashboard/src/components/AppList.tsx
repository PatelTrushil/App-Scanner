import React, { useContext, useMemo } from "react";
import { DataContext } from "../contexts/DataContext";

export default function AppList({ query, onSelect } : { query: string; onSelect: (a:any)=>void }) {
  const { apps } = useContext(DataContext);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return apps;
    return apps.filter(a => ((a.name || "") + " " + (a.package || "") + " " + (a.platform || "")).toLowerCase().includes(q));
  }, [apps, query]);

  return (
    <div className="app-list">
      {filtered.map((a, i) => (
        <div key={a.id || a.name || i} className="app-item" onClick={() => onSelect(a)}>
          <div>
            <div className="app-title">{a.name}</div>
            <div className="app-sub">{a.platform} • {a.version || ""}</div>
          </div>
          <div className="app-meta">{(a._findings||[]).length} findings</div>
        </div>
      ))}
      {filtered.length === 0 && <div className="muted">No apps match</div>}
    </div>
  );
}
