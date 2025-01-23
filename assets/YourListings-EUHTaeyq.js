function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/UserListings-fEEVAHkN.js","assets/index-BqzxYTW2.js","assets/index-DDnostVl.css","assets/Zoom-BmAGhfZP.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r,_ as t,j as s,F as a}from"./index-BqzxYTW2.js";import{C as i}from"./Container-BLvXd5GS.js";import"./styled-B4FQNqCM.js";const o=r.lazy(()=>t(()=>import("./UserListings-fEEVAHkN.js"),__vite__mapDeps([0,1,2,3]))),x=()=>s.jsx(i,{maxWidth:"lg",children:s.jsx(r.Suspense,{fallback:s.jsx(a,{}),children:s.jsx(o,{})})});export{x as default};
