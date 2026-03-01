#!/usr/bin/env node
import{a as d}from"./chunk-JBABAK44.js";import{a as g,b as u}from"./chunk-GTNBSMZR.js";var S={name:"stat",summary:"display file or file system status",usage:"stat [OPTION]... FILE...",options:["-c FORMAT   use the specified FORMAT instead of the default","    --help  display this help and exit"]},$={format:{short:"c",type:"string"}},O={name:"stat",async execute(e,a){if(u(e))return g(S);let s=d("stat",e,$);if(!s.ok)return s.error;let l=s.result.flags.format??null,c=s.result.positional;if(c.length===0)return{stdout:"",stderr:`stat: missing operand
`,exitCode:1};let o="",p="",f=!1;for(let n of c){let h=a.fs.resolvePath(a.cwd,n);try{let r=await a.fs.stat(h);if(l){let t=l,i=r.mode.toString(8),y=m(r.mode,r.isDirectory);t=t.replace(/%n/g,n),t=t.replace(/%N/g,`'${n}'`),t=t.replace(/%s/g,String(r.size)),t=t.replace(/%F/g,r.isDirectory?"directory":"regular file"),t=t.replace(/%a/g,i),t=t.replace(/%A/g,y),t=t.replace(/%u/g,"1000"),t=t.replace(/%U/g,"user"),t=t.replace(/%g/g,"1000"),t=t.replace(/%G/g,"group"),o+=`${t}
`}else{let t=r.mode.toString(8).padStart(4,"0"),i=m(r.mode,r.isDirectory);o+=`  File: ${n}
`,o+=`  Size: ${r.size}		Blocks: ${Math.ceil(r.size/512)}
`,o+=`Access: (${t}/${i})
`,o+=`Modify: ${r.mtime.toISOString()}
`}}catch{p+=`stat: cannot stat '${n}': No such file or directory
`,f=!0}}return{stdout:o,stderr:p,exitCode:f?1:0}}};function m(e,a){let s=a?"d":"-",l=[e&256?"r":"-",e&128?"w":"-",e&64?"x":"-",e&32?"r":"-",e&16?"w":"-",e&8?"x":"-",e&4?"r":"-",e&2?"w":"-",e&1?"x":"-"];return s+l.join("")}var w={name:"stat",flags:[{flag:"-c",type:"value",valueHint:"format"},{flag:"-L",type:"boolean"}],needsArgs:!0};export{O as a,w as b};
