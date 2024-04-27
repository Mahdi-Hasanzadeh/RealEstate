function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/UserListings-CaGj1XJB.js","assets/index-CI2nLLvd.js","assets/index-B3EqNP97.css","assets/PortConfig-CL2sLOPV.js","assets/Zoom-v3fCkHqf.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as t,_ as r,j as s,F as i}from"./index-CI2nLLvd.js";import{C as o}from"./Container-Dau7Hifd.js";import"./styled-CKtFAudq.js";const a=t.lazy(()=>r(()=>import("./UserListings-CaGj1XJB.js"),__vite__mapDeps([0,1,2,3,4]))),p=()=>s.jsx(o,{maxWidth:"lg",sx:{position:"relative",top:50},children:s.jsx(t.Suspense,{fallback:s.jsx(i,{}),children:s.jsx(a,{})})});export{p as default};
