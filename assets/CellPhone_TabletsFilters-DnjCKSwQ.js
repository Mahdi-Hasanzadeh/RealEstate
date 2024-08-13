function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/ComboBox-DV1VD8Hh.js","assets/index-DUCvUb60.js","assets/index-DDnostVl.css","assets/MenuItem-LcfIaA3a.js","assets/dividerClasses-VuVeZ8BH.js","assets/CheckBoxesGroup-C52GjuqW.js","assets/ArrowDropUpRounded-Dxao7ovy.js","assets/Checkbox-B0XsD31I.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as a,_ as o,ab as t,j as e,ak as V,b6 as B,b7 as C,al as j}from"./index-DUCvUb60.js";const p=a.lazy(()=>o(()=>import("./ComboBox-DV1VD8Hh.js"),__vite__mapDeps([0,1,2,3,4]))),s=a.lazy(()=>o(()=>import("./CheckBoxesGroup-C52GjuqW.js"),__vite__mapDeps([5,1,2,6,7]))),b=({setCellPhoneBrand:r,setCheckedStorage:n,checkedStorage:u,checkedRAM:d,setCheckedRAM:c,checkedColor:h,setCheckedColor:x})=>{const[i,m]=a.useState(t),_=l=>{r(l.target.value),m(l.target.value)};return e.jsxs(e.Fragment,{children:[e.jsx(p,{name:"Brand",value:i,defaultValue:t,handleValueMethod:_,items:V}),e.jsx(a.Suspense,{children:e.jsx(s,{name:"Storage",items:B,handleCheckBoxValue:n,checkedValues:u})}),e.jsx(a.Suspense,{children:e.jsx(s,{name:"RAM",items:C,handleCheckBoxValue:c,checkedValues:d})}),e.jsx(s,{name:"COLOR",items:j,handleCheckBoxValue:x,checkedValues:h,color:!0})]})};export{b as default};
