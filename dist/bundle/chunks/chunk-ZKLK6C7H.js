var c=new Map([["File operations",["ls","cat","head","tail","wc","touch","mkdir","rm","cp","mv","ln","chmod","stat","readlink"]],["Text processing",["grep","sed","awk","sort","uniq","cut","tr","tee","diff"]],["Search",["find"]],["Navigation & paths",["pwd","basename","dirname","tree","du"]],["Environment & shell",["echo","printf","env","printenv","export","alias","unalias","history","clear","true","false","bash","sh"]],["Data processing",["xargs","jq","base64","date"]],["Network",["curl","html-to-markdown"]]]);function l(n){let e=[],t=new Set(n);e.push(`Available commands:
`);let s=[];for(let[a,r]of c){let o=r.filter(i=>t.has(i));if(o.length>0){e.push(`  ${a}:`),e.push(`    ${o.join(", ")}
`);for(let i of o)t.delete(i)}}for(let a of t)s.push(a);return s.length>0&&(e.push("  Other:"),e.push(`    ${s.sort().join(", ")}
`)),e.push("Use '<command> --help' for details on a specific command."),`${e.join(`
`)}
`}var d={name:"help",async execute(n,e){if(n.includes("--help")||n.includes("-h"))return{stdout:`help - display available commands

Usage: help [command]

Options:
  -h, --help    Show this help message

If a command name is provided, shows help for that command.
Otherwise, lists all available commands.
`,stderr:"",exitCode:0};if(n.length>0&&e.exec){let s=n[0];return e.exec(`${s} --help`,{cwd:e.cwd})}let t=e.getRegisteredCommands?.()??[];return{stdout:l(t),stderr:"",exitCode:0}}},m={name:"help",flags:[]};export{d as a,m as b};
