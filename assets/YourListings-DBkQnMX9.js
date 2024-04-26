function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/UserListings-C4R7osd6.js","assets/index-BbebhGmp.js","assets/index-B3EqNP97.css","assets/PortConfig-CL2sLOPV.js","assets/Zoom-Boq63LpS.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as t,_ as r,j as s,f as i}from"./index-BbebhGmp.js";import{C as o}from"./Container-tt-MgDLE.js";import"./styled-BFH38KDP.js";const a=t.lazy(()=>r(()=>import("./UserListings-C4R7osd6.js"),__vite__mapDeps([0,1,2,3,4]))),p=()=>s.jsx(o,{maxWidth:"lg",sx:{position:"relative",top:50},children:s.jsx(t.Suspense,{fallback:s.jsx(i,{}),children:s.jsx(a,{})})});export{p as default};
