
const $=s=>document.querySelector(s),esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])),val=i=>$("#"+i).value.trim();
const ST="AL:Alabama:9,AK:Alaska:3,AZ:Arizona:11,AR:Arkansas:6,CA:California:54,CO:Colorado:10,CT:Connecticut:7,DE:Delaware:3,DC:District of Columbia:3,FL:Florida:30,GA:Georgia:16,HI:Hawaii:4,ID:Idaho:4,IL:Illinois:19,IN:Indiana:11,IA:Iowa:6,KS:Kansas:6,KY:Kentucky:8,LA:Louisiana:8,ME:Maine:4,MD:Maryland:10,MA:Massachusetts:11,MI:Michigan:15,MN:Minnesota:10,MS:Mississippi:6,MO:Missouri:10,MT:Montana:4,NE:Nebraska:5,NV:Nevada:6,NH:New Hampshire:4,NJ:New Jersey:14,NM:New Mexico:5,NY:New York:28,NC:North Carolina:16,ND:North Dakota:3,OH:Ohio:17,OK:Oklahoma:7,OR:Oregon:8,PA:Pennsylvania:19,RI:Rhode Island:4,SC:South Carolina:9,SD:South Dakota:3,TN:Tennessee:11,TX:Texas:40,UT:Utah:6,VT:Vermont:3,VA:Virginia:13,WA:Washington:12,WV:West Virginia:4,WI:Wisconsin:10,WY:Wyoming:3".split(",").map(x=>{const[a,n,e]=x.split(":");return{a,n,ev:+e}});
const OFF={"President":35,"US Senate":30,"US House":25,"Governor":18,"State Legislature":18,"Mayor":18,"Ballot Measure":18};
const KEY="uses_v1";let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
S=S||{voters:[],parties:[["DEM","Democratic"],["REP","Republican"],["LIB","Libertarian"],["GRN","Green"],["IND","Independent"]].map(([ab,name])=>({ab,name})),cands:[],elecs:[],audit:[],laws:[
 ["US","Voting age 18","All","26th Amendment","Minimum voting age"],["US","Presidential electors","President","Art. II, Sec. 1; 12th Amendment","Electoral College; 270 of 538 electoral votes"],["US","Presidential age/term","President","Art. II; 22nd Amendment","Age 35 minimum; two-term limit"],["US","Senate qualifications","US Senate","Art. I, Sec. 3","Age 30 minimum"],["US","House qualifications","US House","Art. I, Sec. 2","Age 25 minimum"]].map(([j,n,t,s,d])=>({j,n,t,s,d,url:"https://constitution.congress.gov/",ver:"",st:"UNVERIFIED"})),seq:1};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const log=m=>{S.audit.unshift({t:new Date().toISOString(),m});S.audit.length=Math.min(S.audit.length,500);save()};
const nid=p=>p+String(S.seq++).padStart(6,"0"),nr=()=>Math.random()+Math.random()+Math.random()-1.5,pick=a=>a[Math.floor(Math.random()*a.length)];
const age=(d,on)=>{const a=new Date(d),o=new Date(on);let n=o.getFullYear()-a.getFullYear();if(o<new Date(o.getFullYear(),a.getMonth(),a.getDate()))n--;return n};
const today=()=>new Date().toISOString().slice(0,10),sname=a=>ST.find(s=>s.a===a)?.n||a;
function elig(v,e){const r=[],on=e?.date||today();if(age(v.dob,on)<18)r.push("Under 18");if(!v.citizen)r.push("Not a U.S. citizen");if(e&&e.regDl&&v.reg>e.regDl)r.push("Registered after deadline");if(v.status!=="Active")r.push("Status: "+v.status);
 if(e&&e.office!=="President"&&v.state!==e.state)r.push("Outside jurisdiction");if(e&&e.type==="Primary"&&e.pmode==="closed"&&v.party!==e.party)r.push("Closed primary: party mismatch");return r}
const dup=v=>S.voters.find(x=>x.first.toLowerCase()===v.first.toLowerCase()&&x.last.toLowerCase()===v.last.toLowerCase()&&x.dob===v.dob);
const PL={DEM:-.6,REP:.6,LIB:.2,GRN:-.8,IND:0};
let tab_="dash",vp=0,vq="",vf="",cur=null,lvl="State",pend=null;
const TABS=[["dash","Dashboard"],["elec","Elections"],["voters","Voter Index"],["cand","Candidates & Parties"],["laws","Election Laws"],["fin","Campaign Finance"],["audit","Audit Log"],["set","Settings"]];
function go(t){tab_=t;cur=t==="elec"?cur:null;render()}
function render(){$("#nav").innerHTML="<h1>USES</h1>"+TABS.map(([k,n])=>`<button class="${k===tab_?"on":""}" onclick="go('${k}')">${n}</button>`).join("");$("#v").innerHTML=({dash,elec,voters,cand,laws,fin,audit,set})[tab_]();}
const opts=(a,sel)=>a.map(x=>`<option value="${esc(x[0])}"${x[0]===sel?" selected":""}>${esc(x[1])}</option>`).join("");
const sOpts=()=>opts(ST.map(s=>[s.a,s.n]));const pOpts=()=>opts(S.parties.map(p=>[p.ab,p.name]));
function dash(){const a=S.elecs.filter(e=>e.status!=="Certified");return`<h2>Dashboard</h2><div class="g"><div class="card"><div class="k">${S.voters.length}</div>Registered voters</div><div class="card"><div class="k">${S.voters.filter(v=>v.status==="Active").length}</div>Active</div><div class="card"><div class="k">${S.cands.filter(c=>c.st==="Filed").length}</div>Active candidates</div><div class="card"><div class="k">${S.parties.length}</div>Parties</div><div class="card"><div class="k">${S.elecs.filter(e=>e.status==="Counted").length}</div>Awaiting certification</div></div>
<div class="card"><b>Elections in progress</b>${a.map(e=>`<div>${esc(e.name)} <span class="mu">${e.status}</span></div>`).join("")||'<div class="mu">None yet. Create one under Elections.</div>'}</div>
<div class="card"><b>Recent activity</b>${S.audit.slice(0,6).map(x=>`<div class="mu">${x.t.slice(0,19)} ${esc(x.m)}</div>`).join("")||'<div class="mu">No activity.</div>'}</div>`}
