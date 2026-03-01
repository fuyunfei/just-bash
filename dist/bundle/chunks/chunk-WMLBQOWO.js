import{a,b as o}from"./chunk-74CEPOFO.js";var l={name:"sleep",summary:"delay for a specified amount of time",usage:"sleep NUMBER[SUFFIX]",description:`Pause for NUMBER seconds. SUFFIX may be:
  s - seconds (default)
  m - minutes
  h - hours
  d - days

NUMBER may be a decimal number.`,options:["    --help display this help and exit"]};function i(t){let s=t.match(/^(\d+\.?\d*)(s|m|h|d)?$/);if(!s)return null;let e=parseFloat(s[1]);switch(s[2]||"s"){case"s":return e*1e3;case"m":return e*60*1e3;case"h":return e*60*60*1e3;case"d":return e*24*60*60*1e3;default:return null}}var d={name:"sleep",async execute(t,s){if(o(t))return a(l);if(t.length===0)return{stdout:"",stderr:`sleep: missing operand
`,exitCode:1};let e=0;for(let n of t){let r=i(n);if(r===null)return{stdout:"",stderr:`sleep: invalid time interval '${n}'
`,exitCode:1};e+=r}return s.sleep?await s.sleep(e):await new Promise(n=>setTimeout(n,e)),{stdout:"",stderr:"",exitCode:0}}},m={name:"sleep",flags:[],needsArgs:!0};export{d as a,m as b};
