function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/Wave-DA0j8wp3.js","assets/index-Cb8TbFW9.js","assets/index-B3EqNP97.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as f,_ as $,e as q,d as E,u as G,a as M,f as Y,j as s,F as O,B as m,g as d,b as Q,Y as H,i as k,k as n,c as L,U as N,Q as K}from"./index-Cb8TbFW9.js";import{g as V,r as J,u as X,a as Z}from"./index.esm2017-xdxYMBNT.js";import{a as ee}from"./firebase-Dc1fJsNB.js";import{C as se}from"./Container-BeEU9-ET.js";import{G as R,F as b}from"./Grid-Dh7BE8-A.js";import{C as j}from"./Checkbox-B27WPiWR.js";import"./styled-CakSrLZw.js";const ae=f.lazy(()=>$(()=>import("./Wave-DA0j8wp3.js"),__vite__mapDeps([0,1,2]))),g=3e3,me=()=>{const F=q(),I=E(),[y,S]=f.useState([]),[U,C]=f.useState(),[v,h]=f.useState(!1),T=G(),t=M(T.breakpoints.down("md")),x=Y(a=>a.persistData.user.userInfo),[e,P]=f.useState({type:"rent",description:"",imageURLs:[],parking:!1,furnished:!1,offer:!1,bedrooms:1,bath:1,regularPrice:1,discountPrice:1,mobileNumber:""}),W=async a=>{var i,p;if(a.preventDefault(),!e.name||!e.description||!e.address||e.imageURLs.length===0){console.log("Fill out the form"),n.error("Please fill out the form",{autoClose:g});return}if(!x.mobileNumber){if(!/^\d+$/.test(e==null?void 0:e.mobileNumber)){n.error("Telephone number Should Contain only numbers");return}if((e==null?void 0:e.mobileNumber.length)<10||(e==null?void 0:e.mobileNumber.length)>10){n.error("Mobile number should be 10 digits");return}}if(parseInt(e.discountPrice)>=parseInt(e.regularPrice)){n.error("Discount price can not be bigger than or equal to regular price",{autoClose:g});return}const l=localStorage.getItem("accessToken");try{if(h(!0),!x.mobileNumber){const c=await L.put(`${N}api/user/update/${x.id}`,{mobileNumber:e.mobileNumber},{headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}});if(((i=c==null?void 0:c.data)==null?void 0:i.succeess)==!1){console.log(c.data.message),n.error(c.data.message,{autoClose:g}),C(c.data.message);return}n.success("Your mobile number updated"),I(K({...x,mobileNumber:e.mobileNumber}))}const o=await L.post(`${N}api/listing/create`,{...e,discountPrice:e.offer?e.discountPrice:0},{headers:{Authorization:`Bearer ${l}`}});if(((p=o==null?void 0:o.data)==null?void 0:p.succeess)==!1){console.log(o.data.message),n.error(o.data.message,{autoClose:g}),C(o.data.message);return}n.success("Your listing created successfully"),F(`/listing/${o.data._id}`)}catch(o){console.log(o.message),n.error(o.message,{autoClose:g})}finally{h(!1)}},B=a=>{P(l=>({...l,imageURLs:[...e.imageURLs.filter(i=>i!==a)]}))},r=a=>{a.target.name=="parking"||a.target.name=="furnished"||a.target.name=="offer"?P(l=>({...l,[a.target.name]:a.target.name=="parking"?!e.parking:a.target.name=="furnished"?!e.furnished:!e.offer})):P(l=>({...l,[a.target.name]:(a.target.type=="text",a.target.value)}))},_=a=>{a.target.files.length<7&&S(a.target.files)},A=()=>{if(y.length>0&&y.length+e.imageURLs.length<7){const l=[];console.log("upload photo"),h(!0);for(var a=0;a<y.length;a++)l.push(D(y[a]));Promise.all(l).then(i=>{P(p=>({...p,imageURLs:e.imageURLs.concat(i)})),h(!0)}).then(()=>{C(!1)}).catch(i=>{n.error("image Upload failed.Image should be 2mb ",{autoClose:g}),console.log(i.message)}).finally(()=>{h(!1)})}else C("Please choose only six images for every list"),n.error("Please choose only six images for every list",{autoClose:g})},D=async a=>new Promise((l,i)=>{const p=V(ee),o=a.name+new Date().getTime(),c=J(p,o),z=X(c,a);z.on("state_changed",u=>{const w=u.bytesTransferred/u.totalBytes*100;console.log(w),console.log("Upload is "+Math.round(w)+"% done")},u=>{console.log("eroro upload"),n.error(u.message,{autoClose:g}),console.log(u),h(!1),i(u)},()=>{console.log("down url"),Z(z.snapshot.ref).then(u=>{l(u),console.log(u)})})});return s.jsx(s.Fragment,{children:s.jsxs(se,{maxWidth:"md",sx:{position:"relative",top:50,mb:20},children:[s.jsx(f.Suspense,{fallback:s.jsx(O,{}),children:s.jsx(ae,{title:"Create list"})}),s.jsxs(R,{container:!0,spacing:t?0:1,justifyContent:t?"normal":"flex-start",children:[s.jsx(R,{item:!0,xs:12,md:6,children:s.jsxs(m,{component:"form",sx:{padding:2},children:[s.jsxs(m,{sx:{display:"flex",flexDirection:"column",gap:1.5},children:[s.jsx(d,{fullWidth:!0,type:"text",label:"Name",variant:"outlined",name:"name",value:e.name||"",onChange:r,required:!0,size:t?"small":"medium"}),s.jsx(d,{multiline:!0,fullWidth:!0,maxRows:10,type:"text",label:"Description",variant:"outlined",name:"description",value:e.description,onChange:r,required:!0,size:t?"small":"medium"}),s.jsx(d,{multiline:!0,fullWidth:!0,maxRows:10,type:"text",label:"address",variant:"outlined",name:"address",value:(e==null?void 0:e.address)||"",onChange:r,required:!0,size:t?"small":"medium"}),!x.mobileNumber&&s.jsx(d,{fullWidth:!0,type:"text",label:"Mobile",variant:"outlined",name:"mobileNumber",value:(e==null?void 0:e.mobileNumber)||"",onChange:r,required:!0,size:t?"small":"medium"})]}),s.jsxs(m,{sx:{display:"flex",justifyContent:{xs:"space-between",sm:"flex-start"}},children:[s.jsx(b,{value:"sell",label:"Sell",labelPlacement:"start",name:"type",onChange:r,control:s.jsx(j,{size:t?"small":"medium",checked:e.type==="sell"})}),s.jsx(b,{value:"rent",label:"Rent",labelPlacement:"start",name:"type",onChange:r,control:s.jsx(j,{size:t?"small":"medium",checked:e.type==="rent"})})]}),s.jsxs(m,{sx:{display:"flex",flexWrap:"wrap",flexDirection:{xs:"column",sm:"row"},alignItems:"flex-start",mb:1.5},children:[s.jsx(b,{value:!0,label:"Parking spot",labelPlacement:"start",name:"parking",onChange:r,control:s.jsx(j,{size:t?"small":"medium",checked:e.parking||!1})}),s.jsx(b,{value:!0,label:"Furnished",labelPlacement:"start",name:"furnished",onChange:r,control:s.jsx(j,{size:t?"small":"medium",checked:e.furnished||!1})}),s.jsx(b,{value:!0,label:"Offer",labelPlacement:"start",name:"offer",onChange:r,control:s.jsx(j,{size:t?"small":"medium",checked:e.offer||!1})})]}),s.jsxs(m,{sx:{display:"flex",justifyContent:"flex-start",gap:3,flexWrap:"wrap"},children:[s.jsx(d,{type:"number",label:"Beds",size:t?"small":"medium",name:"bedrooms",value:e.bedrooms,onChange:r}),s.jsx(d,{type:"number",label:"Baths",size:t?"small":"medium",name:"bath",value:e.bath,onChange:r}),s.jsx(d,{type:"number",label:"Regular Price / month",size:t?"small":"medium",name:"regularPrice",value:e.regularPrice,onChange:r}),e.offer&&s.jsx(d,{type:"number",label:"Discount Price / month",size:t?"small":"medium",name:"discountPrice",value:e.discountPrice,onChange:r})]})]})}),s.jsxs(R,{item:!0,xs:12,md:6,sx:{display:"flex",flexDirection:"column",gap:1},children:[s.jsxs(m,{children:[s.jsxs("h3",{style:{fontSize:t?"16.5px":"20px",fontWeight:"bolder",textAlign:"justify"},children:["Images:",s.jsx("span",{style:{color:Q},children:"The first image will be the cover (maximum:6)"})]}),s.jsxs(m,{sx:{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",gap:1.5},children:[s.jsx("input",{style:{border:"1p solid aqua",outline:"2px solid",outlineColor:H,textIndent:"4px"},type:"file",accept:"image/*",multiple:!0,onChange:_}),s.jsx(k,{onClick:A,variant:"contained",color:"success",size:t?"small":"large",disabled:v,fullWidth:!0,children:v?"Uploading....":"UPLOAD"})]})]}),s.jsxs(m,{className:"show image section",children:[s.jsx("p",{children:U&&U}),e.imageURLs.length>0&&e.imageURLs.map((a,l)=>s.jsxs(m,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",mb:1},children:[s.jsx("img",{width:"100",height:"100",style:{borderRadius:"5px",objectFit:"cotain"},src:a,alt:a}),s.jsx(k,{onClick:()=>{B(a)},variant:"text",color:"warning",children:"Delete"})]},l))]}),s.jsx(k,{sx:{},type:"submit",onClick:W,variant:"contained",fullWidth:!0,size:t?"small":"large",color:"success",disabled:!!v,children:v?"Loading":"Create list"})]})]})]})})};export{me as default};
