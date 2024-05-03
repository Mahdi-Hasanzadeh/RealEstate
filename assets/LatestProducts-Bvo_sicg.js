function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/Card-DKUPohTm.js","assets/index-CiIZgPDR.js","assets/index-BvsXOxI1.css","assets/Zoom-B4GVGZZ4.js","assets/formatDistanceToNow-aDLjEcHe.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as l,_ as x,j as e,T as d,b as m,L as h,B as i,F as j}from"./index-CiIZgPDR.js";import{C as u}from"./Container-DPr0iZDT.js";import"./styled-BAVA0Wq_.js";const f=l.lazy(()=>x(()=>import("./Card-DKUPohTm.js"),__vite__mapDeps([0,1,2,3,4]))),b=({title:t,loading:n,error:r,listings:a,query:s})=>{const o=s=="offer"?"offer=true":s=="rent"?"type=rent":s=="sell"?"type=sell":null;return e.jsx(e.Fragment,{children:e.jsxs(u,{maxWidth:"lg",sx:{py:2},children:[e.jsx(d,{variant:"h5",color:m,children:t}),e.jsx(h,{className:"Link",style:{color:"purple"},to:`/search?${o}`,children:t}),e.jsx(i,{sx:{display:"flex",justifyContent:{xs:"center",sm:"space-between"},flexWrap:"wrap",rowGap:3,columnGap:{xs:0,sm:1},mt:2,mb:2},children:n?e.jsx("h3",{children:"Loading..."}):r?e.jsx("h2",{children:r}):(a==null?void 0:a.length)>0&&r==null&&a.map((c,p)=>e.jsx(l.Suspense,{fallback:e.jsx(j,{}),children:e.jsx(f,{listing:c})},p))})]})})};export{b as default};
