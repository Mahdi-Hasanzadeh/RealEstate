function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/UserListings-BxVhjOzo.js","assets/index-Cb8TbFW9.js","assets/index-B3EqNP97.css","assets/Zoom-DUT-4FZ9.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as t,_ as r,j as s,F as i}from"./index-Cb8TbFW9.js";import{C as o}from"./Container-BeEU9-ET.js";import"./styled-CakSrLZw.js";const a=t.lazy(()=>r(()=>import("./UserListings-BxVhjOzo.js"),__vite__mapDeps([0,1,2,3]))),p=()=>s.jsx(o,{maxWidth:"lg",sx:{position:"relative",top:50},children:s.jsx(t.Suspense,{fallback:s.jsx(i,{}),children:s.jsx(a,{})})});export{p as default};
