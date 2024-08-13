function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/UserListings-2CQOdpix.js","assets/index-BSzDctV0.js","assets/index-DDnostVl.css","assets/Zoom-DJao1rEa.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r,_ as t,j as s,F as a}from"./index-BSzDctV0.js";import{C as i}from"./Container-DqNJLyj9.js";import"./styled-DY2EzqoV.js";const o=r.lazy(()=>t(()=>import("./UserListings-2CQOdpix.js"),__vite__mapDeps([0,1,2,3]))),x=()=>s.jsx(i,{maxWidth:"lg",children:s.jsx(r.Suspense,{fallback:s.jsx(a,{}),children:s.jsx(o,{})})});export{x as default};
