import{r as c,u as H,x as J,a1 as W,j as $,t as E,aH as q,aI as A,aJ as g}from"./index-SUBBCwgC.js";const B=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],D={entering:{transform:"none"},entered:{transform:"none"}},G=c.forwardRef(function(l,p){const e=H(),y={enter:e.transitions.duration.enteringScreen,exit:e.transitions.duration.leavingScreen},{addEndListener:f,appear:T=!0,children:s,easing:m,in:x,onEnter:u,onEntered:R,onEntering:L,onExit:h,onExited:P,onExiting:j,style:a,timeout:d=y,TransitionComponent:v=q}=l,w=J(l,B),r=c.useRef(null),Z=W(r,s.ref,p),o=n=>t=>{if(n){const i=r.current;t===void 0?n(i):n(i,t)}},C=o(L),_=o((n,t)=>{A(n);const i=g({style:a,timeout:d,easing:m},{mode:"enter"});n.style.webkitTransition=e.transitions.create("transform",i),n.style.transition=e.transitions.create("transform",i),u&&u(n,t)}),b=o(R),k=o(j),S=o(n=>{const t=g({style:a,timeout:d,easing:m},{mode:"exit"});n.style.webkitTransition=e.transitions.create("transform",t),n.style.transition=e.transitions.create("transform",t),h&&h(n)}),z=o(P),F=n=>{f&&f(r.current,n)};return $.jsx(v,E({appear:T,in:x,nodeRef:r,onEnter:_,onEntered:b,onEntering:C,onExit:S,onExited:z,onExiting:k,addEndListener:F,timeout:d},w,{children:(n,t)=>c.cloneElement(s,E({style:E({transform:"scale(0)",visibility:n==="exited"&&!x?"hidden":void 0},D[n],a,s.props.style),ref:Z},t))}))}),M=G;export{M as Z};