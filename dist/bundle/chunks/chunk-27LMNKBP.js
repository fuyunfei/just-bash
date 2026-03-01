import{a as u}from"./chunk-HWKDQ44K.js";import{a as m}from"./chunk-44UOCSGV.js";var d={recursive:{short:"r",long:"recursive",type:"boolean"},recursiveUpper:{short:"R",type:"boolean"},force:{short:"f",long:"force",type:"boolean"},verbose:{short:"v",long:"verbose",type:"boolean"}},b={name:"rm",async execute(p,s){let e=u("rm",p,d);if(!e.ok)return e.error;let c=e.result.flags.recursive||e.result.flags.recursiveUpper,a=e.result.flags.force,g=e.result.flags.verbose,i=e.result.positional;if(i.length===0)return a?{stdout:"",stderr:"",exitCode:0}:{stdout:"",stderr:`rm: missing operand
`,exitCode:1};let f="",t="",l=0;for(let r of i)try{let n=s.fs.resolvePath(s.cwd,r);if((await s.fs.stat(n)).isDirectory&&!c){t+=`rm: cannot remove '${r}': Is a directory
`,l=1;continue}await s.fs.rm(n,{recursive:c,force:a}),g&&(f+=`removed '${r}'
`)}catch(n){if(!a){let o=m(n);o.includes("ENOENT")||o.includes("no such file")?t+=`rm: cannot remove '${r}': No such file or directory
`:o.includes("ENOTEMPTY")||o.includes("not empty")?t+=`rm: cannot remove '${r}': Directory not empty
`:t+=`rm: cannot remove '${r}': ${o}
`,l=1}}return{stdout:f,stderr:t,exitCode:l}}},h={name:"rm",flags:[{flag:"-r",type:"boolean"},{flag:"-R",type:"boolean"},{flag:"-f",type:"boolean"},{flag:"-v",type:"boolean"}],needsArgs:!0};export{b as a,h as b};
