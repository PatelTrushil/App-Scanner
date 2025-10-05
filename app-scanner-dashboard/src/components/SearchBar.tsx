import React from "react";
export default function SearchBar({ query, setQuery } : { query: string; setQuery: (s:string)=>void }) {
  return (
    <div className="searchbar">
      <input className="search-input" placeholder="Search apps..." value={query} onChange={e => setQuery(e.target.value)} />
    </div>
  );
}