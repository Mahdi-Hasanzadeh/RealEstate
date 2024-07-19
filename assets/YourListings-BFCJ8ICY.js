function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/UserListings-CH09ofmC.js","assets/index-BF8H7DTL.js","assets/index-DDnostVl.css","assets/Zoom-Be3LOdrk.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r,_ as t,j as s,F as a}from"./index-BF8H7DTL.js";import{C as i}from"./Container-Dmjk8-GI.js";import"./styled-s5EO9tRq.js";const o=r.lazy(()=>t(()=>import("./UserListings-CH09ofmC.js"),__vite__mapDeps([0,1,2,3]))),x=()=>s.jsx(i,{maxWidth:"lg",children:s.jsx(r.Suspense,{fallback:s.jsx(a,{}),children:s.jsx(o,{})})});export{x as default};
