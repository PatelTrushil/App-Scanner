export type RawApp = {
  id?: string;
  name?: string;
  package?: string;
  version?: string;
  platform?: string;
  [key: string]: any;
};

export type Finding = {
  id?: string;
  title?: string;
  severity?: string;
  [key: string]: any;
};

// Function to normalize apps array
export function normalizeApps(raw: any): RawApp[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw as RawApp[];
  if (raw.apps && Array.isArray(raw.apps)) return raw.apps as RawApp[];

  const arrays = Object.values(raw).filter(v => Array.isArray(v));
  for (const arr of arrays as any[]) {
    if (arr.length && typeof arr[0] === "object") {
      if (arr[0].name || arr[0].package || arr[0].findings || arr[0].vulnerabilities)
        return arr as RawApp[];
    }
  }

  if (typeof raw === "object" && (raw.name || raw.package || raw.findings))
    return [raw as RawApp];

  return arrays.flat() as RawApp[];
}

// Function to collect findings from a single app
export function collectFindings(app: RawApp): Finding[] {
  if (!app) return [];
  const keys = ["findings", "vulnerabilities", "issues", "results", "alerts"];
  for (const k of keys) if (Array.isArray(app[k])) return app[k] as Finding[];

  for (const v of Object.values(app)) {
    if (Array.isArray(v) && v.length && typeof v[0] === "object") {
      const f = v[0] as any;
      if (f.severity || f.title || f.id || f.cve) return v as Finding[];
    }
  }
  return [];
}
