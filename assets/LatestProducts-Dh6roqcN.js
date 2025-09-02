function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/SearchResultCard-cQkVN3eV.js","assets/index-Gdgiy31r.js","assets/index-DDnostVl.css","assets/Zoom-dg5qXH_u.js","assets/Card-DIUxNPSs.js","assets/CardMedia-CSUZMXBK.js","assets/CardContent-NIjrUAom.js","assets/formatDistanceToNow-2MNTfsHG.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as s,_ as c,j as a,T as e,B as l,F as m}from"./index-Gdgiy31r.js";import{C as d}from"./Container-B-YhSeda.js";import"./styled-CnSCcvPH.js";const i=s.lazy(()=>c(()=>import("./SearchResultCard-cQkVN3eV.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),_=({title:o,loading:x,error:t,listings:r})=>a.jsxs(d,{maxWidth:"lg",sx:{py:2},children:[a.jsx(e,{variant:"h5",gutterBottom:!0,children:o}),a.jsx(l,{sx:{display:"flex",justifyContent:{xs:"center",sm:"space-between"},flexWrap:"wrap",rowGap:3,columnGap:{xs:0,sm:1},mt:2,mb:2},children:x?a.jsx(e,{variant:"h6",children:"Loading..."}):t?a.jsx(e,{variant:"h6",color:"error",children:t}):(r==null?void 0:r.length)>0&&!t&&r.map((n,p)=>a.jsx(s.Suspense,{fallback:a.jsx(m,{}),children:a.jsx(i,{listing:n})},p))})]});export{_ as default};
