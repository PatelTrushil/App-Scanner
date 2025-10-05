import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

const Header: React.FC = () => {
  const { loadFromFile, reload, loading, error } = useContext(DataContext);
  return (
    <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,marginBottom:18}}>
      <div style={{display:'flex',gap:12,alignItems:'center'}}>
        <div style={{width:44,height:44,borderRadius:8,background:'linear-gradient(135deg,#2563eb,#7c3aed)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700}}>AS</div>
        <div>
          <h1 style={{margin:0,fontSize:18}}>App Scanner Dashboard</h1>
          <div style={{color:'#6b7280',fontSize:13}}>React + TypeScript | CSS | Recharts</div>
        </div>
      </div>

      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <label style={{border:'1px solid #e6e9ef',padding:'8px 12px',borderRadius:8,background:'#fff',cursor:'pointer'}}>
          <input type="file" accept=".json" style={{display:'none'}} onChange={(e)=> {
            const f = e.target.files && e.target.files[0];
            if (f) loadFromFile(f);
            if (e.target) (e.target as HTMLInputElement).value = '';
          }} />
          Choose JSON
        </label>

        <button onClick={reload} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'#2563eb',color:'#fff',cursor:'pointer'}}>
          Reload public JSON
        </button>

        <div style={{fontSize:13,color:'#374151',textAlign:'right'}}>
          <div style={{fontSize:12,color:'#6b7280'}}>Status</div>
          <div style={{fontWeight:700}}>{loading ? 'Parsing...' : error ? 'Error' : 'Ready'}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
