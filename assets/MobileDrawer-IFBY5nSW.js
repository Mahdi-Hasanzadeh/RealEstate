import{V as U,j as e,t as A,w as a,a4 as K,r as D,y as S,z as I,A as k,D as G,o as J,p as Q,aq as X,a3 as rr,Z as or,v as C,u as tr,ar as er,S as ir,e as ar,$ as nr,B as R,T as E,G as sr,as as lr,at as P,b as N,i as H,E as cr,I as dr,au as pr,L as $,s as M}from"./index-CiIZgPDR.js";import{g as hr}from"./dividerClasses-UQKgTrc0.js";const ur=U(e.jsx("path",{d:"m8.71 11.71 2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71"}),"ArrowDropDownRounded"),vr=U(e.jsx("path",{d:"M8.71 12.29 11.3 9.7c.39-.39 1.02-.39 1.41 0l2.59 2.59c.63.63.18 1.71-.71 1.71H9.41c-.89 0-1.33-1.08-.7-1.71"}),"ArrowDropUpRounded"),xr=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],fr=o=>{const{absolute:r,children:t,classes:i,flexItem:s,light:l,orientation:c,textAlign:d,variant:u}=o;return G({root:["root",r&&"absolute",u,l&&"light",c==="vertical"&&"vertical",s&&"flexItem",t&&"withChildren",t&&c==="vertical"&&"withChildrenVertical",d==="right"&&c!=="vertical"&&"textAlignRight",d==="left"&&c!=="vertical"&&"textAlignLeft"],wrapper:["wrapper",c==="vertical"&&"wrapperVertical"]},hr,i)},gr=A("div",{name:"MuiDivider",slot:"Root",overridesResolver:(o,r)=>{const{ownerState:t}=o;return[r.root,t.absolute&&r.absolute,r[t.variant],t.light&&r.light,t.orientation==="vertical"&&r.vertical,t.flexItem&&r.flexItem,t.children&&r.withChildren,t.children&&t.orientation==="vertical"&&r.withChildrenVertical,t.textAlign==="right"&&t.orientation!=="vertical"&&r.textAlignRight,t.textAlign==="left"&&t.orientation!=="vertical"&&r.textAlignLeft]}})(({theme:o,ownerState:r})=>a({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(o.vars||o).palette.divider,borderBottomWidth:"thin"},r.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},r.light&&{borderColor:o.vars?`rgba(${o.vars.palette.dividerChannel} / 0.08)`:K(o.palette.divider,.08)},r.variant==="inset"&&{marginLeft:72},r.variant==="middle"&&r.orientation==="horizontal"&&{marginLeft:o.spacing(2),marginRight:o.spacing(2)},r.variant==="middle"&&r.orientation==="vertical"&&{marginTop:o.spacing(1),marginBottom:o.spacing(1)},r.orientation==="vertical"&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},r.flexItem&&{alignSelf:"stretch",height:"auto"}),({ownerState:o})=>a({},o.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{content:'""',alignSelf:"center"}}),({theme:o,ownerState:r})=>a({},r.children&&r.orientation!=="vertical"&&{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(o.vars||o).palette.divider}`}}),({theme:o,ownerState:r})=>a({},r.children&&r.orientation==="vertical"&&{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(o.vars||o).palette.divider}`}}),({ownerState:o})=>a({},o.textAlign==="right"&&o.orientation!=="vertical"&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},o.textAlign==="left"&&o.orientation!=="vertical"&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})),mr=A("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(o,r)=>{const{ownerState:t}=o;return[r.wrapper,t.orientation==="vertical"&&r.wrapperVertical]}})(({theme:o,ownerState:r})=>a({display:"inline-block",paddingLeft:`calc(${o.spacing(1)} * 1.2)`,paddingRight:`calc(${o.spacing(1)} * 1.2)`},r.orientation==="vertical"&&{paddingTop:`calc(${o.spacing(1)} * 1.2)`,paddingBottom:`calc(${o.spacing(1)} * 1.2)`})),V=D.forwardRef(function(r,t){const i=S({props:r,name:"MuiDivider"}),{absolute:s=!1,children:l,className:c,component:d=l?"div":"hr",flexItem:u=!1,light:g=!1,orientation:v="horizontal",role:n=d!=="hr"?"separator":void 0,textAlign:h="center",variant:p="fullWidth"}=i,L=I(i,xr),x=a({},i,{absolute:s,component:d,flexItem:u,light:g,orientation:v,role:n,textAlign:h,variant:p}),m=fr(x);return e.jsx(gr,a({as:d,className:k(m.root,c),role:n,ref:t,ownerState:x},L,{children:l?e.jsx(mr,{className:m.wrapper,ownerState:x,children:l}):null}))});V.muiSkipListHighlight=!0;const br=V;function kr(o){return J("MuiDrawer",o)}Q("MuiDrawer",["root","docked","paper","paperAnchorLeft","paperAnchorRight","paperAnchorTop","paperAnchorBottom","paperAnchorDockedLeft","paperAnchorDockedRight","paperAnchorDockedTop","paperAnchorDockedBottom","modal"]);const Dr=["BackdropProps"],Ar=["anchor","BackdropProps","children","className","elevation","hideBackdrop","ModalProps","onClose","open","PaperProps","SlideProps","TransitionComponent","transitionDuration","variant"],_=(o,r)=>{const{ownerState:t}=o;return[r.root,(t.variant==="permanent"||t.variant==="persistent")&&r.docked,r.modal]},jr=o=>{const{classes:r,anchor:t,variant:i}=o,s={root:["root"],docked:[(i==="permanent"||i==="persistent")&&"docked"],modal:["modal"],paper:["paper",`paperAnchor${C(t)}`,i!=="temporary"&&`paperAnchorDocked${C(t)}`]};return G(s,kr,r)},wr=A(X,{name:"MuiDrawer",slot:"Root",overridesResolver:_})(({theme:o})=>({zIndex:(o.vars||o).zIndex.drawer})),W=A("div",{shouldForwardProp:rr,name:"MuiDrawer",slot:"Docked",skipVariantsResolver:!1,overridesResolver:_})({flex:"0 0 auto"}),Rr=A(or,{name:"MuiDrawer",slot:"Paper",overridesResolver:(o,r)=>{const{ownerState:t}=o;return[r.paper,r[`paperAnchor${C(t.anchor)}`],t.variant!=="temporary"&&r[`paperAnchorDocked${C(t.anchor)}`]]}})(({theme:o,ownerState:r})=>a({overflowY:"auto",display:"flex",flexDirection:"column",height:"100%",flex:"1 0 auto",zIndex:(o.vars||o).zIndex.drawer,WebkitOverflowScrolling:"touch",position:"fixed",top:0,outline:0},r.anchor==="left"&&{left:0},r.anchor==="top"&&{top:0,left:0,right:0,height:"auto",maxHeight:"100%"},r.anchor==="right"&&{right:0},r.anchor==="bottom"&&{top:"auto",left:0,bottom:0,right:0,height:"auto",maxHeight:"100%"},r.anchor==="left"&&r.variant!=="temporary"&&{borderRight:`1px solid ${(o.vars||o).palette.divider}`},r.anchor==="top"&&r.variant!=="temporary"&&{borderBottom:`1px solid ${(o.vars||o).palette.divider}`},r.anchor==="right"&&r.variant!=="temporary"&&{borderLeft:`1px solid ${(o.vars||o).palette.divider}`},r.anchor==="bottom"&&r.variant!=="temporary"&&{borderTop:`1px solid ${(o.vars||o).palette.divider}`})),Y={left:"right",right:"left",top:"down",bottom:"up"};function Cr(o){return["left","right"].indexOf(o)!==-1}function Lr({direction:o},r){return o==="rtl"&&Cr(r)?Y[r]:r}const Pr=D.forwardRef(function(r,t){const i=S({props:r,name:"MuiDrawer"}),s=tr(),l=er(),c={enter:s.transitions.duration.enteringScreen,exit:s.transitions.duration.leavingScreen},{anchor:d="left",BackdropProps:u,children:g,className:v,elevation:n=16,hideBackdrop:h=!1,ModalProps:{BackdropProps:p}={},onClose:L,open:x=!1,PaperProps:m={},SlideProps:F,TransitionComponent:O=ir,transitionDuration:y=c,variant:j="temporary"}=i,q=I(i.ModalProps,Dr),w=I(i,Ar),B=D.useRef(!1);D.useEffect(()=>{B.current=!0},[]);const Z=Lr({direction:l?"rtl":"ltr"},d),b=a({},i,{anchor:d,elevation:n,open:x,variant:j},w),f=jr(b),T=e.jsx(Rr,a({elevation:j==="temporary"?n:0,square:!0},m,{className:k(f.paper,m.className),ownerState:b,children:g}));if(j==="permanent")return e.jsx(W,a({className:k(f.root,f.docked,v),ownerState:b,ref:t},w,{children:T}));const z=e.jsx(O,a({in:x,direction:Y[Z],timeout:y,appear:B.current},F,{children:T}));return j==="persistent"?e.jsx(W,a({className:k(f.root,f.docked,v),ownerState:b,ref:t},w,{children:z})):e.jsx(wr,a({BackdropProps:a({},u,p,{transitionDuration:y}),className:k(f.root,f.modal,v),open:x,ownerState:b,onClose:L,hideBackdrop:h,ref:t},w,q,{children:z}))}),Nr=Pr,yr=({mobileOpen:o,handleDrawerToggle:r,setMobileOpen:t,user:i})=>{const[s,l]=D.useState(!1),c=ar(),d=()=>{l(!s)},u=()=>{l(!0)},g=()=>{l(!1)},v=()=>e.jsxs(R,{sx:{display:"flex",flexDirection:"column",alignItems:"flex-start",padding:1,rowGap:2,width:110},children:[e.jsx($,{onClick:r,className:`${M.tooltipLink}`,to:"/create-list",children:"New Listing"}),e.jsx($,{onClick:r,className:`${M.tooltipLink}`,to:"/search",children:"Search Listings"}),e.jsx($,{onClick:r,className:`${M.tooltipLink}`,to:"/userListings",children:"Your Listings"})]});return e.jsx(Nr,{variant:"temporary",open:o,onClose:r,ModalProps:{keepMounted:!0},sx:{display:{xs:"block",md:"none"},"& .MuiDrawer-paper":{boxSizing:"border-box",backgroundColor:nr,borderRadius:1,width:{xs:"90%",sm:"50%"}}},children:e.jsxs(R,{ml:2,children:[e.jsxs(E,{onClick:()=>{t(!1),c("/")},variant:"body1",sx:{my:2,cursor:"pointer"},children:["HASANZADEH",e.jsx(E,{variant:"body1",component:"span",color:sr,children:"ESTATE"})]}),e.jsx(br,{}),e.jsx(R,{sx:{display:"flex",flexDirection:"column",gap:1,alignItems:"flex-start",mt:2},children:lr.map((n,h)=>{if(n.name==="Sign in"){if(i===null)return e.jsx(P,{onClick:r,style:({isActive:p})=>({color:p?"blue":N}),to:n.link,className:"Navlink",children:e.jsx(H,{sx:{color:"#334155"},children:n.name})},h)}else if(n.name==="profile"){if(i!==null)return e.jsx(P,{onClick:r,style:({isActive:p})=>({color:p?"blue":N}),to:n.link,className:"Navlink",children:e.jsx("img",{srcSet:i.avatar?i.avatar:cr,alt:i.username,style:{width:"40px",height:"40px",borderRadius:50,objectFit:"cover"}})},h)}else if(n.name==="Listings"){if(i!==null)return e.jsxs(R,{sx:{position:"relative"},children:[e.jsxs(dr,{onClick:d,size:"small",sx:{fontSize:"15px",color:"#334155","&:hover":{borderRadius:1}},children:["LISTINGS",s?e.jsx(vr,{}):e.jsx(ur,{})]}),e.jsx(pr,{show:s,mouseEnter:u,mouseLeave:g,content:e.jsx(v,{}),position:"rigth"})]},h)}else return e.jsx(P,{onClick:r,style:({isActive:p})=>({color:p?"red !important":N}),to:n.link,className:"Navlink",children:e.jsx(H,{sx:{color:"#334155"},children:n.name})},h)})})]})})};export{yr as default};
