import React, { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

export default function SummaryCard({ label, valueLabel }: { label: string; valueLabel?: string }) {
  const { totals } = useContext(DataContext);
  const val = valueLabel === "appsCount" ? totals.apps
            : valueLabel === "findingsCount" ? totals.findings
            : valueLabel === "highCount" ? totals.high
            : valueLabel === "mediumLowLabel" ? `${totals.medium} / ${totals.low}`
            : totals.apps;
  return (
    <div className="card">
      <div className="card-label">{label}</div>
      <div className="card-value">{val}</div>
    </div>
  );
}
