function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/ComboBox-DBNP-To5.js","assets/index-p3PlTnYA.js","assets/index-DDnostVl.css","assets/MenuItem-j5iUMbbZ.js","assets/dividerClasses-BFMbsLIr.js","assets/CheckBoxesGroup-D87ej3Pv.js","assets/ArrowDropUpRounded-BUIJb4kx.js","assets/Checkbox-4Ys7AK5i.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as a,_ as o,aa as t,j as e,ak as V,b6 as B,b7 as C,al as j}from"./index-p3PlTnYA.js";const p=a.lazy(()=>o(()=>import("./ComboBox-DBNP-To5.js"),__vite__mapDeps([0,1,2,3,4]))),s=a.lazy(()=>o(()=>import("./CheckBoxesGroup-D87ej3Pv.js"),__vite__mapDeps([5,1,2,6,7]))),E=({setCellPhoneBrand:r,setCheckedStorage:n,checkedStorage:u,checkedRAM:d,setCheckedRAM:c,checkedColor:h,setCheckedColor:x})=>{const[i,m]=a.useState(t),_=l=>{r(l.target.value),m(l.target.value)};return e.jsxs(e.Fragment,{children:[e.jsx(p,{name:"Brand",value:i,defaultValue:t,handleValueMethod:_,items:V}),e.jsx(a.Suspense,{children:e.jsx(s,{name:"Storage",items:B,handleCheckBoxValue:n,checkedValues:u})}),e.jsx(a.Suspense,{children:e.jsx(s,{name:"RAM",items:C,handleCheckBoxValue:c,checkedValues:d})}),e.jsx(s,{name:"COLOR",items:j,handleCheckBoxValue:x,checkedValues:h,color:!0})]})};export{E as default};
