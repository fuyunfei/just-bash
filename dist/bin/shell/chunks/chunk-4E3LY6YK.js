#!/usr/bin/env node
import{a as m,b as h}from"./chunk-GTNBSMZR.js";var g={name:"ln",summary:"make links between files",usage:"ln [OPTIONS] TARGET LINK_NAME",options:["-s      create a symbolic link instead of a hard link","-f      remove existing destination files","-n      treat LINK_NAME as a normal file if it is a symbolic link to a directory","-v      print name of each linked file","    --help display this help and exit"]},p={name:"ln",async execute(n,s){if(h(n))return m(g);let l=!1,a=!1,f=!1,t=0;for(;t<n.length&&n[t].startsWith("-");){let e=n[t];if(e==="-s"||e==="--symbolic")l=!0,t++;else if(e==="-f"||e==="--force")a=!0,t++;else if(e==="-v"||e==="--verbose")f=!0,t++;else if(e==="-n"||e==="--no-dereference")t++;else if(/^-[sfvn]+$/.test(e))e.includes("s")&&(l=!0),e.includes("f")&&(a=!0),e.includes("v")&&(f=!0),t++;else if(e==="--"){t++;break}else return{stdout:"",stderr:`ln: invalid option -- '${e.slice(1)}'
`,exitCode:1}}let d=n.slice(t);if(d.length<2)return{stdout:"",stderr:`ln: missing file operand
`,exitCode:1};let i=d[0],r=d[1],o=s.fs.resolvePath(s.cwd,r);if(await s.fs.exists(o))if(a)try{await s.fs.rm(o,{force:!0})}catch{return{stdout:"",stderr:`ln: cannot remove '${r}': Permission denied
`,exitCode:1}}else return{stdout:"",stderr:`ln: failed to create ${l?"symbolic ":""}link '${r}': File exists
`,exitCode:1};try{if(l)await s.fs.symlink(i,o);else{let e=s.fs.resolvePath(s.cwd,i);if(!await s.fs.exists(e))return{stdout:"",stderr:`ln: failed to access '${i}': No such file or directory
`,exitCode:1};await s.fs.link(e,o)}}catch(e){let u=e;return u.message.includes("EPERM")?{stdout:"",stderr:`ln: '${i}': hard link not allowed for directory
`,exitCode:1}:{stdout:"",stderr:`ln: ${u.message}
`,exitCode:1}}let c="";return f&&(c=`'${r}' -> '${i}'
`),{stdout:c,stderr:"",exitCode:0}}},b={name:"ln",flags:[{flag:"-s",type:"boolean"},{flag:"-f",type:"boolean"},{flag:"-n",type:"boolean"},{flag:"-v",type:"boolean"}],needsArgs:!0,minArgs:2};export{p as a,b};
