self.onmessage = (ev) => {
  const text = ev.data;
  try {
    const parsed = JSON.parse(text);
    self.postMessage({ ok: true, data: parsed });
  } catch (err: any) {
    self.postMessage({ ok: false, error: err?.message || String(err) });
  }
};
export {};