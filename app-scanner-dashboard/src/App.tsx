import React, { useState } from "react";
import { DataProvider } from "./contexts/DataContext";
import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
import SearchBar from "./components/SearchBar";
import AppList from "./components/AppList";
import AppDetails from "./components/AppDetails";
import SeverityDonut from "./components/charts/SeverityDonut";

export default function App() {
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [query, setQuery] = useState("");

  return (
    <DataProvider>
      <div className="app">
        <Header />
        <main className="container">
          <section className="top-row">
            <div className="cards">
              <SummaryCard label="Apps" valueLabel="appsCount" />
              <SummaryCard label="Findings" valueLabel="findingsCount" />
              <SummaryCard label="High" valueLabel="highCount" />
              <SummaryCard label="Medium/Low" valueLabel="mediumLowLabel" />
            </div>

            <div className="chart-area">
              <SeverityDonut />
            </div>
          </section>

          <section className="mid-row">
            <div className="left-col">
              <SearchBar query={query} setQuery={setQuery} />
              <AppList query={query} onSelect={setSelectedApp} />
            </div>

            <aside className="right-col">
              <AppDetails app={selectedApp} />
            </aside>
          </section>
        </main>
      </div>
    </DataProvider>
  );
}
