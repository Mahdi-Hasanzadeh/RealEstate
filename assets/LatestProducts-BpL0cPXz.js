function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/Card-D30UYXH5.js","assets/index-p3PlTnYA.js","assets/index-DDnostVl.css","assets/Zoom-Z2iBQ5TV.js","assets/formatDistanceToNow-BUfmRWsg.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as n,_ as m,j as a,T as i,a as d,L as h,B as j,F as u}from"./index-p3PlTnYA.js";import{C as f}from"./Container-CADZ1SYs.js";import"./styled-AEfts0C2.js";const y=n.lazy(()=>m(()=>import("./Card-D30UYXH5.js"),__vite__mapDeps([0,1,2,3,4]))),b=({title:t,loading:o,error:r,listings:e,query:s,category:c})=>{var l=`category=${c}&`;return l+=s=="offer"?"offer=true":s=="rent"?"type=rent":s=="sell"?"type=sell":null,a.jsx(a.Fragment,{children:a.jsxs(f,{maxWidth:"lg",sx:{py:2},className:"scroll-animation",children:[a.jsx(i,{variant:"h5",color:d,children:t}),a.jsx(h,{className:"Link",style:{color:"purple"},to:`/search?${l}`,children:t}),a.jsx(j,{sx:{display:"flex",justifyContent:{xs:"center",sm:"space-between"},flexWrap:"wrap",rowGap:3,columnGap:{xs:0,sm:1},mt:2,mb:2},children:o?a.jsx("h3",{children:"Loading..."}):r?a.jsx("h2",{children:r}):(e==null?void 0:e.length)>0&&r==null&&e.map((p,x)=>a.jsx(n.Suspense,{fallback:a.jsx(u,{}),children:a.jsx(y,{listing:p})},x))})]})})};export{b as default};
