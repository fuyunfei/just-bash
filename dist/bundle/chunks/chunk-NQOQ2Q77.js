async function c(t,s){if(t.length>0&&t[0]!=="-"){let i=t[0].startsWith("/")?t[0]:`${s.cwd}/${t[0]}`;try{let n=(await s.fs.readFile(i)).split(`
`);n[n.length-1]===""&&n.pop();let r=n.reverse();return{stdout:r.length>0?`${r.join(`
`)}
`:"",stderr:"",exitCode:0}}catch{return{stdout:"",stderr:`tac: ${t[0]}: No such file or directory
`,exitCode:1}}}let e=s.stdin.split(`
`);e[e.length-1]===""&&e.pop();let o=e.reverse();return{stdout:o.length>0?`${o.join(`
`)}
`:"",stderr:"",exitCode:0}}var l={name:"tac",execute:c},u={name:"tac",flags:[],stdinType:"text",needsFiles:!0};export{l as a,u as b};
