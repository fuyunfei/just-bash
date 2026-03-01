import{a as c}from"./chunk-OJDRYQWQ.js";var C={name:"time",async execute(i,r){let a="%e %M",o=null,d=!1,m=!1,t=0;for(;t<i.length;){let e=i[t];if(e==="-f"||e==="--format"){if(t++,t>=i.length)return{stdout:"",stderr:`time: missing argument to '-f'
`,exitCode:1};a=i[t],t++}else if(e==="-o"||e==="--output"){if(t++,t>=i.length)return{stdout:"",stderr:`time: missing argument to '-o'
`,exitCode:1};o=i[t],t++}else if(e==="-a"||e==="--append")d=!0,t++;else if(e==="-v"||e==="--verbose")a=`Command being timed: %C
Elapsed (wall clock) time: %e seconds
Maximum resident set size (kbytes): %M`,t++;else if(e==="-p"||e==="--portability")m=!0,t++;else if(e==="--"){t++;break}else if(e.startsWith("-"))t++;else break}let f=i.slice(t);if(f.length===0)return{stdout:"",stderr:"",exitCode:0};let p=performance.now(),u=f.join(" "),s;try{if(!r.exec)return{stdout:"",stderr:`time: exec not available
`,exitCode:1};s=await r.exec(u,{env:c(r.env),cwd:r.cwd})}catch(e){s={stdout:"",stderr:`time: ${e.message}
`,exitCode:127}}let l=(performance.now()-p)/1e3,n;if(m?n=`real ${l.toFixed(2)}
user 0.00
sys 0.00
`:(n=a.replace(/%e/g,l.toFixed(2)).replace(/%E/g,w(l)).replace(/%M/g,"0").replace(/%S/g,"0.00").replace(/%U/g,"0.00").replace(/%P/g,"0%").replace(/%C/g,u),n.endsWith(`
`)||(n+=`
`)),o)try{let e=r.fs.resolvePath(r.cwd,o);if(d&&await r.fs.exists(e)){let g=await r.fs.readFile(e);await r.fs.writeFile(e,g+n)}else await r.fs.writeFile(e,n)}catch(e){return{stdout:s.stdout,stderr:s.stderr+`time: cannot write to '${o}': ${e.message}
`,exitCode:s.exitCode}}else s={...s,stderr:s.stderr+n};return s}};function w(i){let r=Math.floor(i/3600),a=Math.floor(i%3600/60),o=i%60;return r>0?`${r}:${a.toString().padStart(2,"0")}:${o.toFixed(2).padStart(5,"0")}`:`${a}:${o.toFixed(2).padStart(5,"0")}`}var F={name:"time",flags:[{flag:"-p",type:"boolean"}],needsArgs:!0};export{C as a,F as b};
