function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/UserListings-CMxJaX18.js","assets/index-CtvXfw5C.js","assets/index-B3EqNP97.css","assets/Zoom-BIgm4zra.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as t,_ as r,j as s,F as i}from"./index-CtvXfw5C.js";import{C as o}from"./Container-BFr0vmhC.js";import"./styled-Bkk5L4Rp.js";const a=t.lazy(()=>r(()=>import("./UserListings-CMxJaX18.js"),__vite__mapDeps([0,1,2,3]))),p=()=>s.jsx(o,{maxWidth:"lg",sx:{position:"relative",top:50},children:s.jsx(t.Suspense,{fallback:s.jsx(i,{}),children:s.jsx(a,{})})});export{p as default};
