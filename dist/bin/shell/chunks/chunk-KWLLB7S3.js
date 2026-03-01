#!/usr/bin/env node
import{a as d}from"./chunk-JBABAK44.js";import{a as l}from"./chunk-4VDEBYW7.js";var g={recursive:{short:"p",long:"parents",type:"boolean"},verbose:{short:"v",long:"verbose",type:"boolean"}},k={name:"mkdir",async execute(f,o){let e=d("mkdir",f,g);if(!e.ok)return e.error;let u=e.result.flags.recursive,m=e.result.flags.verbose,i=e.result.positional;if(i.length===0)return{stdout:"",stderr:`mkdir: missing operand
`,exitCode:1};let a="",t="",c=0;for(let r of i)try{let n=o.fs.resolvePath(o.cwd,r);await o.fs.mkdir(n,{recursive:u}),m&&(a+=`mkdir: created directory '${r}'
`)}catch(n){let s=l(n);s.includes("ENOENT")||s.includes("no such file")?t+=`mkdir: cannot create directory '${r}': No such file or directory
`:s.includes("EEXIST")||s.includes("already exists")?t+=`mkdir: cannot create directory '${r}': File exists
`:t+=`mkdir: cannot create directory '${r}': ${s}
`,c=1}return{stdout:a,stderr:t,exitCode:c}}},v={name:"mkdir",flags:[{flag:"-p",type:"boolean"},{flag:"-v",type:"boolean"}],needsArgs:!0};export{k as a,v as b};
