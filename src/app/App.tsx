import { useState, useEffect } from "react";
import {
  Zap, Bell, BookOpen, BarChart2, TrendingUp, TrendingDown,
  CheckCircle, Heart, MessageCircle, Eye, EyeOff, ArrowLeft,
  ChevronRight, User, Settings, Shield, HelpCircle, LogOut,
  Activity, Award, Mail, Lock, Globe, Star, AlertCircle,
  SlidersHorizontal, XCircle, MinusCircle, Share2, Search, Send,
  CreditCard, Smartphone, Sparkles, Crown, X,
  Plus, Pencil, Trash2, MoreHorizontal, Download, ChevronDown,
  ChevronLeft, DollarSign, Calendar, Tag, FileText, Users,
  ToggleLeft, ToggleRight, Check, Image, PieChart as PieIcon,
  TrendingUp as TUp, ExternalLink, Percent, RefreshCw, Filter
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const C = {
  bg:"#0D0B14", bg2:"#161221", surface:"#1E1930", card:"#26203A",
  brand:"#8000FF", brandH:"#9333FF",
  gold:"#BFA06D", goldL:"#D7C48D",
  t1:"#FFFFFF", t2:"#C7C3D5", tm:"#8E8A9E", td:"#6D687B",
  buy:"#00D084", sell:"#FF5A6B", active:"#7C3AED", closed:"#64748B",
  border:"rgba(255,255,255,0.08)", borderM:"rgba(255,255,255,0.13)",
} as const;
const P = "'Poppins', system-ui, sans-serif";
const M = "'JetBrains Mono', 'Fira Code', monospace";


// ════════════════════════════════════════════════════════════════════════════════
// ADMIN DASHBOARD — Premium SaaS
// ════════════════════════════════════════════════════════════════════════════════

type AdminSection = "dashboard"|"signals"|"posts"|"notifications"|"subscriptions"|"users"|"coupons"|"settings";

// ─── Admin palette ────────────────────────────────────────────────────────────
const AD = {
  bg:"#07051A", nav:"#09071E",
  card:"rgba(255,255,255,0.032)", cardB:"rgba(255,255,255,0.07)",
  th:"rgba(255,255,255,0.025)", rowHov:"rgba(128,0,255,0.068)",
  inp:"rgba(255,255,255,0.038)", inpB:"rgba(255,255,255,0.08)",
} as const;

// ─── Admin data ───────────────────────────────────────────────────────────────
const GROWTH_DATA = [
  {m:"Feb",v:280,f:380,c:210},{m:"Mar",v:310,f:420,c:235},
  {m:"Apr",v:340,f:460,c:255},{m:"May",v:360,f:490,c:265},
  {m:"Jun",v:370,f:510,c:278},{m:"Jul",v:384,f:521,c:289},
];
const REVENUE_DATA = [
  {m:"Feb",r:32400},{m:"Mar",r:36800},{m:"Apr",r:40200},
  {m:"May",r:43100},{m:"Jun",r:45800},{m:"Jul",r:48230},
];
const PERF_DATA = [
  {n:"Win",v:62,color:C.buy},{n:"Loss",v:18,color:C.sell},{n:"BE",v:20,color:"#64748B"},
];
const ASIGNALS = [
  {id:1,asset:"BTC/USDT",cat:"Crypto",   type:"Swing",   dir:"BUY" as const,entry:"67,420.00",sl:"65,800.00",tp1:"69,000.00",tp2:"71,500.00",tp3:"74,000.00",status:"Active",   pub:"Jul 23 · 09:15"},
  {id:2,asset:"GOLD/USD", cat:"Commodity",type:"Intraday",dir:"BUY" as const,entry:"2,847.00", sl:"2,820.00", tp1:"2,875.00", tp2:"2,900.00", tp3:"2,930.00", status:"Active",   pub:"Jul 23 · 11:00"},
  {id:3,asset:"EUR/USD",  cat:"Forex",    type:"Swing",   dir:"SELL"as const,entry:"1.0842",   sl:"1.0880",   tp1:"1.0810",   tp2:"1.0775",   tp3:"1.0740",   status:"Active",   pub:"Jul 23 · 13:30"},
  {id:4,asset:"NAS100",   cat:"Index",    type:"Scalp",   dir:"BUY" as const,entry:"19,840.00",sl:"19,600.00",tp1:"20,100.00",tp2:"20,400.00",tp3:"—",        status:"Closed",   pub:"Jul 22 · 08:00"},
  {id:5,asset:"GBP/JPY",  cat:"Forex",    type:"Swing",   dir:"BUY" as const,entry:"196.84",   sl:"195.50",   tp1:"198.20",   tp2:"199.50",   tp3:"—",        status:"Active",   pub:"Jul 21 · 14:00"},
  {id:6,asset:"ETH/USDT", cat:"Crypto",   type:"Intraday",dir:"SELL"as const,entry:"3,280.00", sl:"3,350.00", tp1:"3,200.00", tp2:"3,150.00", tp3:"3,080.00", status:"Draft",    pub:"—"},
  {id:7,asset:"SPX500",   cat:"Index",    type:"Swing",   dir:"SELL"as const,entry:"5,842.00", sl:"5,890.00", tp1:"5,800.00", tp2:"5,760.00", tp3:"—",        status:"Scheduled",pub:"Jul 24 · 09:00"},
];
const APOSTS = [
  {id:1,img:"https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=64&h=40&fit=crop&auto=format",title:"Bitcoin Reclaims Key $67K Level",      cat:"Market Update",likes:142,comments:28,date:"Jul 23",status:"Published"},
  {id:2,img:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=64&h=40&fit=crop&auto=format",title:"Understanding Risk-to-Reward Ratios",  cat:"Education",    likes:89, comments:14,date:"Jul 22",status:"Published"},
  {id:3,img:"https://images.unsplash.com/photo-1591033594798-33227a05780d?w=64&h=40&fit=crop&auto=format",title:"Fed Signals No Rate Cuts Before Q4",   cat:"News",         likes:67, comments:19,date:"Jul 21",status:"Published"},
  {id:4,img:"https://images.unsplash.com/photo-1605792657660-596af9009e82?w=64&h=40&fit=crop&auto=format",title:"Premium Signal Alerts — Now Live",     cat:"Announcement", likes:203,comments:41,date:"Jul 20",status:"Published"},
  {id:5,img:"",                                                                                              title:"Weekly Market Recap — Jul 21",         cat:"Education",    likes:0,  comments:0, date:"—",    status:"Draft"},
];
const AUSERS = [
  {id:1,init:"AK",name:"Alex Kim",    email:"alex.kim@email.com", plan:"VIP",   status:"Active",   trial:false,signals:47,posts:23,likes:89, comments:34,joined:"Jan 12, 2026",renewal:"Aug 12, 2026"},
  {id:2,init:"SC",name:"Sarah Chen",  email:"sarah.c@email.com",  plan:"Forex", status:"Active",   trial:false,signals:31,posts:14,likes:52, comments:18,joined:"Feb 3, 2026", renewal:"Aug 3, 2026"},
  {id:3,init:"JT",name:"James Torres",email:"j.torres@email.com", plan:"Crypto",status:"Trial",    trial:true, signals:8, posts:3, likes:11, comments:4, joined:"Jul 21, 2026",renewal:"Jul 23, 2026"},
  {id:4,init:"ML",name:"Mia Laurent", email:"mia.l@email.com",    plan:"VIP",   status:"Active",   trial:false,signals:62,posts:40,likes:128,comments:67,joined:"Mar 18, 2026",renewal:"Sep 18, 2026"},
  {id:5,init:"OK",name:"Omar Khalil", email:"omar.k@email.com",   plan:"Forex", status:"Expired",  trial:false,signals:19,posts:7, likes:28, comments:9, joined:"Apr 5, 2026", renewal:"Jul 5, 2026"},
  {id:6,init:"PN",name:"Priya Nair",  email:"priya.n@email.com",  plan:"Crypto",status:"Active",   trial:false,signals:28,posts:11,likes:44, comments:15,joined:"May 22, 2026",renewal:"Aug 22, 2026"},
  {id:7,init:"TB",name:"Tom Banks",   email:"tom.b@email.com",    plan:"VIP",   status:"Suspended",trial:false,signals:3, posts:1, likes:5,  comments:2, joined:"Jun 1, 2026", renewal:"—"},
];
const ANOTIFS = [
  {id:1,title:"High Impact News Today",   audience:"All Users",  sent:"Jul 23, 14:30",reach:1247,opened:892},
  {id:2,title:"New BTC Signal Published", audience:"VIP Users",  sent:"Jul 23, 09:15",reach:384, opened:301},
  {id:3,title:"Weekly Performance Report",audience:"All Users",  sent:"Jul 21, 12:00",reach:1247,opened:743},
  {id:4,title:"Forex Signal Update",      audience:"Forex Users",sent:"Jul 20, 16:00",reach:521, opened:389},
];
const ACOUPONS = [
  {code:"ELITE50", discount:"50%", expiry:"Jul 31, 2026",limit:100,used:67, status:"Active"},
  {code:"VIPFREE", discount:"100%",expiry:"Jul 25, 2026",limit:10, used:10, status:"Exhausted"},
  {code:"FOREX20", discount:"20%", expiry:"Aug 15, 2026",limit:200,used:43, status:"Active"},
  {code:"CRYPTO30",discount:"30%", expiry:"Aug 1, 2026", limit:50, used:12, status:"Active"},
];
const AACTIVITY = [
  {icon:"💳",text:"Alex Kim purchased VIP Plan",             time:"2m ago", col:C.gold},
  {icon:"⚡",text:"New signal published — BTC/USDT BUY",    time:"15m ago",col:C.buy},
  {icon:"📰",text:"Post published — Bitcoin Reclaims $67K", time:"1h ago", col:"#B57AFF"},
  {icon:"🆓",text:"James Torres started Free Trial",         time:"2h ago", col:C.brand},
  {icon:"🎟",text:"Coupon ELITE50 redeemed by Sarah Chen",  time:"3h ago", col:C.gold},
  {icon:"🔄",text:"Mia Laurent renewed Forex Plan",         time:"5h ago", col:C.buy},
];

// ─── Admin components ─────────────────────────────────────────────────────────

function Chip({ label, type }:{ label:string; type:"ok"|"warn"|"err"|"muted"|"brand"|"gold"|"info" }) {
  const s:Record<string,[string,string]>={
    ok:["rgba(0,208,132,0.15)",C.buy],warn:["rgba(245,158,11,0.15)","#F59E0B"],
    err:["rgba(255,90,107,0.15)",C.sell],muted:["rgba(100,116,139,0.15)","#94A3B8"],
    brand:["rgba(128,0,255,0.15)","#C084FC"],gold:["rgba(191,160,109,0.15)",C.gold],
    info:["rgba(59,130,246,0.15)","#60A5FA"],
  };
  const [bg,color]=s[type];
  return <span style={{display:"inline-flex",alignItems:"center",background:bg,color,border:`1px solid ${color}30`,borderRadius:100,padding:"4px 12px",fontFamily:P,fontSize:10.5,fontWeight:600,letterSpacing:"0.04em",whiteSpace:"nowrap"}}>{label}</span>;
}

function APrimary({ children,onClick,icon,size="md",disabled=false }:{ children?:React.ReactNode;onClick?:()=>void;icon?:React.ReactNode;size?:"sm"|"md";disabled?:boolean }) {
  return <button onClick={onClick} disabled={disabled} className="a-btn" style={{display:"inline-flex",alignItems:"center",gap:6,padding:size==="sm"?"6px 14px":"9px 18px",background:`linear-gradient(135deg,${C.brand},${C.brandH})`,border:"none",borderRadius:9,fontFamily:P,fontSize:size==="sm"?11:12,fontWeight:600,color:"#fff",cursor:disabled?"not-allowed":"pointer",boxShadow:`0 4px 14px ${C.brand}35`,opacity:disabled?0.5:1,transition:"all 0.15s",whiteSpace:"nowrap"}}>{icon}{children}</button>;
}

function AGhost({ children,onClick,icon,size="md",danger=false }:{ children?:React.ReactNode;onClick?:()=>void;icon?:React.ReactNode;size?:"sm"|"md";danger?:boolean }) {
  return <button onClick={onClick} className="a-btn" style={{display:"inline-flex",alignItems:"center",gap:6,padding:size==="sm"?"6px 13px":"8px 16px",background:"transparent",border:`1px solid ${danger?"rgba(255,90,107,0.28)":AD.cardB}`,borderRadius:9,fontFamily:P,fontSize:size==="sm"?11:12,fontWeight:500,color:danger?C.sell:C.t2,cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap"}}>{icon}{children}</button>;
}

function AIn({ label,value,onChange,placeholder,type="text" }:{ label?:string;value:string;onChange:(v:string)=>void;placeholder?:string;type?:string }) {
  return <label style={{display:"flex",flexDirection:"column",gap:5}}>
    {label&&<span style={{fontFamily:P,fontSize:11,fontWeight:500,color:C.t2}}>{label}</span>}
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="a-input" style={{background:AD.inp,border:`1px solid ${AD.inpB}`,borderRadius:9,padding:"9px 13px",fontFamily:P,fontSize:13,color:C.t1,outline:"none",caretColor:C.brand,transition:"all 0.18s"}}/>
  </label>;
}

function ATa({ label,value,onChange,placeholder,rows=3 }:{ label?:string;value:string;onChange:(v:string)=>void;placeholder?:string;rows?:number }) {
  return <label style={{display:"flex",flexDirection:"column",gap:5}}>
    {label&&<span style={{fontFamily:P,fontSize:11,fontWeight:500,color:C.t2}}>{label}</span>}
    <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} className="a-input" style={{background:AD.inp,border:`1px solid ${AD.inpB}`,borderRadius:9,padding:"9px 13px",fontFamily:P,fontSize:13,color:C.t1,outline:"none",caretColor:C.brand,resize:"vertical",transition:"all 0.18s"}}/>
  </label>;
}

function ASel({ label,value,onChange,opts }:{ label?:string;value:string;onChange:(v:string)=>void;opts:{l:string;v:string}[] }) {
  return <label style={{display:"flex",flexDirection:"column",gap:5}}>
    {label&&<span style={{fontFamily:P,fontSize:11,fontWeight:500,color:C.t2}}>{label}</span>}
    <select value={value} onChange={e=>onChange(e.target.value)} style={{background:AD.inp,border:`1px solid ${AD.inpB}`,borderRadius:9,padding:"9px 13px",fontFamily:P,fontSize:13,color:C.t1,outline:"none",cursor:"pointer",appearance:"none"}}>
      {opts.map(o=><option key={o.v} value={o.v} style={{background:"#110F20"}}>{o.l}</option>)}
    </select>
  </label>;
}

function ATog({ on,onChange }:{ on:boolean;onChange:(v:boolean)=>void }) {
  return <div onClick={()=>onChange(!on)} style={{width:42,height:22,borderRadius:100,background:on?C.brand:"rgba(255,255,255,0.08)",border:`1px solid ${on?C.brand:AD.cardB}`,cursor:"pointer",position:"relative",transition:"all 0.2s",flexShrink:0}}>
    <div style={{position:"absolute",top:2,left:on?22:2,width:16,height:16,borderRadius:"50%",background:"#fff",transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.3)"}}/>
  </div>;
}

function AModal({ title,sub,onClose,children,width=580 }:{ title:string;sub?:string;onClose:()=>void;children:React.ReactNode;width?:number }) {
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",backdropFilter:"blur(14px)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
    <div style={{background:"#0F0C20",border:`1px solid rgba(255,255,255,0.09)`,borderRadius:20,width,maxWidth:"96vw",maxHeight:"90vh",overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:`0 40px 100px rgba(0,0,0,0.7),0 0 0 1px ${C.brand}1A`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 24px",borderBottom:`1px solid ${AD.cardB}`,background:"rgba(255,255,255,0.02)",flexShrink:0}}>
        <div>
          <div style={{fontFamily:P,fontSize:15,fontWeight:700,color:C.t1,letterSpacing:"-0.2px"}}>{title}</div>
          {sub&&<div style={{fontFamily:P,fontSize:11,color:C.tm,marginTop:2}}>{sub}</div>}
        </div>
        <button onClick={onClose} style={{width:28,height:28,borderRadius:7,background:AD.inp,border:`1px solid ${AD.cardB}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><X size={13} color={C.tm}/></button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:24}}>{children}</div>
    </div>
  </div>;
}

function ACard({ children,style={},hover=false }:{ children:React.ReactNode;style?:React.CSSProperties;hover?:boolean }) {
  return <div className={hover?"a-card-hov":""} style={{background:AD.card,backdropFilter:"blur(20px)",border:`1px solid ${AD.cardB}`,borderRadius:18,boxShadow:"0 1px 3px rgba(0,0,0,0.4),0 8px 24px rgba(0,0,0,0.25),inset 0 1px 0 rgba(255,255,255,0.04)",...style}}>{children}</div>;
}

function CTooltip({ active,payload,label }:any) {
  if(!active||!payload?.length) return null;
  return <div style={{background:"rgba(12,10,28,0.97)",border:`1px solid ${AD.cardB}`,borderRadius:11,padding:"10px 14px",backdropFilter:"blur(20px)",boxShadow:"0 8px 24px rgba(0,0,0,0.4)"}}>
    {label&&<div style={{fontFamily:P,fontSize:10,color:C.td,marginBottom:7,letterSpacing:"0.05em"}}>{label}</div>}
    {payload.map((p:any,i:number)=><div key={i} style={{display:"flex",alignItems:"center",gap:7,marginBottom:i<payload.length-1?4:0}}>
      <div style={{width:6,height:6,borderRadius:"50%",background:p.color||p.fill}}/>
      <span style={{fontFamily:P,fontSize:11,color:C.tm,minWidth:46}}>{p.name}</span>
      <span style={{fontFamily:M,fontSize:11,color:C.t1,fontWeight:600,marginLeft:"auto"}}>{typeof p.value==="number"&&p.dataKey==="r"?`$${p.value.toLocaleString()}`:String(p.value)}</span>
    </div>)}
  </div>;
}

function SCard({ label,value,change,icon:Icon,color,note }:{ label:string;value:string;change?:string;icon:React.ElementType;color:string;note?:string }) {
  const pos=change?.startsWith("+");
  return <ACard style={{padding:"20px 22px",position:"relative",overflow:"hidden"}} hover>
    <div style={{position:"absolute",left:0,top:14,bottom:14,width:3,background:`linear-gradient(180deg,${color},${color}50)`,borderRadius:"0 3px 3px 0"}}/>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
      <div style={{width:38,height:38,borderRadius:11,background:`${color}18`,border:`1px solid ${color}28`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={17} color={color}/></div>
      {change&&<span style={{fontFamily:M,fontSize:9,letterSpacing:"0.05em",color:pos?C.buy:C.sell,background:pos?"rgba(0,208,132,0.1)":"rgba(255,90,107,0.1)",border:`1px solid ${pos?"rgba(0,208,132,0.2)":"rgba(255,90,107,0.2)"}`,borderRadius:100,padding:"2px 8px"}}>{change}</span>}
    </div>
    <div style={{fontFamily:M,fontSize:22,fontWeight:700,color:C.t1,letterSpacing:"-0.6px",marginBottom:3}}>{value}</div>
    <div style={{fontFamily:P,fontSize:12,color:C.tm}}>{label}</div>
    {note&&<div style={{fontFamily:P,fontSize:10,color:C.td,marginTop:2}}>{note}</div>}
  </ACard>;
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function AdminNav({ section,onChange }:{ section:AdminSection;onChange:(s:AdminSection)=>void }) {
  const groups:[string,[AdminSection,React.ElementType,string][]][]=[
    ["OVERVIEW",[["dashboard",BarChart2,"Dashboard"]]],
    ["MANAGE",  [["signals",Zap,"Signals"],["posts",BookOpen,"Posts"],["notifications",Bell,"Notifications"]]],
    ["SYSTEM",  [["subscriptions",CreditCard,"Subscriptions"],["users",Users,"Users"],["coupons",Tag,"Coupons"],["settings",Settings,"Settings"]]],
  ];
  return <nav style={{width:258,height:"100vh",background:AD.nav,borderRight:`1px solid ${AD.cardB}`,display:"flex",flexDirection:"column",flexShrink:0,position:"sticky",top:0}}>
    {/* Logo */}
    <div style={{padding:"22px 20px 18px",borderBottom:`1px solid ${AD.cardB}`}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:36,height:36,borderRadius:11,background:`linear-gradient(135deg,${C.brand},${C.brandH})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 14px ${C.brand}45`,flexShrink:0}}><Activity size={17} color="#fff"/></div>
        <div>
          <div style={{fontFamily:P,fontSize:13,fontWeight:700,color:C.t1,letterSpacing:"-0.2px"}}>Elite Trading</div>
          <div style={{fontFamily:M,fontSize:7.5,color:C.gold,letterSpacing:"0.16em"}}>ADMIN CONSOLE</div>
        </div>
      </div>
    </div>
    {/* Nav groups */}
    <div style={{flex:1,padding:"12px 10px",overflowY:"auto",scrollbarWidth:"none",display:"flex",flexDirection:"column",gap:2}}>
      {groups.map(([grp,items])=><div key={grp} style={{marginBottom:6}}>
        <div style={{fontFamily:M,fontSize:8,color:C.td,letterSpacing:"0.14em",padding:"7px 10px 4px"}}>{grp}</div>
        {items.map(([id,Icon,lbl])=>{
          const on=section===id;
          return <button key={id} onClick={()=>onChange(id)} className="a-nav-item" style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"8.5px 10px",borderRadius:10,background:on?"rgba(128,0,255,0.13)":"transparent",color:on?C.t1:C.td,border:`1px solid ${on?"rgba(128,0,255,0.22)":"transparent"}`,cursor:"pointer",textAlign:"left",fontFamily:P,fontSize:12.5,fontWeight:on?600:400,position:"relative",transition:"all 0.15s"}}>
            {on&&<div style={{position:"absolute",left:0,top:7,bottom:7,width:2.5,background:C.brand,borderRadius:"0 3px 3px 0",boxShadow:`0 0 8px ${C.brand}`}}/>}
            <Icon size={14.5} color={on?C.brand:C.td}/>{lbl}
            {on&&<div style={{marginLeft:"auto",width:4.5,height:4.5,borderRadius:"50%",background:C.brand,boxShadow:`0 0 6px ${C.brand}`}}/>}
          </button>;
        })}
      </div>)}
    </div>
    {/* Admin user */}
    <div style={{padding:"14px 16px",borderTop:`1px solid ${AD.cardB}`}}>
      <div style={{display:"flex",alignItems:"center",gap:9}}>
        <div style={{width:30,height:30,borderRadius:9,flexShrink:0,background:`linear-gradient(135deg,${C.gold}40,${C.goldL}20)`,border:`1px solid ${C.gold}30`,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontFamily:P,fontSize:9,fontWeight:700,color:C.gold}}>AD</span>
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontFamily:P,fontSize:11,fontWeight:600,color:C.t1}}>Administrator</div>
          <div style={{fontFamily:P,fontSize:10,color:C.td,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>admin@elite.io</div>
        </div>
        <ChevronDown size={13} color={C.td}/>
      </div>
    </div>
  </nav>;
}

// ─── Topbar ───────────────────────────────────────────────────────────────────

function AdminTopBar({ section }:{ section:AdminSection }) {
  const titles:Record<AdminSection,[string,string]>={
    dashboard:["Dashboard","Overview & Analytics"],
    signals:["Signals","Manage Trading Signals"],
    posts:["Posts","Content Management"],
    notifications:["Notifications","Push Notification Center"],
    subscriptions:["Subscriptions","Plans & Billing"],
    users:["Users","Member Management"],
    coupons:["Coupons","Promotions & Discounts"],
    settings:["Settings","System Configuration"],
  };
  const [title,subtitle]=titles[section];
  const [q,setQ]=useState("");
  const now=new Date();
  const tStr=now.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});
  return <div style={{height:60,background:"rgba(7,5,18,0.96)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${AD.cardB}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 28px",flexShrink:0,position:"sticky",top:0,zIndex:100}}>
    <div>
      <div style={{fontFamily:P,fontSize:16,fontWeight:700,color:C.t1,letterSpacing:"-0.3px"}}>{title}</div>
      <div style={{fontFamily:P,fontSize:10.5,color:C.td}}>{subtitle}</div>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <div style={{fontFamily:M,fontSize:10.5,color:C.td,letterSpacing:"0.05em"}}>{tStr} · Jul 23, 2026</div>
      <div style={{display:"flex",alignItems:"center",gap:7,background:AD.inp,border:`1px solid ${AD.inpB}`,borderRadius:9,padding:"7px 12px",width:186}}>
        <Search size={12} color={C.td}/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Quick search…" style={{background:"none",border:"none",outline:"none",fontFamily:P,fontSize:12,color:C.t1,caretColor:C.brand,width:"100%"}}/>
      </div>
      <div style={{position:"relative",marginRight:6}}>
        <div style={{width:34,height:34,borderRadius:9,background:AD.inp,border:`1px solid ${AD.inpB}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Bell size={14} color={C.t2}/></div>
        <div style={{position:"absolute",top:-2,right:-2,width:15,height:15,borderRadius:"50%",background:`linear-gradient(135deg,${C.brand},${C.brandH})`,display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${AD.bg}`}}><span style={{fontFamily:M,fontSize:7,fontWeight:700,color:"#fff"}}>3</span></div>
      </div>
      
      {/* Admin Profile Dropdown */}
      <div style={{position:"relative"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",background:AD.inp,border:`1px solid ${AD.inpB}`,borderRadius:9,padding:"4px 10px 4px 4px",transition:"all 0.15s"}} onClick={(e) => { const el = e.currentTarget.nextElementSibling; el.style.display = el.style.display === "none" ? "block" : "none"; }}>
          <div style={{width:26,height:26,borderRadius:6,background:`linear-gradient(135deg,${C.gold}40,${C.goldL}20)`,border:`1px solid ${C.gold}30`,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontFamily:P,fontSize:10,fontWeight:700,color:C.gold}}>AA</span>
          </div>
          <div style={{display:"flex",flexDirection:"column"}}>
            <span style={{fontFamily:P,fontSize:11,fontWeight:600,color:C.t1,lineHeight:1.1}}>Ahmed Alhajji</span>
            <span style={{fontFamily:P,fontSize:9,color:C.td,lineHeight:1.1}}>Administrator</span>
          </div>
          <ChevronDown size={14} color={C.td} style={{marginLeft:4}}/>
        </div>
        
        {/* Dropdown Menu - Native CSS based toggle */}
        <div style={{display:"none",position:"absolute",top:"100%",right:0,marginTop:10,background:"#161326",border:`1px solid rgba(255,255,255,0.08)`,borderRadius:12,width:200,padding:"8px",boxShadow:"0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.8)",zIndex:2000}}>
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
        </div>
      </div>
    </div>
  </div>;
}

// ─── Dashboard Home ───────────────────────────────────────────────────────────

function ADashboard() {
  const r1:Parameters<typeof SCard>[0][]=[
    {label:"Total Subscribers",   value:"1,247",  change:"+12.4%",icon:Users,      color:C.brand},
    {label:"Active VIP Members",  value:"384",    change:"+8.2%", icon:Crown,      color:C.gold},
    {label:"Forex Subscribers",   value:"521",    change:"+15.1%",icon:TrendingUp, color:C.buy},
    {label:"Crypto Subscribers",  value:"289",    change:"+6.7%", icon:Zap,        color:"#60A5FA"},
  ];
  const r2:Parameters<typeof SCard>[0][]=[
    {label:"Active Free Trials",  value:"53",     icon:Star,      color:"#C084FC", note:"2 expire today"},
    {label:"Signals Today",       value:"3",      icon:Activity,  color:C.buy,     note:"2 active · 1 draft"},
    {label:"Posts Today",         value:"1",      icon:FileText,  color:C.gold,    note:"Published"},
    {label:"Monthly Revenue",     value:"$48,230",change:"+18.3%",icon:DollarSign, color:C.buy},
  ];
  return <div style={{padding:"28px 32px",display:"flex",flexDirection:"column",gap:22}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:13}}>
      {r1.map(s=><SCard key={s.label} {...s}/>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:13}}>
      {r2.map(s=><SCard key={s.label} {...s}/>)}
    </div>
    {/* Charts row 1 */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:18}}>
      <ACard style={{padding:"22px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div>
            <div style={{fontFamily:P,fontSize:14,fontWeight:700,color:C.t1,letterSpacing:"-0.2px",marginBottom:2}}>Subscription Growth</div>
            <div style={{fontFamily:M,fontSize:9,color:C.td,letterSpacing:"0.1em"}}>6-MONTH TREND · ALL PLANS</div>
          </div>
          <div style={{display:"flex",gap:14}}>
            {[{l:"VIP",c:C.brand},{l:"Forex",c:C.gold},{l:"Crypto",c:"#60A5FA"}].map(({l,c})=>(
              <div key={l} style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:7,height:7,borderRadius:"50%",background:c}}/><span style={{fontFamily:P,fontSize:10.5,color:C.tm}}>{l}</span></div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={GROWTH_DATA} margin={{top:4,right:4,bottom:0,left:-8}}>
            <defs>
              <linearGradient id="gV" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.brand} stopOpacity={0.25}/><stop offset="95%" stopColor={C.brand} stopOpacity={0}/></linearGradient>
              <linearGradient id="gF" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.gold}  stopOpacity={0.2}/><stop offset="95%" stopColor={C.gold}  stopOpacity={0}/></linearGradient>
              <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#60A5FA" stopOpacity={0.18}/><stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
            <XAxis dataKey="m" tick={{fontFamily:M,fontSize:9,fill:C.td}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontFamily:M,fontSize:9,fill:C.td}} axisLine={false} tickLine={false} width={30}/>
            <Tooltip content={<CTooltip/>}/>
            <Area type="monotone" dataKey="v" name="VIP"   stroke={C.brand} fill="url(#gV)" strokeWidth={1.8} dot={false}/>
            <Area type="monotone" dataKey="f" name="Forex" stroke={C.gold}  fill="url(#gF)" strokeWidth={1.8} dot={false}/>
            <Area type="monotone" dataKey="c" name="Crypto"stroke="#60A5FA" fill="url(#gC)" strokeWidth={1.8} dot={false}/>
          </AreaChart>
        </ResponsiveContainer>
      </ACard>
      {/* Donut */}
      <ACard style={{padding:"22px 24px"}}>
        <div style={{marginBottom:16}}>
          <div style={{fontFamily:P,fontSize:14,fontWeight:700,color:C.t1,letterSpacing:"-0.2px",marginBottom:2}}>Signal Performance</div>
          <div style={{fontFamily:M,fontSize:9,color:C.td,letterSpacing:"0.1em"}}>ALL TIME · 286 SIGNALS</div>
        </div>
        <div style={{position:"relative",height:158}}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={PERF_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={3} dataKey="v" strokeWidth={0}>
                {PERF_DATA.map((e,i)=><Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip content={<CTooltip/>}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center",pointerEvents:"none"}}>
            <div style={{fontFamily:M,fontSize:18,fontWeight:700,color:C.t1,lineHeight:1}}>62%</div>
            <div style={{fontFamily:P,fontSize:9,color:C.td,marginTop:2}}>Win Rate</div>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:7,marginTop:8}}>
          {PERF_DATA.map(e=><div key={e.n} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:7,height:7,borderRadius:"50%",background:e.color}}/><span style={{fontFamily:P,fontSize:11.5,color:C.tm}}>{e.n}</span></div>
            <span style={{fontFamily:M,fontSize:12,fontWeight:600,color:C.t1}}>{e.v}%</span>
          </div>)}
        </div>
      </ACard>
    </div>
    {/* Charts row 2 */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:18}}>
      <ACard style={{padding:"22px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <div>
            <div style={{fontFamily:P,fontSize:14,fontWeight:700,color:C.t1,letterSpacing:"-0.2px",marginBottom:2}}>Revenue Analytics</div>
            <div style={{fontFamily:M,fontSize:9,color:C.td,letterSpacing:"0.1em"}}>MONTHLY · USD · SUBSCRIPTIONS ONLY</div>
          </div>
          <AGhost icon={<Download size={12}/>} size="sm">Export CSV</AGhost>
        </div>
        <ResponsiveContainer width="100%" height={182}>
          <BarChart data={REVENUE_DATA} margin={{top:4,right:4,bottom:0,left:-8}} barSize={34}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
            <XAxis dataKey="m" tick={{fontFamily:M,fontSize:9,fill:C.td}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontFamily:M,fontSize:9,fill:C.td}} axisLine={false} tickLine={false} width={44} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`}/>
            <Tooltip content={<CTooltip/>}/>
            <Bar dataKey="r" name="Revenue" radius={[5,5,0,0]}>
              {REVENUE_DATA.map((_,i)=><Cell key={i} fill={i===REVENUE_DATA.length-1?C.gold:C.brand} fillOpacity={0.65+i*0.06}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ACard>
      {/* Activity */}
      <ACard style={{padding:"22px 24px"}}>
        <div style={{marginBottom:16}}>
          <div style={{fontFamily:P,fontSize:14,fontWeight:700,color:C.t1,letterSpacing:"-0.2px",marginBottom:2}}>Recent Activity</div>
          <div style={{fontFamily:M,fontSize:9,color:C.td,letterSpacing:"0.1em"}}>LIVE · LAST 24H</div>
        </div>
        <div style={{display:"flex",flexDirection:"column"}}>
          {AACTIVITY.map((a,i)=><div key={i} style={{display:"flex",gap:11,padding:"10px 0",borderBottom:i<AACTIVITY.length-1?`1px solid ${AD.cardB}`:"none",alignItems:"flex-start"}}>
            <div style={{width:30,height:30,borderRadius:9,flexShrink:0,background:`${a.col}12`,border:`1px solid ${a.col}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{a.icon}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:P,fontSize:11,color:C.t2,lineHeight:1.45}}>{a.text}</div>
              <div style={{fontFamily:M,fontSize:9,color:C.td,marginTop:2}}>{a.time}</div>
            </div>
          </div>)}
        </div>
      </ACard>
    </div>
  </div>;
}

// ─── Signals ──────────────────────────────────────────────────────────────────

function ASignals() {
  const [filter,setFilter]=useState("All");
  const [pubModal,setPubModal]=useState(false);
  const [closeTarget,setCloseTarget]=useState<typeof ASIGNALS[0]|null>(null);
  const [form,setForm]=useState({asset:"",cat:"Forex",type:"Swing",dir:"BUY",entry:"",sl:"",tp1:"",tp2:"",tp3:"",notes:""});
  const [closeRes,setCloseRes]=useState("Win");
  const [closePnl,setClosePnl]=useState("");
  const tabs=["All","Active","Draft","Scheduled","Closed"];
  const filtered=ASIGNALS.filter(s=>filter==="All"||s.status===filter);
  const dCol=(d:string)=>d==="BUY"?C.buy:C.sell;
  const sChip=(s:string)=>{
    const m:Record<string,"ok"|"brand"|"info"|"muted"|"err">={Active:"ok",Draft:"muted",Scheduled:"info",Closed:"err"};
    return <Chip label={s} type={m[s]||"muted"}/>;
  };
  const COLS="90px 90px 75px 58px 108px 96px 96px 96px 96px 92px 108px 76px";
  const HEAD=["ASSET","CATEGORY","TYPE","DIR","ENTRY","SL","TP1","TP2","TP3","STATUS","PUBLISHED","ACTIONS"];
  return <div style={{padding:"28px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
      <div>
        <h2 style={{fontFamily:P,fontSize:20,fontWeight:700,color:C.t1,margin:"0 0 4px",letterSpacing:"-0.4px"}}>Signals</h2>
        <div style={{fontFamily:M,fontSize:9,color:C.td,letterSpacing:"0.12em"}}>{ASIGNALS.length} TOTAL · {ASIGNALS.filter(s=>s.status==="Active").length} ACTIVE</div>
      </div>
      <APrimary onClick={()=>setPubModal(true)} icon={<Plus size={14}/>}>Publish Signal</APrimary>
    </div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
      <div style={{display:"flex",gap:4,background:"rgba(255,255,255,0.03)",padding:5,borderRadius:10,border:`1px solid rgba(255,255,255,0.05)`}}>
        {tabs.map(t=><button key={t} onClick={()=>setFilter(t)} style={{padding:"6px 16px",borderRadius:6,background:filter===t?"rgba(255,255,255,0.1)":"transparent",color:filter===t?"#fff":C.td,border:"none",fontFamily:P,fontSize:12,fontWeight:500,cursor:"pointer",transition:"all 0.2s",boxShadow:filter===t?"0 2px 8px rgba(0,0,0,0.2)":"none"}}>{t}</button>)}
      </div>
      <span style={{fontFamily:M,fontSize:11,color:C.td}}>{filtered.length} results</span>
    </div>
    <ACard>
      <div className="a-tscroll" style={{overflowX:"auto"}}>
        <div style={{minWidth:1090}}>
          <div style={{display:"grid",gridTemplateColumns:COLS,padding:"14px 24px",background:AD.nav,position:"sticky",top:0,zIndex:10,borderBottom:`1px solid ${AD.cardB}`,borderRadius:"18px 18px 0 0"}}>
            {HEAD.map(h=><span key={h} style={{fontFamily:M,fontSize:8,color:C.td,letterSpacing:"0.12em"}}>{h}</span>)}
          </div>
          {filtered.map((s,i)=><div key={s.id} className="a-row" style={{display:"grid",gridTemplateColumns:COLS,padding:"16px 24px",borderBottom:i<filtered.length-1?`1px solid ${AD.cardB}`:"none",alignItems:"center"}}>
            <span style={{fontFamily:M,fontSize:12.5,fontWeight:700,color:C.t1}}>{s.asset}</span>
            <span style={{fontFamily:P,fontSize:11,color:C.tm}}>{s.cat}</span>
            <span style={{fontFamily:P,fontSize:11,color:C.td}}>{s.type}</span>
            <span style={{fontFamily:M,fontSize:11,fontWeight:700,color:dCol(s.dir)}}>{s.dir}</span>
            <span style={{fontFamily:M,fontSize:11.5,color:C.t1}}>{s.entry}</span>
            <span style={{fontFamily:M,fontSize:11,color:C.sell}}>{s.sl}</span>
            <span style={{fontFamily:M,fontSize:11,color:C.buy}}>{s.tp1}</span>
            <span style={{fontFamily:M,fontSize:11,color:s.tp2==="—"?C.td:C.buy}}>{s.tp2}</span>
            <span style={{fontFamily:M,fontSize:11,color:s.tp3==="—"?C.td:C.buy}}>{s.tp3}</span>
            {sChip(s.status)}
            <span style={{fontFamily:M,fontSize:9.5,color:C.td}}>{s.pub}</span>
            <div style={{display:"flex",gap:6}}>
              <button className="a-btn" title="Edit" style={{width:32,height:32,borderRadius:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.15s"}}><Pencil size={13} color={C.t2}/></button>
              {s.status==="Active"&&<button title="Close" onClick={()=>setCloseTarget(s)} style={{width:27,height:27,borderRadius:7,background:"rgba(191,160,109,0.1)",border:"1px solid rgba(191,160,109,0.2)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:12}}>🔒</button>}
              <button className="a-btn" title="Delete" style={{width:32,height:32,borderRadius:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.15s"}}><Trash2 size={13} color={C.sell}/></button>
            </div>
          </div>)}
        </div>
      </div>
    </ACard>
    {pubModal&&<AModal title="Publish New Signal" sub="Fill in the details below and publish or save as draft" onClose={()=>setPubModal(false)} width={700}>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:13}}>
          <AIn label="Asset / Pair" placeholder="e.g. BTC/USDT" value={form.asset} onChange={v=>setForm({...form,asset:v})}/>
          <ASel label="Category" value={form.cat} onChange={v=>setForm({...form,cat:v})} opts={[{l:"Forex",v:"Forex"},{l:"Cryptocurrency",v:"Crypto"},{l:"Commodity",v:"Commodity"},{l:"Index",v:"Index"}]}/>
          <ASel label="Signal Type" value={form.type} onChange={v=>setForm({...form,type:v})} opts={[{l:"Swing Trade",v:"Swing"},{l:"Intraday",v:"Intraday"},{l:"Scalp",v:"Scalp"},{l:"Position",v:"Position"}]}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:13}}>
          <ASel label="Direction" value={form.dir} onChange={v=>setForm({...form,dir:v})} opts={[{l:"BUY (Long) ↑",v:"BUY"},{l:"SELL (Short) ↓",v:"SELL"}]}/>
          <AIn label="Entry Price" placeholder="e.g. 67,420.00" value={form.entry} onChange={v=>setForm({...form,entry:v})}/>
          <AIn label="Stop Loss" placeholder="e.g. 65,800.00" value={form.sl} onChange={v=>setForm({...form,sl:v})}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:13}}>
          <AIn label="Take Profit 1" placeholder="e.g. 69,000.00" value={form.tp1} onChange={v=>setForm({...form,tp1:v})}/>
          <AIn label="Take Profit 2 (optional)" placeholder="e.g. 71,500.00" value={form.tp2} onChange={v=>setForm({...form,tp2:v})}/>
          <AIn label="Take Profit 3 (optional)" placeholder="e.g. 74,000.00" value={form.tp3} onChange={v=>setForm({...form,tp3:v})}/>
        </div>
        <ATa label="Analysis Notes (optional)" placeholder="Briefly describe the setup, key levels, and confluence…" value={form.notes} onChange={v=>setForm({...form,notes:v})}/>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end",paddingTop:2}}>
          <AGhost onClick={()=>setPubModal(false)}>Cancel</AGhost>
          <AGhost icon={<FileText size={13}/>}>Save Draft</AGhost>
          <APrimary icon={<Zap size={13}/>} onClick={()=>setPubModal(false)}>Publish Signal</APrimary>
        </div>
      </div>
    </AModal>}
    {closeTarget&&<AModal title={`Close Signal — ${closeTarget.asset}`} sub="Set the outcome before closing this signal" onClose={()=>setCloseTarget(null)} width={440}>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div style={{background:`${C.brand}0A`,border:`1px solid ${C.brand}20`,borderRadius:12,padding:"12px 14px"}}>
          <div style={{fontFamily:M,fontSize:13,fontWeight:700,color:C.t1}}>{closeTarget.asset}</div>
          <div style={{fontFamily:P,fontSize:11,color:C.tm,marginTop:2}}>Entry: {closeTarget.entry} · SL: {closeTarget.sl}</div>
        </div>
        <ASel label="Final Result" value={closeRes} onChange={setCloseRes} opts={[{l:"✓ Win",v:"Win"},{l:"✗ Loss",v:"Loss"},{l:"— Breakeven",v:"Breakeven"}]}/>
        <AIn label="Profit / Loss %" placeholder="e.g. +3.25 or -1.80" value={closePnl} onChange={setClosePnl}/>
        <div style={{background:"rgba(0,208,132,0.06)",border:"1px solid rgba(0,208,132,0.18)",borderRadius:11,padding:"11px 14px"}}>
          <div style={{fontFamily:P,fontSize:11,color:C.t2,lineHeight:1.55}}>Closing this signal will push it to the mobile app History tab with the final result and P&L displayed to subscribers.</div>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
          <AGhost onClick={()=>setCloseTarget(null)}>Cancel</AGhost>
          <APrimary icon={<Check size={13}/>} onClick={()=>setCloseTarget(null)}>Confirm & Close</APrimary>
        </div>
      </div>
    </AModal>}
  </div>;
}

// ─── Posts ────────────────────────────────────────────────────────────────────

function APosts() {
  const [modal,setModal]=useState(false);
  const [form,setForm]=useState({title:"",body:"",cat:"Market Update"});
  const catCol:Record<string,string>={"Market Update":C.gold,"Education":"#C084FC","News":"#60A5FA","Announcement":C.buy};
  const COLS="70px 1fr 130px 80px 90px 90px 100px 76px";
  const HEAD=["COVER","TITLE","CATEGORY","LIKES","COMMENTS","DATE","STATUS","ACTIONS"];
  return <div style={{padding:"28px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
      <div>
        <h2 style={{fontFamily:P,fontSize:20,fontWeight:700,color:C.t1,margin:"0 0 4px",letterSpacing:"-0.4px"}}>Posts</h2>
        <div style={{fontFamily:M,fontSize:9,color:C.td,letterSpacing:"0.12em"}}>{APOSTS.length} TOTAL · {APOSTS.filter(p=>p.status==="Published").length} PUBLISHED</div>
      </div>
      <APrimary onClick={()=>setModal(true)} icon={<Plus size={14}/>}>Create Post</APrimary>
    </div>
    <ACard>
      <div style={{display:"grid",gridTemplateColumns:COLS,padding:"14px 24px",background:AD.nav,position:"sticky",top:0,zIndex:10,borderRadius:"18px 18px 0 0",borderBottom:`1px solid ${AD.cardB}`}}>
        {HEAD.map(h=><span key={h} style={{fontFamily:M,fontSize:8,color:C.td,letterSpacing:"0.12em"}}>{h}</span>)}
      </div>
      {APOSTS.map((post,i)=><div key={post.id} className="a-row" style={{display:"grid",gridTemplateColumns:COLS,padding:"16px 24px",borderBottom:i<APOSTS.length-1?`1px solid ${AD.cardB}`:"none",alignItems:"center"}}>
        <div style={{width:56,height:36,borderRadius:8,background:C.surface,overflow:"hidden",flexShrink:0}}>
          {post.img?<img src={post.img} alt={post.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}><Image size={13} color={C.td}/></div>}
        </div>
        <div style={{paddingRight:14}}><div style={{fontFamily:P,fontSize:12.5,fontWeight:600,color:C.t1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{post.title}</div></div>
        <span style={{fontFamily:P,fontSize:11,color:catCol[post.cat]||C.tm}}>{post.cat}</span>
        <span style={{fontFamily:M,fontSize:12,color:C.t2}}>{post.likes}</span>
        <span style={{fontFamily:M,fontSize:12,color:C.t2}}>{post.comments}</span>
        <span style={{fontFamily:M,fontSize:10,color:C.td}}>{post.date}</span>
        <Chip label={post.status} type={post.status==="Published"?"ok":"muted"}/>
        <div style={{display:"flex",gap:6}}>
          <button className="a-btn" title="Edit" style={{width:32,height:32,borderRadius:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.15s"}}><Pencil size={13} color={C.t2}/></button>
          <button className="a-btn" title="Delete" style={{width:32,height:32,borderRadius:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.15s"}}><Trash2 size={13} color={C.sell}/></button>
        </div>
      </div>)}
    </ACard>
    {modal&&<AModal title="Create Post" sub="Publish to the mobile app Posts feed" onClose={()=>setModal(false)} width={680}>
      <div style={{display:"flex",flexDirection:"column",gap:15}}>
        <div style={{border:`2px dashed ${AD.cardB}`,borderRadius:12,height:110,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:7,cursor:"pointer",background:"rgba(255,255,255,0.01)"}}>
          <Image size={22} color={C.td}/>
          <span style={{fontFamily:P,fontSize:12,color:C.td}}>Upload banner image</span>
          <span style={{fontFamily:P,fontSize:10,color:C.td}}>PNG or JPG · 1200×480px recommended</span>
        </div>
        <AIn label="Post Title" placeholder="Write a compelling headline…" value={form.title} onChange={v=>setForm({...form,title:v})}/>
        <ATa label="Content" placeholder="Write the post body…" value={form.body} onChange={v=>setForm({...form,body:v})} rows={4}/>
        <ASel label="Category" value={form.cat} onChange={v=>setForm({...form,cat:v})} opts={[{l:"Market Update",v:"Market Update"},{l:"Education",v:"Education"},{l:"News",v:"News"},{l:"Announcement",v:"Announcement"}]}/>
        <div style={{background:"rgba(128,0,255,0.06)",border:"1px solid rgba(128,0,255,0.14)",borderRadius:11,padding:"10px 14px",display:"flex",gap:8,alignItems:"center"}}>
          <Bell size={13} color="#C084FC"/>
          <span style={{fontFamily:P,fontSize:11,color:C.t2}}>Publishing will automatically send a push notification to all subscribers.</span>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
          <AGhost onClick={()=>setModal(false)}>Cancel</AGhost>
          <AGhost icon={<FileText size={13}/>}>Save Draft</AGhost>
          <APrimary icon={<BookOpen size={13}/>} onClick={()=>setModal(false)}>Publish Post</APrimary>
        </div>
      </div>
    </AModal>}
  </div>;
}

// ─── Notifications ────────────────────────────────────────────────────────────

function ANotifications() {
  const [form,setForm]=useState({title:"",msg:"",audience:"All Users"});
  const [sent,setSent]=useState(false);
  const audOpts=[
    {l:"All Users (1,247)",v:"All Users"},{l:"VIP Members (384)",v:"VIP Users"},
    {l:"Forex Members (521)",v:"Forex Users"},{l:"Crypto Members (289)",v:"Crypto Users"},
    {l:"Trial Users (53)",v:"Trial Users"},
  ];
  const COLS="1fr 120px 130px 80px 90px";
  const HEAD=["TITLE","AUDIENCE","SENT","REACH","OPEN RATE"];
  return <div style={{padding:"28px 32px"}}>
    <div style={{marginBottom:24}}>
      <h2 style={{fontFamily:P,fontSize:20,fontWeight:700,color:C.t1,margin:"0 0 4px",letterSpacing:"-0.4px"}}>Push Notifications</h2>
      <div style={{fontFamily:M,fontSize:9,color:C.td,letterSpacing:"0.12em"}}>SEND · SCHEDULE · HISTORY</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"420px 1fr",gap:22,alignItems:"start"}}>
      <ACard style={{padding:"22px 24px"}}>
        <div style={{fontFamily:P,fontSize:14,fontWeight:700,color:C.t1,marginBottom:3}}>Send Notification</div>
        <div style={{fontFamily:P,fontSize:11,color:C.tm,marginBottom:18}}>Deliver an instant message to your subscribers.</div>
        {sent?<div style={{textAlign:"center",padding:"28px 0"}}>
          <div style={{width:52,height:52,borderRadius:16,background:"rgba(0,208,132,0.1)",border:"1px solid rgba(0,208,132,0.25)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}><CheckCircle size={26} color={C.buy}/></div>
          <div style={{fontFamily:P,fontSize:14,fontWeight:600,color:C.buy,marginBottom:4}}>Notification Sent</div>
          <div style={{fontFamily:P,fontSize:12,color:C.tm,marginBottom:18}}>Delivered to {form.audience}</div>
          <AGhost onClick={()=>{ setSent(false); setForm({title:"",msg:"",audience:"All Users"}); }}>Send Another</AGhost>
        </div>:<div style={{display:"flex",flexDirection:"column",gap:13}}>
          <AIn label="Title" placeholder="e.g. New Signal — BTC/USDT" value={form.title} onChange={v=>setForm({...form,title:v})}/>
          <ATa label="Message" placeholder="Write the message body…" value={form.msg} onChange={v=>setForm({...form,msg:v})} rows={2}/>
          <ASel label="Audience" value={form.audience} onChange={v=>setForm({...form,audience:v})} opts={audOpts}/>
          {(form.title||form.msg)&&<div style={{background:AD.inp,border:`1px solid ${AD.inpB}`,borderRadius:11,padding:"13px 14px"}}>
            <div style={{fontFamily:M,fontSize:8,color:C.td,letterSpacing:"0.12em",marginBottom:9}}>PREVIEW</div>
            <div style={{display:"flex",gap:10}}>
              <div style={{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${C.brand},${C.brandH})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Activity size={15} color="#fff"/></div>
              <div>
                <div style={{fontFamily:P,fontSize:12,fontWeight:600,color:C.t1,marginBottom:2}}>{form.title||"Notification Title"}</div>
                <div style={{fontFamily:P,fontSize:11,color:C.tm,lineHeight:1.45}}>{form.msg||"Your message here."}</div>
              </div>
            </div>
          </div>}
          <div style={{display:"flex",gap:8}}>
            <APrimary icon={<Bell size={13}/>} onClick={()=>setSent(true)}>Send Now</APrimary>
            <AGhost icon={<Calendar size={13}/>}>Schedule</AGhost>
          </div>
        </div>}
      </ACard>
      <ACard>
        <div style={{padding:"18px 22px",borderBottom:`1px solid ${AD.cardB}`}}>
          <div style={{fontFamily:P,fontSize:14,fontWeight:700,color:C.t1}}>Notification History</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:COLS,padding:"14px 24px",background:AD.nav,position:"sticky",top:0,zIndex:10,borderBottom:`1px solid ${AD.cardB}`}}>
          {HEAD.map(h=><span key={h} style={{fontFamily:M,fontSize:8,color:C.td,letterSpacing:"0.12em"}}>{h}</span>)}
        </div>
        {ANOTIFS.map((n,i)=><div key={n.id} className="a-row" style={{display:"grid",gridTemplateColumns:COLS,padding:"16px 24px",borderBottom:i<ANOTIFS.length-1?`1px solid ${AD.cardB}`:"none",alignItems:"center"}}>
          <span style={{fontFamily:P,fontSize:12,fontWeight:500,color:C.t1}}>{n.title}</span>
          <span style={{fontFamily:P,fontSize:11,color:C.tm}}>{n.audience}</span>
          <span style={{fontFamily:M,fontSize:10,color:C.td}}>{n.sent}</span>
          <span style={{fontFamily:M,fontSize:12,color:C.t2}}>{n.reach.toLocaleString()}</span>
          <div>
            <div style={{fontFamily:M,fontSize:13,fontWeight:600,color:C.buy}}>{Math.round((n.opened/n.reach)*100)}%</div>
            <div style={{fontFamily:P,fontSize:9,color:C.td}}>{n.opened.toLocaleString()} opened</div>
          </div>
        </div>)}
      </ACard>
    </div>
  </div>;
}

// ─── Subscriptions ────────────────────────────────────────────────────────────

function ASubscriptions() {
  const [trialOn,setTrialOn]=useState(true);
  const [earlyOn,setEarlyOn]=useState(true);
  const [editing,setEditing]=useState<string|null>(null);
  const plans=[
    {id:"vip",   name:"VIP",   emoji:"👑",monthly:"79", yearly:"699", color:C.brand, subs:384, features:["All Forex Signals","All Crypto Signals","Gold & Commodities","Index Signals","Priority Push Alerts","VIP Community","Q&A Sessions","Weekly Reports"]},
    {id:"forex", name:"Forex", emoji:"💱",monthly:"49", yearly:"469", color:C.gold,  subs:521, features:["All Forex Signals","Gold & Commodities","Push Alerts","Community Access","Weekly Recap"]},
    {id:"crypto",name:"Crypto",emoji:"₿",  monthly:"39",yearly:"369", color:"#60A5FA",subs:289,features:["All Crypto Signals","Altcoin Alerts","Push Alerts","Community Access","Weekly Recap"]},
  ];
  const stats=[
    {l:"VIP Members",v:"384",c:C.brand,I:Crown},{l:"Forex Members",v:"521",c:C.gold,I:TrendingUp},
    {l:"Crypto Members",v:"289",c:"#60A5FA",I:Zap},{l:"Active Trials",v:"53",c:"#C084FC",I:Star},
    {l:"Expired Plans",v:"12",c:C.sell,I:AlertCircle},
  ];
  return <div style={{padding:"28px 32px"}}>
    <div style={{marginBottom:24}}>
      <h2 style={{fontFamily:P,fontSize:20,fontWeight:700,color:C.t1,margin:"0 0 4px",letterSpacing:"-0.4px"}}>Subscriptions</h2>
      <div style={{fontFamily:M,fontSize:9,color:C.td,letterSpacing:"0.12em"}}>PLANS · PRICING · TRIAL MANAGEMENT</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:13,marginBottom:24}}>
      {stats.map(s=><ACard key={s.l} style={{padding:"18px 20px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",left:0,top:14,bottom:14,width:2.5,background:s.c,borderRadius:"0 3px 3px 0"}}/>
        <div style={{width:34,height:34,borderRadius:10,background:`${s.c}14`,border:`1px solid ${s.c}22`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}><s.I size={15} color={s.c}/></div>
        <div style={{fontFamily:M,fontSize:20,fontWeight:700,color:C.t1,marginBottom:2}}>{s.v}</div>
        <div style={{fontFamily:P,fontSize:11,color:C.tm}}>{s.l}</div>
      </ACard>)}
    </div>
    <div style={{fontFamily:M,fontSize:8.5,color:C.td,letterSpacing:"0.14em",marginBottom:13}}>SUBSCRIPTION PLANS</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:26}}>
      {plans.map(plan=><ACard key={plan.id} style={{padding:"22px 24px",border:`1px solid ${plan.color}1A`}} hover>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:38,height:38,borderRadius:12,background:`${plan.color}14`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{plan.emoji}</div>
            <div><div style={{fontFamily:P,fontSize:14,fontWeight:700,color:C.t1}}>{plan.name}</div><div style={{fontFamily:P,fontSize:10,color:C.tm}}>{plan.subs} active</div></div>
          </div>
          <AGhost size="sm" icon={<Pencil size={11}/>} onClick={()=>setEditing(editing===plan.id?null:plan.id)}>Edit</AGhost>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
          {[{l:"MONTHLY",v:`$${plan.monthly}`,c:C.t1},{l:"YEARLY",v:`$${plan.yearly}`,c:plan.color}].map(p=><div key={p.l} style={{background:AD.inp,borderRadius:10,padding:"10px 13px"}}>
            <div style={{fontFamily:M,fontSize:7.5,color:C.td,letterSpacing:"0.1em",marginBottom:4}}>{p.l}</div>
            <div style={{fontFamily:M,fontSize:18,fontWeight:700,color:p.c}}>{p.v}</div>
          </div>)}
        </div>
        {editing===plan.id?<div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
            <AIn label="Monthly ($)" value={plan.monthly} onChange={()=>{}}/>
            <AIn label="Yearly ($)" value={plan.yearly} onChange={()=>{}}/>
          </div>
          <ATa label="Features (one per line)" value={plan.features.join("\n")} onChange={()=>{}} rows={4}/>
          <div style={{display:"flex",gap:7}}>
            <APrimary size="sm" icon={<Check size={11}/>} onClick={()=>setEditing(null)}>Save</APrimary>
            <AGhost size="sm" onClick={()=>setEditing(null)}>Cancel</AGhost>
          </div>
        </div>:<div style={{display:"flex",flexDirection:"column",gap:6}}>
          {plan.features.map(f=><div key={f} style={{display:"flex",alignItems:"center",gap:7}}><CheckCircle size={10} color={plan.color}/><span style={{fontFamily:P,fontSize:11,color:C.tm}}>{f}</span></div>)}
        </div>}
      </ACard>)}
    </div>
    <div style={{fontFamily:M,fontSize:8.5,color:C.td,letterSpacing:"0.14em",marginBottom:13}}>FREE TRIAL SETTINGS</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
      <ACard style={{padding:"22px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div><div style={{fontFamily:P,fontSize:14,fontWeight:600,color:C.t1,marginBottom:2}}>Standard Free Trial</div><div style={{fontFamily:P,fontSize:11,color:C.tm}}>For all new users after the first 100</div></div>
          <ATog on={trialOn} onChange={setTrialOn}/>
        </div>
        <div style={{background:AD.inp,borderRadius:12,padding:"14px 16px"}}>
          <div style={{fontFamily:M,fontSize:8,color:C.td,letterSpacing:"0.1em",marginBottom:9}}>TRIAL DURATION</div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {["1 Day","2 Days","3 Days","7 Days"].map(d=><button key={d} style={{padding:"5px 13px",borderRadius:100,background:d==="2 Days"?C.brand:"transparent",color:d==="2 Days"?"#fff":C.td,border:`1px solid ${d==="2 Days"?C.brand:AD.cardB}`,fontFamily:P,fontSize:11,fontWeight:600,cursor:"pointer",transition:"all 0.15s"}}>{d}</button>)}
          </div>
        </div>
      </ACard>
      <ACard style={{padding:"22px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div><div style={{fontFamily:P,fontSize:14,fontWeight:600,color:C.t1,marginBottom:2}}>First 100 Users — 1 Month Free</div><div style={{fontFamily:P,fontSize:11,color:C.tm}}>Founding member offer</div></div>
          <ATog on={earlyOn} onChange={setEarlyOn}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
          {[{l:"TOTAL SLOTS",v:"100",c:C.brand},{l:"USED",v:"58",c:C.buy},{l:"REMAINING",v:"42",c:C.gold},{l:"STATUS",v:earlyOn?"Active":"Off",c:earlyOn?C.buy:C.sell}].map(s=><div key={s.l} style={{background:AD.inp,borderRadius:10,padding:"11px 13px"}}>
            <div style={{fontFamily:M,fontSize:7.5,color:C.td,letterSpacing:"0.1em",marginBottom:4}}>{s.l}</div>
            <div style={{fontFamily:M,fontSize:16,fontWeight:700,color:s.c}}>{s.v}</div>
          </div>)}
        </div>
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontFamily:P,fontSize:10.5,color:C.tm}}>Slots claimed</span><span style={{fontFamily:M,fontSize:10,color:C.gold}}>58 / 100</span></div>
          <div style={{height:4,borderRadius:100,background:"rgba(255,255,255,0.06)"}}><div style={{width:"58%",height:"100%",borderRadius:100,background:`linear-gradient(90deg,${C.brand},${C.gold})`}}/></div>
        </div>
      </ACard>
    </div>
  </div>;
}

// ─── Users ────────────────────────────────────────────────────────────────────

function AUsers() {
  const [selected,setSelected]=useState<typeof AUSERS[0]|null>(null);
  const [q,setQ]=useState("");
  const [planF,setPlanF]=useState("All");
  const pCol:Record<string,string>={VIP:C.brand,Forex:C.gold,Crypto:"#60A5FA"};
  const sType:Record<string,"ok"|"warn"|"err"|"info">={Active:"ok",Trial:"info",Expired:"warn",Suspended:"err"};
  const filtered=AUSERS.filter(u=>(planF==="All"||u.plan===planF)&&(q===""||u.name.toLowerCase().includes(q.toLowerCase())||u.email.toLowerCase().includes(q.toLowerCase())));
  const COLS="44px 1fr 170px 85px 95px 72px 110px 100px 76px";
  const HEAD=["","NAME","EMAIL","PLAN","STATUS","TRIAL","JOINED","RENEWAL","ACTIONS"];
  return <div style={{padding:"28px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
      <div>
        <h2 style={{fontFamily:P,fontSize:20,fontWeight:700,color:C.t1,margin:"0 0 4px",letterSpacing:"-0.4px"}}>Users</h2>
        <div style={{fontFamily:M,fontSize:9,color:C.td,letterSpacing:"0.12em"}}>{AUSERS.length} REGISTERED MEMBERS</div>
      </div>
      <AGhost icon={<Download size={13}/>}>Export CSV</AGhost>
    </div>
    <div style={{display:"flex",gap:10,marginBottom:18,alignItems:"center"}}>
      <div style={{display:"flex",alignItems:"center",gap:7,background:AD.inp,border:`1px solid ${AD.inpB}`,borderRadius:9,padding:"8px 13px",flex:1,maxWidth:300}}>
        <Search size={13} color={C.td}/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name or email…" style={{background:"none",border:"none",outline:"none",fontFamily:P,fontSize:12,color:C.t1,caretColor:C.brand,width:"100%"}}/>
      </div>
      {["All","VIP","Forex","Crypto"].map(f=><button key={f} onClick={()=>setPlanF(f)} style={{padding:"6px 14px",borderRadius:8,background:planF===f?C.brand:"transparent",color:planF===f?"#fff":C.td,border:`1px solid ${planF===f?C.brand:AD.cardB}`,fontFamily:P,fontSize:11,fontWeight:600,cursor:"pointer",transition:"all 0.15s"}}>{f}</button>)}
      <span style={{marginLeft:"auto",fontFamily:M,fontSize:10,color:C.td}}>{filtered.length} users</span>
    </div>
    <div style={{display:"grid",gridTemplateColumns:selected?"1fr 340px":"1fr",gap:18,alignItems:"start"}}>
      <ACard style={{overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:COLS,padding:"14px 24px",background:AD.nav,position:"sticky",top:0,zIndex:10,borderRadius:"18px 18px 0 0",borderBottom:`1px solid ${AD.cardB}`}}>
          {HEAD.map(h=><span key={h} style={{fontFamily:M,fontSize:8,color:C.td,letterSpacing:"0.12em"}}>{h}</span>)}
        </div>
        {filtered.map((u,i)=><div key={u.id} onClick={()=>setSelected(selected?.id===u.id?null:u)} className="a-row" style={{display:"grid",gridTemplateColumns:COLS,padding:"11px 20px",borderBottom:i<filtered.length-1?`1px solid ${AD.cardB}`:"none",alignItems:"center",cursor:"pointer",background:selected?.id===u.id?"rgba(128,0,255,0.09)":"transparent"}}>
          <div style={{width:30,height:30,borderRadius:9,background:`${pCol[u.plan]||C.brand}1C`,border:`1px solid ${pCol[u.plan]||C.brand}28`,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:P,fontSize:9,fontWeight:700,color:pCol[u.plan]||C.brand}}>{u.init}</span></div>
          <span style={{fontFamily:P,fontSize:12.5,fontWeight:600,color:C.t1}}>{u.name}</span>
          <span style={{fontFamily:P,fontSize:11,color:C.td,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{u.email}</span>
          <span style={{fontFamily:M,fontSize:11,fontWeight:700,color:pCol[u.plan]||C.brand}}>{u.plan}</span>
          <Chip label={u.status} type={sType[u.status]||"muted"}/>
          <span style={{fontFamily:M,fontSize:10.5,color:u.trial?C.buy:C.td}}>{u.trial?"Active":"—"}</span>
          <span style={{fontFamily:M,fontSize:9.5,color:C.td}}>{u.joined}</span>
          <span style={{fontFamily:M,fontSize:9.5,color:C.td}}>{u.renewal}</span>
          <div style={{display:"flex",gap:6}}>
            <button className="a-btn" title="Edit" style={{width:32,height:32,borderRadius:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.15s"}}><Pencil size={13} color={C.t2}/></button>
            <button className="a-btn" title="Delete" style={{width:32,height:32,borderRadius:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.15s"}}><Trash2 size={13} color={C.sell}/></button>
          </div>
        </div>)}
      </ACard>
      {selected&&<ACard style={{padding:"22px 22px",position:"sticky",top:80}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div style={{fontFamily:P,fontSize:13,fontWeight:700,color:C.t1}}>User Details</div>
          <button onClick={()=>setSelected(null)} style={{width:26,height:26,borderRadius:7,background:AD.inp,border:`1px solid ${AD.inpB}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><X size={12} color={C.tm}/></button>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:18}}>
          <div style={{width:56,height:56,borderRadius:17,background:`${pCol[selected.plan]||C.brand}1C`,border:`1px solid ${pCol[selected.plan]||C.brand}30`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}>
            <span style={{fontFamily:P,fontSize:18,fontWeight:700,color:pCol[selected.plan]||C.brand}}>{selected.init}</span>
          </div>
          <div style={{fontFamily:P,fontSize:14,fontWeight:700,color:C.t1,marginBottom:2}}>{selected.name}</div>
          <div style={{fontFamily:P,fontSize:11,color:C.td,marginBottom:8}}>{selected.email}</div>
          <Chip label={`${selected.plan} Plan`} type={selected.plan==="VIP"?"brand":selected.plan==="Forex"?"gold":"info"}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:14}}>
          {[{l:"SIGNALS",v:selected.signals,c:C.brand},{l:"POSTS",v:selected.posts,c:C.gold},{l:"LIKES",v:selected.likes,c:"#C084FC"},{l:"COMMENTS",v:selected.comments,c:C.buy}].map(s=><div key={s.l} style={{background:AD.inp,borderRadius:10,padding:"11px 13px"}}>
            <div style={{fontFamily:M,fontSize:7.5,color:C.td,letterSpacing:"0.1em",marginBottom:4}}>{s.l}</div>
            <div style={{fontFamily:M,fontSize:17,fontWeight:700,color:s.c}}>{s.v}</div>
          </div>)}
        </div>
        <div style={{background:AD.inp,borderRadius:11,padding:"12px 14px",marginBottom:14}}>
          {[{l:"Joined",v:selected.joined},{l:"Renewal",v:selected.renewal}].map(r=><div key={r.l} style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
            <span style={{fontFamily:P,fontSize:11,color:C.tm}}>{r.l}</span>
            <span style={{fontFamily:M,fontSize:11,color:C.t2}}>{r.v}</span>
          </div>)}
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:P,fontSize:11,color:C.tm}}>Status</span><Chip label={selected.status} type={sType[selected.status]||"muted"}/></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          <APrimary size="sm" icon={<Crown size={12}/>}>Upgrade Plan</APrimary>
          <AGhost size="sm" icon={<Calendar size={12}/>}>Extend Trial</AGhost>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
            <AGhost size="sm" danger icon={<Shield size={12}/>}>Suspend</AGhost>
            <AGhost size="sm" danger icon={<Trash2 size={12}/>}>Delete</AGhost>
          </div>
        </div>
      </ACard>}
    </div>
  </div>;
}

// ─── Coupons ──────────────────────────────────────────────────────────────────

function ACoupons() {
  const [modal,setModal]=useState(false);
  const [form,setForm]=useState({code:"",discount:"",expiry:"",limit:""});
  const COLS="130px 90px 150px 80px 120px 100px 76px";
  const HEAD=["CODE","DISCOUNT","EXPIRY","LIMIT","USAGE","STATUS","ACTIONS"];
  const campaigns=[
    {name:"Seasonal Campaign",desc:"Summer 2026",      emoji:"☀️",disc:"30% OFF",active:true},
    {name:"VIP Loyalty",       desc:"Reward for VIPs", emoji:"👑",disc:"25% OFF",active:false},
    {name:"Referral Program",  desc:"Refer & earn",    emoji:"🔗",disc:"15% OFF",active:true},
    {name:"Flash Sale",        desc:"48-hour offer",   emoji:"⚡",disc:"50% OFF",active:false},
  ];
  return <div style={{padding:"28px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
      <div>
        <h2 style={{fontFamily:P,fontSize:20,fontWeight:700,color:C.t1,margin:"0 0 4px",letterSpacing:"-0.4px"}}>Coupons & Promotions</h2>
        <div style={{fontFamily:M,fontSize:9,color:C.td,letterSpacing:"0.12em"}}>{ACOUPONS.length} CODES · 3 ACTIVE</div>
      </div>
      <APrimary onClick={()=>setModal(true)} icon={<Plus size={14}/>}>Create Coupon</APrimary>
    </div>
    <div style={{fontFamily:M,fontSize:8.5,color:C.td,letterSpacing:"0.14em",marginBottom:13}}>COUPON CODES</div>
    <ACard style={{marginBottom:26}}>
      <div style={{display:"grid",gridTemplateColumns:COLS,padding:"14px 24px",background:AD.nav,position:"sticky",top:0,zIndex:10,borderRadius:"18px 18px 0 0",borderBottom:`1px solid ${AD.cardB}`}}>
        {HEAD.map(h=><span key={h} style={{fontFamily:M,fontSize:8,color:C.td,letterSpacing:"0.12em"}}>{h}</span>)}
      </div>
      {ACOUPONS.map((cp,i)=><div key={cp.code} className="a-row" style={{display:"grid",gridTemplateColumns:COLS,padding:"16px 24px",borderBottom:i<ACOUPONS.length-1?`1px solid ${AD.cardB}`:"none",alignItems:"center"}}>
        <span style={{fontFamily:M,fontSize:12.5,fontWeight:700,color:C.brand,letterSpacing:"0.05em"}}>{cp.code}</span>
        <span style={{fontFamily:M,fontSize:12.5,fontWeight:700,color:C.gold}}>{cp.discount}</span>
        <span style={{fontFamily:M,fontSize:10,color:C.td}}>{cp.expiry}</span>
        <span style={{fontFamily:M,fontSize:12,color:C.t2}}>{cp.limit}</span>
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontFamily:M,fontSize:10,color:C.t2}}>{cp.used} / {cp.limit}</span><span style={{fontFamily:M,fontSize:9,color:C.td}}>{Math.round((cp.used/cp.limit)*100)}%</span></div>
          <div style={{height:3,borderRadius:100,background:"rgba(255,255,255,0.06)"}}><div style={{width:`${(cp.used/cp.limit)*100}%`,height:"100%",borderRadius:100,background:C.brand}}/></div>
        </div>
        <Chip label={cp.status} type={cp.status==="Active"?"ok":cp.status==="Exhausted"?"warn":"muted"}/>
        <div style={{display:"flex",gap:6}}>
          <button className="a-btn" title="Edit" style={{width:32,height:32,borderRadius:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.15s"}}><Pencil size={13} color={C.t2}/></button>
          <button className="a-btn" title="Delete" style={{width:32,height:32,borderRadius:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.15s"}}><Trash2 size={13} color={C.sell}/></button>
        </div>
      </div>)}
    </ACard>
    <div style={{fontFamily:M,fontSize:8.5,color:C.td,letterSpacing:"0.14em",marginBottom:13}}>PROMOTIONS</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:13}}>
      {campaigns.map(camp=><ACard key={camp.name} style={{padding:"18px 20px",border:camp.active?`1px solid rgba(128,0,255,0.2)`:`1px solid ${AD.cardB}`}} hover>
        <div style={{fontSize:26,marginBottom:9}}>{camp.emoji}</div>
        <div style={{fontFamily:P,fontSize:13,fontWeight:700,color:C.t1,marginBottom:2}}>{camp.name}</div>
        <div style={{fontFamily:P,fontSize:11,color:C.tm,marginBottom:10}}>{camp.desc}</div>
        <div style={{fontFamily:M,fontSize:17,fontWeight:700,color:camp.active?C.brand:C.td,marginBottom:12}}>{camp.disc}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <Chip label={camp.active?"Active":"Inactive"} type={camp.active?"ok":"muted"}/>
          <button style={{fontFamily:P,fontSize:10,color:C.td,background:"none",border:"none",cursor:"pointer",padding:0}}>Edit →</button>
        </div>
      </ACard>)}
    </div>
    {modal&&<AModal title="Create Coupon" sub="Define the discount code, amount, and expiry" onClose={()=>setModal(false)} width={460}>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <AIn label="Coupon Code" placeholder="e.g. SUMMER50" value={form.code} onChange={v=>setForm({...form,code:v.toUpperCase()})}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <AIn label="Discount %" placeholder="e.g. 30" value={form.discount} onChange={v=>setForm({...form,discount:v})} type="number"/>
          <AIn label="Usage Limit" placeholder="e.g. 100" value={form.limit} onChange={v=>setForm({...form,limit:v})} type="number"/>
        </div>
        <AIn label="Expiry Date" value={form.expiry} onChange={v=>setForm({...form,expiry:v})} type="date"/>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end",paddingTop:4}}>
          <AGhost onClick={()=>setModal(false)}>Cancel</AGhost>
          <APrimary icon={<Tag size={13}/>} onClick={()=>setModal(false)}>Create Coupon</APrimary>
        </div>
      </div>
    </AModal>}
  </div>;
}

// ─── Settings ─────────────────────────────────────────────────────────────────

function ASettings() {
  const [email,setEmail]=useState("support@elitetrading.io");
  const [name,setName]=useState("Elite Trading");
  const [saved,setSaved]=useState(false);
  return <div style={{padding:"28px 32px"}}>
    <div style={{marginBottom:24}}>
      <h2 style={{fontFamily:P,fontSize:20,fontWeight:700,color:C.t1,margin:"0 0 4px",letterSpacing:"-0.4px"}}>Settings</h2>
      <div style={{fontFamily:M,fontSize:9,color:C.td,letterSpacing:"0.12em"}}>GENERAL · LEGAL · SYSTEM</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:22,alignItems:"start"}}>
      <div style={{display:"flex",flexDirection:"column",gap:18}}>
        <ACard style={{padding:"22px 24px"}}>
          <div style={{fontFamily:P,fontSize:14,fontWeight:700,color:C.t1,marginBottom:16}}>General</div>
          <div style={{display:"flex",flexDirection:"column",gap:13}}>
            <AIn label="Platform Name" value={name} onChange={setName}/>
            <AIn label="Support Email" value={email} onChange={setEmail} type="email"/>
          </div>
          {saved&&<div style={{marginTop:13,background:"rgba(0,208,132,0.07)",border:"1px solid rgba(0,208,132,0.2)",borderRadius:9,padding:"8px 13px",fontFamily:P,fontSize:11.5,color:C.buy}}>✓ Settings saved</div>}
          <div style={{marginTop:14}}><APrimary onClick={()=>{ setSaved(true); setTimeout(()=>setSaved(false),2500); }} icon={<Check size={13}/>}>Save Changes</APrimary></div>
        </ACard>
        <ACard style={{padding:"22px 24px"}}>
          <div style={{fontFamily:P,fontSize:14,fontWeight:700,color:C.t1,marginBottom:3}}>Admin Profile</div>
          <div style={{fontFamily:P,fontSize:11,color:C.tm,marginBottom:14}}>Update your admin account credentials.</div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <AIn label="Full Name" value="Administrator" onChange={()=>{}}/>
            <AIn label="Admin Email" value="admin@elite.io" onChange={()=>{}} type="email"/>
            <AIn label="New Password" placeholder="Leave blank to keep current" value="" onChange={()=>{}} type="password"/>
          </div>
          <div style={{marginTop:14}}><AGhost>Update Profile</AGhost></div>
        </ACard>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:18}}>
        <ACard style={{padding:"22px 24px"}}>
          <div style={{fontFamily:P,fontSize:14,fontWeight:700,color:C.t1,marginBottom:14}}>Legal Documents</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {[{l:"Privacy Policy",d:"Last updated Jul 1, 2026"},{l:"Terms & Conditions",d:"Last updated Jul 1, 2026"},{l:"Refund Policy",d:"Last updated Jun 15, 2026"}].map(doc=><div key={doc.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:AD.inp,borderRadius:10,padding:"12px 14px"}}>
              <div><div style={{fontFamily:P,fontSize:12.5,fontWeight:500,color:C.t1}}>{doc.l}</div><div style={{fontFamily:P,fontSize:10,color:C.td,marginTop:2}}>{doc.d}</div></div>
              <button style={{fontFamily:P,fontSize:10,color:C.brand,background:"none",border:"none",cursor:"pointer",fontWeight:600}}>Edit →</button>
            </div>)}
          </div>
        </ACard>
        <ACard style={{padding:"22px 24px"}}>
          <div style={{fontFamily:P,fontSize:14,fontWeight:700,color:C.t1,marginBottom:14}}>System</div>
          <div style={{display:"flex",flexDirection:"column"}}>
            {[{l:"Version",v:"1.0.0"},{l:"Environment",v:"Production"},{l:"Last Deploy",v:"Jul 22, 2026"},{l:"API Status",v:"Operational"}].map((s,i,arr)=><div key={s.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<arr.length-1?`1px solid ${AD.cardB}`:"none"}}>
              <span style={{fontFamily:P,fontSize:12,color:C.tm}}>{s.l}</span>
              <span style={{fontFamily:M,fontSize:11,color:s.v==="Operational"?C.buy:C.t2,fontWeight:600}}>{s.v}</span>
            </div>)}
          </div>
        </ACard>
        <ACard style={{padding:"22px 24px",border:"1px solid rgba(255,90,107,0.14)"}}>
          <div style={{fontFamily:P,fontSize:14,fontWeight:600,color:C.sell,marginBottom:3}}>Danger Zone</div>
          <div style={{fontFamily:P,fontSize:11,color:C.tm,marginBottom:14}}>These actions cannot be undone.</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <AGhost danger size="sm" icon={<AlertCircle size={12}/>}>Clear All Draft Signals</AGhost>
            <AGhost danger size="sm" icon={<Trash2 size={12}/>}>Purge Expired Users</AGhost>
          </div>
        </ACard>
      </div>
    </div>
  </div>;
}

// ─── Admin Root ───────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [section,setSection]=useState<AdminSection>("dashboard");
  return <div style={{display:"flex",height:"100vh",background:AD.bg,color:C.t1,fontFamily:P,overflow:"hidden"}}>
    <style>{`
      .a-nav-item:hover{background:rgba(255,255,255,0.04)!important;color:rgba(255,255,255,0.85)!important;}
      .a-row:hover{background:rgba(128,0,255,0.07)!important;}
      .a-btn{transition:all 0.15s ease!important;}
      .a-btn:hover{filter:brightness(1.1);transform:translateY(-1px);}
      .a-btn:active{transform:translateY(0)!important;}
      .a-input:focus{border-color:rgba(128,0,255,0.55)!important;box-shadow:0 0 0 3px rgba(128,0,255,0.1)!important;}
      .a-card-hov:hover{border-color:rgba(128,0,255,0.2)!important;}
      .a-tscroll::-webkit-scrollbar{height:4px;}
      .a-tscroll::-webkit-scrollbar-thumb{background:rgba(128,0,255,0.3);border-radius:10px;}
      .a-main::-webkit-scrollbar{width:4px;}
      .a-main::-webkit-scrollbar-thumb{background:rgba(128,0,255,0.25);border-radius:10px;}
      @keyframes aSlide{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
      .a-section{animation:aSlide 0.22s ease forwards;}
    `}</style>
    <AdminNav section={section} onChange={setSection}/>
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <AdminTopBar section={section}/>
      <div className="a-main a-section" style={{flex:1,overflowY:"auto"}} key={section}>
        {section==="dashboard"     && <ADashboard/>}
        {section==="signals"       && <ASignals/>}
        {section==="posts"         && <APosts/>}
        {section==="notifications" && <ANotifications/>}
        {section==="subscriptions" && <ASubscriptions/>}
        {section==="users"         && <AUsers/>}
        {section==="coupons"       && <ACoupons/>}
        {section==="settings"      && <ASettings/>}
      </div>
    </div>
  </div>;
}

