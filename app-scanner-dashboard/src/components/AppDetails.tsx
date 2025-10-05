import React from "react";

export default function AppDetails({ app }: { app: any | null }) {
  if (!app) return <div className="panel muted">Select an app to view details</div>;
  const findings = app._findings || [];
  return (
    <div className="panel">
      <h3>{app.name}</h3>
      <div className="muted">{app.platform} • {app.version || ""}</div>
      <div className="meta-row">
        <div>Findings: <strong>{findings.length}</strong></div>
      </div>
      <div className="findings">
        {findings.slice(0,50).map((f:any, idx:number)=>(
          <div key={f.id || idx} className="finding">
            <div className="finding-title">{f.title || f.name || 'Finding'}</div>
            <div className={`pill ${((f.severity||'').toLowerCase().includes('high')) ? 'high' : ((f.severity||'').toLowerCase().includes('med') ? 'med' : 'low')}`}>
              {f.severity || 'LOW'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
