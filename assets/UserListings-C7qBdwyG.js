function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/EmptyListings-DTpfuZbE.js","assets/index-Dq8bkDyD.js","assets/index-B3EqNP97.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r,j as e,_ as k,e as D,d as T,B as i,F as $,V as A,T as E,L as R,h as g,D as S,E as v,H as I,J as B,K as U,i as l}from"./index-Dq8bkDyD.js";import{a as p,U as m}from"./PortConfig-CL2sLOPV.js";import{Z as G}from"./Zoom-CI3qSSEj.js";const W=r.forwardRef(function(n,d){return e.jsx(G,{ref:d,...n})}),z=r.lazy(()=>k(()=>import("./EmptyListings-DTpfuZbE.js"),__vite__mapDeps([0,1,2]))),c=3e3,N=()=>{const x=D(s=>s.persistData.user.userInfo),[n,d]=r.useState([]),[o,f]=r.useState({}),j=T(),[y,u]=r.useState(!1),h=()=>{u(!1)},C=async()=>{var s;try{const t=await p.get(`${m}api/listing/${x.id}`,{headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}});if(t.data.succeess===!1){console.log(t.data.message),l.error((s=t==null?void 0:t.data)==null?void 0:s.message,{autoClose:c});return}d(t.data)}catch(t){l.error(t.message,{autoClose:c})}},L=async s=>{var t;try{const a=await p.delete(`${m}api/listing/${s}`,{headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}});if(a.data.success==!1){console.log(a.data.message),l.error((t=a==null?void 0:a.data)==null?void 0:t.message,{autoClose:c});return}l.error("Listing Deleted",{autoClose:c}),d(b=>[...b.filter(_=>_._id!==s)])}catch(a){console.log(a.message),l.error(a.message,{autoClose:c})}},w=s=>{j(`/listing/update/${s}`)};return r.useEffect(()=>{C()},[]),e.jsxs(i,{children:[e.jsxs("h2",{style:{color:"green",textAlign:"center"},children:["Your Listings(",n.length,")"]}),e.jsx(i,{sx:{display:"flex",justifyContent:"space-around",flexWrap:"wrap",rowGap:3},children:n.length==0?e.jsx(r.Suspense,{fallback:e.jsx($,{}),children:e.jsx(z,{})}):n.length>0&&n.map((s,t)=>e.jsxs(i,{sx:{maxWidth:400,width:400,heigth:400,display:"flex",flexDirection:{xs:"column",sm:"row"},justifyContent:"space-between",alignItems:"center",padding:2,backgroundColor:A,borderRadius:3,gap:1.5,flexWrap:{xs:"wrap",sm:"nowrap"}},children:[e.jsxs(i,{sx:{width:250,height:250},children:[e.jsx(E,{variant:"body1",mb:1,children:s.name}),e.jsx(R,{style:{padding:0,margin:0},to:`/listing/${s._id}`,children:e.jsx("img",{className:"cardImage",srcSet:s.imageURLs[0],alt:s.name,width:"250px",height:"200px",style:{objectPosition:"center",objectFit:"fill",borderRadius:"5px"}})})]}),e.jsxs(i,{sx:{display:"flex",flexDirection:{xs:"row",sm:"column"},columnGap:{xs:2,sm:0},rowGap:{xs:0,sm:2},mt:1},children:[e.jsx(g,{onClick:()=>{u(!0),f({id:s._id,name:s.name})},color:"error",type:"button",variant:"contained",children:"Delete"}),e.jsx(g,{onClick:()=>{w(s._id)},color:"primary",type:"button",variant:"contained",children:"Edit"})]})]},t))}),e.jsxs(S,{open:y,TransitionComponent:W,keepMounted:!0,onClose:h,children:[e.jsx(v,{children:"Warning"}),e.jsx(I,{children:e.jsx(B,{children:`Are you sure to delete listing (${o==null?void 0:o.name})?`})}),e.jsxs(U,{children:[e.jsx(g,{onClick:h,children:"Disagree"}),e.jsx(g,{onClick:()=>{L(o==null?void 0:o.id),u(!1)},children:"Agree"})]})]})]})};export{N as default};
