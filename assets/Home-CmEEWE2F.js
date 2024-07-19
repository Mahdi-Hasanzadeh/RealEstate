function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/ProductsSlider-D0cK49Jg.js","assets/index-BF8H7DTL.js","assets/index-DDnostVl.css","assets/index-Bj5IssM0.js","assets/loader-C4zb0H2B.js","assets/Container-Dmjk8-GI.js","assets/styled-s5EO9tRq.js","assets/LatestProducts-BcZwgOCl.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as t,_ as k,u as U,a as R,j as e,B as n,T as o,G as V,b as $,C as b,L as Y,F as i,c as l,U as c}from"./index-BF8H7DTL.js";import{C as K}from"./Container-Dmjk8-GI.js";import"./styled-s5EO9tRq.js";const J=t.lazy(()=>k(()=>import("./ProductsSlider-D0cK49Jg.js"),__vite__mapDeps([0,1,2,3,4,5,6]))),m=t.lazy(()=>k(()=>import("./LatestProducts-BcZwgOCl.js"),__vite__mapDeps([7,1,2,5,6]))),a="estate",d=4,w=!0,X="rent",Z="sell",ee=`category=${a}&limit=${d}&offer=${w}`,se=`category=${a}&limit=${d}&type=${X}`,te=`category=${a}&limit=${d}&type=${Z}`,ae=`category=estate&limit=${d}&offer=${w}&furnished=true&parking=true`,ie=()=>{const x=U(),r=R(x.breakpoints.up("md")),u=R(x.breakpoints.down("sm")),[O,_]=t.useState([]),[v,E]=t.useState([]),[T,A]=t.useState([]),[P,I]=t.useState([]),[F,f]=t.useState(null),[W,g]=t.useState(null),[z,p]=t.useState(null),[B,h]=t.useState(null),[C,y]=t.useState(!1),[Q,S]=t.useState(!1),[G,j]=t.useState(!1),[q,L]=t.useState(!1),D=async()=>{try{y(!0);const s=await l.get(`${c}api/listing/get?${ae}`);if(s.data.success==!1){f(s.data.message);return}_(s.data.listings),f(null),N()}catch(s){f(s.message)}finally{y(!1)}},N=async()=>{try{S(!0);const s=await l.get(`${c}api/listing/get?${ee}`);if(s.data.success==!1){g(s.data.message);return}E(s.data.listings),g(null),H()}catch(s){g(s.message)}finally{S(!1)}},H=async()=>{try{j(!0);const s=await l.get(`${c}api/listing/get?${se}`,{headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}});if(s.data.success==!1){p(s.data.message);return}A(s.data.listings),p(null),M()}catch(s){p(s.message)}finally{j(!1)}},M=async()=>{try{L(!0);const s=await l.get(`${c}api/listing/get?${te}`,{headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}});if(s.data.success==!1){h(s.data.message);return}I(s.data.listings),h(null)}catch(s){h(s.message)}finally{L(!1)}};return t.useEffect(()=>{D()},[]),e.jsxs(e.Fragment,{children:[e.jsx(K,{maxWidth:"lg",sx:{display:"flex",alignItems:"center"},children:e.jsxs(n,{sx:{display:"flex",flexDirection:"column",ml:{xs:0,md:5}},children:[e.jsx(n,{children:e.jsxs(o,{variant:r?"h2":u?"h5":"h3",color:V,component:"div",sx:{maxWidth:r?600:u?200:400,wordWrap:"break-word"},children:["Find your next"," ",e.jsx(o,{variant:r?"h2":u?"h5":"h3",component:"span",color:$,children:"perfect"})," ","product with ease"]})}),e.jsx(n,{children:e.jsxs(o,{color:b,variant:r?"body1":"caption",component:"div",sx:{wordWrap:"break-word",mt:1.5},children:["Sell Website will help you to find your"," ",e.jsx(o,{variant:"h6",component:"span",color:$,children:"products"})," ","fast,easy and comfortable."]})}),e.jsx(n,{children:e.jsx(o,{color:b,variant:r?"body1":"caption",component:"div",sx:{wordWrap:"break-word"},children:"Our expert support are always available."})}),e.jsx(n,{sx:{mt:1},children:e.jsx(Y,{style:{fontSize:"1.5em"},className:"Link",to:"/search?category=estate",children:"Let's Start Now..."})})]})}),e.jsx(t.Suspense,{fallback:e.jsx(i,{}),children:e.jsx(J,{loading:C,error:F,listings:O})}),e.jsx(t.Suspense,{fallback:e.jsx(i,{}),children:e.jsx(m,{query:"offer",title:"Recent Offers",loading:Q,error:W,listings:v,category:a})}),e.jsx(t.Suspense,{fallback:e.jsx(i,{}),children:e.jsx(m,{query:"rent",title:"Recent Places For Rent",loading:G,error:z,listings:T,category:a})}),e.jsx(t.Suspense,{fallback:e.jsx(i,{}),children:e.jsx(m,{query:"sell",title:"Recent Places For Sale",loading:q,error:B,listings:P,category:a})})]})};export{ie as default};
