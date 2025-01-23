function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/ComboBox-C-9VFZvX.js","assets/index-BqzxYTW2.js","assets/index-DDnostVl.css","assets/MenuItem-C2C6rIfk.js","assets/dividerClasses-BcJUJEsf.js","assets/CheckBoxesGroup-D5VAvJL-.js","assets/ArrowDropUpRounded-Z5GYEKYL.js","assets/Checkbox-BlCMxDxF.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r as a,_ as o,aa as t,j as e,ak as V,b6 as B,b7 as C,al as j}from"./index-BqzxYTW2.js";const p=a.lazy(()=>o(()=>import("./ComboBox-C-9VFZvX.js"),__vite__mapDeps([0,1,2,3,4]))),s=a.lazy(()=>o(()=>import("./CheckBoxesGroup-D5VAvJL-.js"),__vite__mapDeps([5,1,2,6,7]))),E=({setCellPhoneBrand:r,setCheckedStorage:n,checkedStorage:u,checkedRAM:d,setCheckedRAM:c,checkedColor:h,setCheckedColor:x})=>{const[i,m]=a.useState(t),_=l=>{r(l.target.value),m(l.target.value)};return e.jsxs(e.Fragment,{children:[e.jsx(p,{name:"Brand",value:i,defaultValue:t,handleValueMethod:_,items:V}),e.jsx(a.Suspense,{children:e.jsx(s,{name:"Storage",items:B,handleCheckBoxValue:n,checkedValues:u})}),e.jsx(a.Suspense,{children:e.jsx(s,{name:"RAM",items:C,handleCheckBoxValue:c,checkedValues:d})}),e.jsx(s,{name:"COLOR",items:j,handleCheckBoxValue:x,checkedValues:h,color:!0})]})};export{E as default};
