function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/SearchResultCard-Dk7PmUak.js","assets/index-B6Jh5Kqf.js","assets/index-DDnostVl.css","assets/Zoom-BGt3lVFV.js","assets/Card-BH7gk7ep.js","assets/CardMedia-Cgk7daUN.js","assets/CardContent-BSnD7huK.js","assets/formatDistanceToNow-DlBtU0q7.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as s,_ as c,j as a,T as e,B as l,F as m}from"./index-B6Jh5Kqf.js";import{C as d}from"./Container-Dhm7lGM3.js";import"./styled-lc6bJm8w.js";const i=s.lazy(()=>c(()=>import("./SearchResultCard-Dk7PmUak.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),_=({title:o,loading:x,error:t,listings:r})=>a.jsxs(d,{maxWidth:"lg",sx:{py:2},children:[a.jsx(e,{variant:"h5",gutterBottom:!0,children:o}),a.jsx(l,{sx:{display:"flex",justifyContent:{xs:"center",sm:"space-between"},flexWrap:"wrap",rowGap:3,columnGap:{xs:0,sm:1},mt:2,mb:2},children:x?a.jsx(e,{variant:"h6",children:"Loading..."}):t?a.jsx(e,{variant:"h6",color:"error",children:t}):(r==null?void 0:r.length)>0&&!t&&r.map((n,p)=>a.jsx(s.Suspense,{fallback:a.jsx(m,{}),children:a.jsx(i,{listing:n})},p))})]});export{_ as default};
