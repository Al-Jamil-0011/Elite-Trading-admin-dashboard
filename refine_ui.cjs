const fs = require('fs');

function main() {
    let content = fs.readFileSync('src/app/App.tsx', 'utf-8');

    // 1. Profile Dropdown Background
    const oldDropdown = `<div style={{display:"none",position:"absolute",top:"100%",right:0,marginTop:8,background:AD.card,backdropFilter:"blur(20px)",border:\`1px solid \${AD.cardB}\`,borderRadius:12,width:200,padding:"6px",boxShadow:"0 10px 40px rgba(0,0,0,0.5)",zIndex:2000}}>
          <button className="a-btn" style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:"transparent",border:"none",borderRadius:8,color:C.t1,fontFamily:P,fontSize:13,cursor:"pointer",textAlign:"left"}}>
            <User size={14} color={C.t2}/> Profile
          </button>
          <button className="a-btn" style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:"transparent",border:"none",borderRadius:8,color:C.t1,fontFamily:P,fontSize:13,cursor:"pointer",textAlign:"left"}}>
            <Settings size={14} color={C.t2}/> Account Settings
          </button>
          <div style={{height:1,background:AD.cardB,margin:"4px 0"}}/>
          <button className="a-btn" style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:"transparent",border:"none",borderRadius:8,color:C.sell,fontFamily:P,fontSize:13,cursor:"pointer",textAlign:"left"}}>
            <LogOut size={14}/> Logout
          </button>
        </div>`;
    const newDropdown = `<div style={{display:"none",position:"absolute",top:"100%",right:0,marginTop:10,background:"#161326",border:\`1px solid rgba(255,255,255,0.08)\`,borderRadius:12,width:200,padding:"8px",boxShadow:"0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.8)",zIndex:2000}}>
          <button className="a-dd-item" style={{color:C.t1}}>
            <User size={15} color={C.t2}/> Profile
          </button>
          <button className="a-dd-item" style={{color:C.t1}}>
            <Settings size={15} color={C.t2}/> Account Settings
          </button>
          <div style={{height:1,background:AD.cardB,margin:"6px 0"}}/>
          <button className="a-dd-item" style={{color:C.sell}}>
            <LogOut size={15}/> Logout
          </button>
        </div>`;
    content = content.replace(oldDropdown, newDropdown);

    // 2. Chip component
    const oldChip = `function Chip({ label, type }:{ label:string; type:"ok"|"warn"|"err"|"muted"|"brand"|"gold"|"info" }) {
  const s:Record<string,[string,string]>={
    ok:["rgba(0,208,132,0.1)",C.buy],warn:["rgba(245,158,11,0.1)","#F59E0B"],
    err:["rgba(255,90,107,0.1)",C.sell],muted:["rgba(100,116,139,0.1)","#94A3B8"],
    brand:["rgba(128,0,255,0.12)","#C084FC"],gold:["rgba(191,160,109,0.12)",C.gold],
    info:["rgba(59,130,246,0.12)","#60A5FA"],
  };
  const [bg,color]=s[type];
  return <span style={{display:"inline-flex",alignItems:"center",gap:5,background:bg,color,border:\`1px solid \${color}28\`,borderRadius:100,padding:"3px 10px",fontFamily:P,fontSize:10,fontWeight:600,letterSpacing:"0.03em",whiteSpace:"nowrap"}}><span style={{width:4,height:4,borderRadius:"50%",background:color,flexShrink:0}}/>{label}</span>;
}`;
    const newChip = `function Chip({ label, type }:{ label:string; type:"ok"|"warn"|"err"|"muted"|"brand"|"gold"|"info" }) {
  const s:Record<string,[string,string]>={
    ok:["rgba(0,208,132,0.15)",C.buy],warn:["rgba(245,158,11,0.15)","#F59E0B"],
    err:["rgba(255,90,107,0.15)",C.sell],muted:["rgba(100,116,139,0.15)","#94A3B8"],
    brand:["rgba(128,0,255,0.15)","#C084FC"],gold:["rgba(191,160,109,0.15)",C.gold],
    info:["rgba(59,130,246,0.15)","#60A5FA"],
  };
  const [bg,color]=s[type];
  return <span style={{display:"inline-flex",alignItems:"center",background:bg,color,border:\`1px solid \${color}30\`,borderRadius:100,padding:"4px 12px",fontFamily:P,fontSize:10.5,fontWeight:600,letterSpacing:"0.04em",whiteSpace:"nowrap"}}>{label}</span>;
}`;
    content = content.replace(oldChip, newChip);

    // 3. Table Rows and Headers global replace
    content = content.replace(/padding:"10px 20px",background:AD\.th/g, 'padding:"14px 24px",background:AD.nav,position:"sticky",top:0,zIndex:10');
    content = content.replace(/padding:"10px 22px",background:AD\.th/g, 'padding:"14px 24px",background:AD.nav,position:"sticky",top:0,zIndex:10');
    content = content.replace(/padding:"12px 20px"/g, 'padding:"16px 24px"');
    content = content.replace(/padding:"13px 22px"/g, 'padding:"16px 24px"');

    // 4. Tabs filtering container
    const oldTabs1 = /<div style=\{\{display:"flex",gap:6,marginBottom:18,alignItems:"center"\}\}>([\s\S]*?)<span style=\{\{marginLeft:"auto",fontFamily:M,fontSize:10,color:C\.td\}\}>\{filtered\.length\} results<\/span>\s*<\/div>/g;
    const newTabs = `<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
      <div style={{display:"flex",gap:4,background:"rgba(255,255,255,0.03)",padding:5,borderRadius:10,border:\`1px solid rgba(255,255,255,0.05)\`}}>
        {tabs.map(t=><button key={t} onClick={()=>setFilter(t)} style={{padding:"6px 16px",borderRadius:6,background:filter===t?"rgba(255,255,255,0.1)":"transparent",color:filter===t?"#fff":C.td,border:"none",fontFamily:P,fontSize:12,fontWeight:500,cursor:"pointer",transition:"all 0.2s",boxShadow:filter===t?"0 2px 8px rgba(0,0,0,0.2)":"none"}}>{t}</button>)}
      </div>
      <span style={{fontFamily:M,fontSize:11,color:C.td}}>{filtered.length} results</span>
    </div>`;
    content = content.replace(oldTabs1, newTabs);

    // 5. Action Buttons unified styling
    content = content.replace(/<button[^>]*?><Pencil[^>]*?\/><\/button>/g, 
      \`<button className="a-btn" title="Edit" style={{width:32,height:32,borderRadius:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.15s"}}><Pencil size={13} color={C.t2}/></button>\`
    );
    content = content.replace(/<button[^>]*?><Trash2[^>]*?\/><\/button>/g, 
      \`<button className="a-btn" title="Delete" style={{width:32,height:32,borderRadius:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.15s"}}><Trash2 size={13} color={C.sell}/></button>\`
    );
    content = content.replace(/<button[^>]*?>🔒<\/button>/g, 
      \`<button className="a-btn" title="Close" onClick={()=>setCloseTarget(s)} style={{width:32,height:32,borderRadius:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.15s"}}><Lock size={13} color={C.t2}/></button>\`
    );

    content = content.replace(/<div style=\{\{display:"flex",gap:5\}\}>/g, '<div style={{display:"flex",gap:6}}>');

    fs.writeFileSync('src/app/App.tsx', content, 'utf-8');
    console.log("Refined App.tsx successfully.");
}

main();
