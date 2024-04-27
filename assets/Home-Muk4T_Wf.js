function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/ProductsSlider-BfnwPSYN.js","assets/index-D0o6K77s.js","assets/index-B3EqNP97.css","assets/index-DKDMt5eB.js","assets/Container-D_Xmfi4_.js","assets/styled-Bwh3k3WL.js","assets/LatestProducts-CZEl9ViC.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as t,_ as $,u as N,a as L,j as e,B as r,T as n,G as M,b as U,C as R,L as V,F as i}from"./index-D0o6K77s.js";import{a as o,U as l}from"./PortConfig-CL2sLOPV.js";import{C as Y}from"./Container-D_Xmfi4_.js";import"./styled-Bwh3k3WL.js";const K=t.lazy(()=>$(()=>import("./ProductsSlider-BfnwPSYN.js"),__vite__mapDeps([0,1,2,3,4,5]))),m=t.lazy(()=>$(()=>import("./LatestProducts-CZEl9ViC.js"),__vite__mapDeps([6,1,2,4,5]))),c=4,b=!0,J="rent",X="sell",Z=`limit=${c}&offer=${b}`,ee=`limit=${c}&type=${J}`,se=`limit=${c}&type=${X}`,te=`limit=${c}&offer=${b}&furnished=true&parking=true`,oe=()=>{const h=N(),a=L(h.breakpoints.up("md")),d=L(h.breakpoints.down("sm")),[k,w]=t.useState([]),[E,O]=t.useState([]),[_,v]=t.useState([]),[T,A]=t.useState([]),[P,f]=t.useState(null),[I,u]=t.useState(null),[z,p]=t.useState(null),[F,g]=t.useState(null),[B,x]=t.useState(!1),[C,y]=t.useState(!1),[Q,S]=t.useState(!1),[W,j]=t.useState(!1),G=async()=>{try{x(!0);const s=await o.get(`${l}api/listing/get?${te}`);if(s.data.success==!1){f(s.data.message);return}w(s.data.listings),f(null),q()}catch(s){f(s.message)}finally{x(!1)}},q=async()=>{try{y(!0);const s=await o.get(`${l}api/listing/get?${Z}`);if(s.data.success==!1){u(s.data.message);return}O(s.data.listings),u(null),D()}catch(s){u(s.message)}finally{y(!1)}},D=async()=>{try{S(!0);const s=await o.get(`${l}api/listing/get?${ee}`,{headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}});if(s.data.success==!1){p(s.data.message);return}v(s.data.listings),p(null),H()}catch(s){p(s.message)}finally{S(!1)}},H=async()=>{try{j(!0);const s=await o.get(`${l}api/listing/get?${se}`,{headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}});if(s.data.success==!1){g(s.data.message);return}A(s.data.listings),g(null)}catch(s){g(s.message)}finally{j(!1)}};return t.useEffect(()=>{G()},[]),e.jsxs(e.Fragment,{children:[e.jsx(Y,{maxWidth:"lg",sx:{paddingTop:10,display:"flex",alignItems:"center"},children:e.jsxs(r,{sx:{display:"flex",flexDirection:"column",ml:{xs:0,md:5}},children:[e.jsx(r,{children:e.jsxs(n,{variant:a?"h2":d?"h5":"h3",color:M,component:"div",sx:{maxWidth:a?600:d?200:400,wordWrap:"break-word"},children:["Find your next"," ",e.jsx(n,{variant:a?"h2":d?"h5":"h3",component:"span",color:U,children:"perfect"})," ","place with ease"]})}),e.jsx(r,{children:e.jsx(n,{color:R,variant:a?"body1":"caption",component:"div",sx:{wordWrap:"break-word",mt:1.5},children:"Hasanzadeh Estate will help you to find your home fast,easy and comfortable."})}),e.jsx(r,{children:e.jsx(n,{color:R,variant:a?"body1":"caption",component:"div",sx:{wordWrap:"break-word"},children:"Our expert support are always available."})}),e.jsx(r,{sx:{mt:1},children:e.jsx(V,{style:{fontSize:"1.5em"},className:"Link",to:"/search",children:"Let's Start Now..."})})]})}),e.jsx(t.Suspense,{fallback:e.jsx(i,{}),children:e.jsx(K,{loading:B,error:P,listings:k})}),e.jsx(t.Suspense,{fallback:e.jsx(i,{}),children:e.jsx(m,{query:"offer",title:"Recent Offers",loading:C,error:I,listings:E})}),e.jsx(t.Suspense,{fallback:e.jsx(i,{}),children:e.jsx(m,{query:"rent",title:"Recent Places For Rent",loading:Q,error:z,listings:_})}),e.jsx(t.Suspense,{fallback:e.jsx(i,{}),children:e.jsx(m,{query:"sell",title:"Recent Places For Sale",loading:W,error:F,listings:T})})]})};export{oe as default};