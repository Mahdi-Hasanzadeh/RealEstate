function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/Wave-DhpLX-7P.js","assets/index-BSzDctV0.js","assets/index-DDnostVl.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as m,_ as me,e as ce,d as de,u as ge,b as he,f as fe,a4 as L,ak as A,Y as E,al as W,X as _,ad as T,a6 as q,j as e,F as xe,B as g,af as pe,ae as be,aa as G,ag as Ce,g as x,am as ye,ab as je,a as ve,a3 as Pe,i as z,k as u,an as ke,ao as Re,R as we,c as O,U as $}from"./index-BSzDctV0.js";import{g as Se,r as Ue,u as Le,a as Te}from"./index.esm2017-xdxYMBNT.js";import{a as Fe}from"./firebase-Dc1fJsNB.js";import y from"./ComboBox-D22InVev.js";import{C as Ie}from"./Container-DqNJLyj9.js";import{G as N,F}from"./Grid-CWtzChWb.js";import{C as I}from"./Checkbox-D50jtsTE.js";import"./MenuItem-BUSOfZ6N.js";import"./dividerClasses-rX9rVKwS.js";import"./styled-DY2EzqoV.js";const j=3e3,Me=m.lazy(()=>me(()=>import("./Wave-DhpLX-7P.js"),__vite__mapDeps([0,1,2]))),ze="Create list",Oe=()=>{const Y=ce(),H=de(),[R,K]=m.useState([]),[D,w]=m.useState(),[S,h]=m.useState(!1),Q=ge(),o=he(Q.breakpoints.down("md")),v=fe(a=>a.persistData.user.userInfo),[c,X]=m.useState(L),[P,B]=m.useState(""),[k,J]=m.useState({brand:A[1].value,storage:E[0].value,color:W[0].value,RAM:_[0].value}),[f,Z]=m.useState({type:"rent",parking:!1,furnished:!1,bedrooms:1,bath:1}),[t,M]=m.useState({description:"",imageURLs:[],regularPrice:1,discountPrice:1,mobileNumber:"",offer:!1});m.useEffect(()=>{switch(c){case T:{B(q);break}}},[c]);const ee=a=>{X(a.target.value)},ae=a=>{B(a.target.value)},b=a=>{M(s=>({...s,[a.target.name]:a.target.type=="checkbox"?a.target.checked:a.target.value}))},C=a=>{const s=a.target.name,r=a.target.type;Z(n=>s=="type"?{...n,[a.target.name]:a.target.value}:r=="checkbox"?{...n,[a.target.name]:a.target.checked}:{...n,[a.target.name]:a.target.value})},U=a=>{J(s=>({...s,[a.target.name]:a.target.value}))},se=a=>{M(s=>({...s,imageURLs:[...t.imageURLs.filter(r=>r!==a)]}))},te=a=>{a.target.files.length<7&&K(a.target.files)},le=()=>{if(R.length>0&&R.length+t.imageURLs.length<7){const s=[];u.info("Uploading photo, please wait"),h(!0);for(var a=0;a<R.length;a++)s.push(ue(R[a]));Promise.all(s).then(r=>{M(n=>({...n,imageURLs:t.imageURLs.concat(r)})),h(!0)}).then(()=>{w(!1)}).catch(r=>{u.error("image Upload failed.Image should be 2mb ",{autoClose:j}),console.log(r.message)}).finally(()=>{h(!1)})}else w("Please choose only six images for every list"),u.error("Please choose only six images for every list",{autoClose:j})},re=async(a,s,r)=>{var n,p;try{const i=await O.put(`${$}api/user/update/${a}`,{mobileNumber:s},{headers:{Authorization:`Bearer ${r}`}});return((n=i==null?void 0:i.data)==null?void 0:n.succeess)==!1?{success:!1,message:(p=i==null?void 0:i.data)==null?void 0:p.message}:{success:!0}}catch(i){return{success:!1,message:i.message}}},oe=async a=>{if(a.preventDefault(),!t.name||!t.description||!t.address||t.imageURLs.length===0){u.error("Please provide the required information",{autoClose:j});return}if(!v.mobileNumber){if(!ke(t.mobileNumber)){u.error("Telephone number Should Contain only numbers");return}if(!Re(t.mobileNumber)){u.error("Mobile number should be 10 digits");return}}if(h(!0),!v.mobileNumber){const n=await re(v.id,t.mobileNumber,accessToken);if(n.success){u.error(n.message,{autoClose:j}),w(n.message),h(!1);return}u.success("Your mobile number updated"),H(we({...v,mobileNumber:t.mobileNumber}))}const s=ne(c),r=await ie(s);if(r.success==!1){h(!1);return}h(!1),console.log(r.data._id+","+c+","+P),Y(`/listing/${r.data._id+","+c+","+P}`)},ne=a=>{let s={mainCategory:a,...t};switch(a){case L:{s={...s,...f};break}case T:{s={...s,...k,subCategory:P};break}}return s},ie=async a=>{var r,n,p,i;const s=localStorage.getItem("accessToken");try{const l=await O.post(`${$}api/listing/create`,a,{headers:{Authorization:`Bearer ${s}`}});return((r=l==null?void 0:l.data)==null?void 0:r.succeess)==!1?(u.error((n=l==null?void 0:l.data)==null?void 0:n.message,{autoClose:j}),w((p=l==null?void 0:l.data)==null?void 0:p.message),{success:!1,message:(i=l==null?void 0:l.data)==null?void 0:i.message}):(u.success("Your product added successfully"),{succeess:!0,data:l==null?void 0:l.data})}catch(l){return u.error(l.message),{success:!1,message:l.message}}},ue=async a=>new Promise((s,r)=>{const n=Se(Fe),p=a.name+new Date().getTime(),i=Ue(n,p),l=Le(i,a);l.on("state_changed",d=>{const V=d.bytesTransferred/d.totalBytes*100;console.log(V),console.log("Upload is "+Math.round(V)+"% done")},d=>{console.log("eroro upload"),u.error(d.message,{autoClose:j}),console.log(d),h(!1),r(d)},()=>{console.log("down url"),Te(l.snapshot.ref).then(d=>{s(d),console.log(d)})})});return e.jsx(e.Fragment,{children:e.jsxs(Ie,{maxWidth:"md",sx:{paddingBottom:10},children:[e.jsx(m.Suspense,{fallback:e.jsx(xe,{}),children:e.jsx(Me,{title:ze})}),e.jsxs(N,{container:!0,spacing:o?0:1,justifyContent:o?"normal":"flex-start",children:[e.jsx(N,{item:!0,xs:12,md:6,children:e.jsxs(g,{component:"form",sx:{padding:2},children:[e.jsxs(g,{sx:{display:"flex",flexDirection:"column",rowGap:1},children:[e.jsx(y,{name:"Choose Category",defaultValue:"ALL PRODUCTS",value:c,handleValueMethod:ee,items:pe.filter(a=>a.value!=be)}),c==T&&e.jsx(e.Fragment,{children:e.jsx(y,{name:"Choose Sub Category",defaultValue:G,value:P,items:Ce.filter(a=>a.value!=G),handleValueMethod:ae})}),e.jsx(x,{fullWidth:!0,type:"text",label:"Name",variant:"outlined",name:"name",value:t.name||"",onChange:b,required:!0,size:o?"small":"medium"}),e.jsx(x,{multiline:!0,fullWidth:!0,maxRows:10,type:"text",label:"Description",variant:"outlined",name:"description",value:t.description,onChange:b,required:!0,size:o?"small":"medium"}),e.jsx(x,{multiline:!0,fullWidth:!0,maxRows:10,type:"text",label:"address",variant:"outlined",name:"address",value:(t==null?void 0:t.address)||"",onChange:b,required:!0,size:o?"small":"medium"}),!v.mobileNumber&&e.jsx(x,{fullWidth:!0,type:"text",label:"Mobile",variant:"outlined",name:"mobileNumber",value:(t==null?void 0:t.mobileNumber)||"",onChange:b,required:!0,size:o?"small":"medium"})]}),c==L&&e.jsxs(e.Fragment,{children:[e.jsxs(g,{sx:{display:"flex",justifyContent:{xs:"space-between",sm:"flex-start"}},children:[e.jsx(F,{value:"sell",label:"Sell",labelPlacement:"start",name:"type",onChange:C,control:e.jsx(I,{size:o?"small":"medium",checked:f.type==="sell"})}),e.jsx(F,{value:"rent",label:"Rent",labelPlacement:"start",name:"type",onChange:C,control:e.jsx(I,{size:o?"small":"medium",checked:f.type==="rent"})})]}),e.jsxs(g,{sx:{display:"flex",flexWrap:"wrap",flexDirection:{xs:"column",sm:"row"},alignItems:"flex-start",mb:1.5},children:[e.jsx(F,{value:f.parking,label:"Parking spot",labelPlacement:"start",name:"parking",onChange:C,control:e.jsx(I,{size:o?"small":"medium",checked:f.parking||!1})}),e.jsx(F,{value:!0,label:"Furnished",labelPlacement:"start",name:"furnished",onChange:C,control:e.jsx(I,{size:o?"small":"medium",checked:f.furnished||!1})})]})]}),c==T&&P==q&&e.jsxs(e.Fragment,{children:[e.jsx(y,{name:"brand",defaultValue:ye,items:A.filter(a=>a.value!=je),value:k.brand,handleValueMethod:U}),e.jsx(y,{name:"storage",defaultValue:"Choose Storage",items:E,value:k.storage,handleValueMethod:U}),e.jsx(y,{name:"RAM",defaultValue:"Choose RAM",value:k.RAM,items:_,handleValueMethod:U}),e.jsx(y,{name:"color",defaultValue:"Choose Color",items:W,value:k.color,handleValueMethod:U})]}),e.jsxs(g,{sx:{display:"flex",justifyContent:"flex-start",gap:3,flexWrap:"wrap",marginTop:2},children:[c==L&&e.jsxs(e.Fragment,{children:[e.jsx(x,{type:"number",label:"Beds",size:o?"small":"medium",name:"bedrooms",value:f.bedrooms,onChange:C}),e.jsx(x,{type:"number",label:"Baths",size:o?"small":"medium",name:"bath",value:f.bath,onChange:C})]}),e.jsx(x,{type:"number",label:"Price",size:o?"small":"medium",name:"regularPrice",value:t.regularPrice,onChange:b}),t.offer&&e.jsx(x,{type:"number",label:"Discount",size:o?"small":"medium",name:"discountPrice",value:t.discountPrice,onChange:b})]})]})}),e.jsxs(N,{item:!0,xs:12,md:6,sx:{display:"flex",flexDirection:"column",gap:1},children:[e.jsxs(g,{children:[e.jsxs("h3",{style:{fontSize:o?"16.5px":"20px",fontWeight:"bolder",textAlign:"justify"},children:["Images:",e.jsx("span",{style:{color:ve},children:"The first image will be the cover (maximum:6)"})]}),e.jsxs(g,{sx:{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",gap:1.5},children:[e.jsx("input",{style:{border:"1p solid aqua",outline:"2px solid",outlineColor:Pe,textIndent:"4px"},type:"file",accept:"image/*",multiple:!0,onChange:te}),e.jsx(z,{onClick:le,variant:"contained",color:"success",size:o?"small":"large",disabled:S,fullWidth:!0,children:S?"Uploading....":"UPLOAD"})]})]}),e.jsxs(g,{className:"show image section",children:[e.jsx("p",{children:D&&D}),t.imageURLs.length>0&&t.imageURLs.map((a,s)=>e.jsxs(g,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",mb:1},children:[e.jsx("img",{width:"100",height:"100",style:{borderRadius:"5px",objectFit:"cotain"},src:a,alt:a}),e.jsx(z,{onClick:()=>{se(a)},variant:"text",color:"warning",children:"Delete"})]},s))]}),e.jsx(z,{sx:{},type:"submit",onClick:oe,variant:"contained",fullWidth:!0,size:o?"small":"large",color:"success",disabled:!!S,children:S?"Loading":"Create list"})]})]})]})})};export{Oe as default};
