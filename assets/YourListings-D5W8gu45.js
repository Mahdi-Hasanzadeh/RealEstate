function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/UserListings-BoTY_Wjs.js","assets/index-D5iIMIKd.js","assets/index-B3EqNP97.css","assets/PortConfig-CL2sLOPV.js","assets/Zoom-Cv-dUA3Y.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as t,_ as r,j as s,f as i}from"./index-D5iIMIKd.js";import{C as o}from"./Container-Dz_Ctelb.js";import"./styled-p7CeRDTF.js";const a=t.lazy(()=>r(()=>import("./UserListings-BoTY_Wjs.js"),__vite__mapDeps([0,1,2,3,4]))),p=()=>s.jsx(o,{maxWidth:"lg",sx:{position:"relative",top:50},children:s.jsx(t.Suspense,{fallback:s.jsx(i,{}),children:s.jsx(a,{})})});export{p as default};
