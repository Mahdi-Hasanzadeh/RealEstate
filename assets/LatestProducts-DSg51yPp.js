function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/Card-CsTsOkI5.js","assets/index-CtvXfw5C.js","assets/index-B3EqNP97.css","assets/Zoom-BIgm4zra.js","assets/formatDistanceToNow-aDLjEcHe.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as n,_ as x,j as a,T as d,b as h,L as i,B as m,F as j}from"./index-CtvXfw5C.js";import{C as f}from"./Container-BFr0vmhC.js";import"./styled-Bkk5L4Rp.js";const u=n.lazy(()=>x(()=>import("./Card-CsTsOkI5.js"),__vite__mapDeps([0,1,2,3,4]))),b=({title:t,loading:l,error:r,listings:e,query:s})=>{const o=s=="offer"?"offer=true":s=="rent"?"type=rent":s=="sell"?"type=sell":null;return a.jsx(a.Fragment,{children:a.jsxs(f,{maxWidth:"lg",sx:{py:2},children:[a.jsx(d,{variant:"h5",color:h,children:t}),a.jsx(i,{className:"Link",to:`/search?${o}`,children:t}),a.jsx(m,{sx:{display:"flex",justifyContent:"space-between",flexWrap:"wrap",rowGap:3,columnGap:1,mt:2,mb:2},children:l?a.jsx("h3",{children:"Loading..."}):r?a.jsx("h2",{children:r}):(e==null?void 0:e.length)>0&&r==null&&e.map((c,p)=>a.jsx(n.Suspense,{fallback:a.jsx(j,{}),children:a.jsx(u,{listing:c})},p))})]})})};export{b as default};
