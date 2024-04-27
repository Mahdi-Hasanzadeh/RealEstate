function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/UserListings-CoBjunfY.js","assets/index-D0o6K77s.js","assets/index-B3EqNP97.css","assets/PortConfig-CL2sLOPV.js","assets/Zoom-BKMXAOtd.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as t,_ as r,j as s,F as i}from"./index-D0o6K77s.js";import{C as o}from"./Container-D_Xmfi4_.js";import"./styled-Bwh3k3WL.js";const a=t.lazy(()=>r(()=>import("./UserListings-CoBjunfY.js"),__vite__mapDeps([0,1,2,3,4]))),p=()=>s.jsx(o,{maxWidth:"lg",sx:{position:"relative",top:50},children:s.jsx(t.Suspense,{fallback:s.jsx(i,{}),children:s.jsx(a,{})})});export{p as default};
