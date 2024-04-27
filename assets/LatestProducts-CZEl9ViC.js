function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/Card-DiQfIgzJ.js","assets/index-D0o6K77s.js","assets/index-B3EqNP97.css","assets/Zoom-BKMXAOtd.js","assets/formatDistanceToNow-aDLjEcHe.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as n,_ as x,j as a,T as d,b as h,L as i,B as m,F as j}from"./index-D0o6K77s.js";import{C as f}from"./Container-D_Xmfi4_.js";import"./styled-Bwh3k3WL.js";const u=n.lazy(()=>x(()=>import("./Card-DiQfIgzJ.js"),__vite__mapDeps([0,1,2,3,4]))),b=({title:t,loading:l,error:r,listings:e,query:s})=>{const o=s=="offer"?"offer=true":s=="rent"?"type=rent":s=="sell"?"type=sell":null;return a.jsx(a.Fragment,{children:a.jsxs(f,{maxWidth:"lg",sx:{py:2},children:[a.jsx(d,{variant:"h5",color:h,children:t}),a.jsx(i,{className:"Link",to:`/search?${o}`,children:t}),a.jsx(m,{sx:{display:"flex",justifyContent:"space-between",flexWrap:"wrap",rowGap:3,columnGap:1,mt:2,mb:2},children:l?a.jsx("h3",{children:"Loading..."}):r?a.jsx("h2",{children:r}):(e==null?void 0:e.length)>0&&r==null&&e.map((c,p)=>a.jsx(n.Suspense,{fallback:a.jsx(j,{}),children:a.jsx(u,{listing:c})},p))})]})})};export{b as default};
