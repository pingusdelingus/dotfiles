"use strict";var f=Object.defineProperty;var M=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var N=Object.prototype.hasOwnProperty;var F=(e,t)=>{for(var s in t)f(e,s,{get:t[s],enumerable:!0})},D=(e,t,s,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of C(t))!N.call(e,r)&&r!==s&&f(e,r,{get:()=>t[r],enumerable:!(i=M(t,r))||i.enumerable});return e};var b=e=>D(f({},"__esModule",{value:!0}),e);var R={};F(R,{default:()=>J});module.exports=b(R);var a=require("@raycast/api"),w=require("child_process");var u=require("fs");var h=e=>{let t=Math.floor(e/3600),s=String(Math.floor(e%3600/60)).padStart(2,"0"),i=String(Math.floor(e%60)).padStart(2,"0");return`${t===0?"":t+":"}${s}:${i}`};var n=require("@raycast/api"),m=require("fs");var p=e=>{let t=(0,n.getPreferenceValues)();if(e.launchedFromMenuBar||t.closeWindowOnTimerStart){let s=e.isErr?"\u26A0\uFE0F":"\u{1F389}";return(0,n.showHUD)(`${s} ${e.msg}`),(0,n.popToRoot)()}else(0,n.showToast)({style:e.isErr?n.Toast.Style.Failure:n.Toast.Style.Success,title:e.msg})},T=async()=>{let e=n.environment.supportPath+"/ringContinuouslyWarningShown";if(!(0,n.getPreferenceValues)().ringContinuously||(0,m.existsSync)(e))return!0;let s=await(0,n.confirmAlert)({title:"Ring Continuously is enabled!",icon:n.Icon.Bell,message:'When the timer rings, you will need to use the "Stop Running Timer" command or stop the timer in the "Manage Timers" command to dismiss the sound. You can configure this in your Raycast settings.'});return s&&(0,m.writeFileSync)(e,""),s};var V=a.environment.supportPath+"/customTimers.json",j=a.environment.supportPath+"/defaultPresetVisibles.json";var y=(e=!1)=>{let t=(0,a.getPreferenceValues)();return parseFloat(t.volumeSetting)>5?(p({msg:"Timer alert volume should not be louder than 5 (it can get quite loud!)",launchedFromMenuBar:e,isErr:!0}),!1):!0};async function P({timeInSeconds:e,timerName:t="Untitled",launchedFromMenuBar:s=!1,selectedSound:i="default",skipRingContinuouslyWarning:r=!1}){if(!r&&!await T())return;let o=(a.environment.supportPath+"/"+new Date().toISOString()+"---"+e+".timer").replace(/:/g,"__"),c=(0,a.getPreferenceValues)();if(c.ringContinuously){let l=`${o}`.replace(".timer",".dismiss");(0,u.writeFileSync)(l,".dismiss file for Timers")}let d=$(o,t,e,i),O=(0,w.exec)(d,(l,S)=>{if(l){console.log(`error: ${l.message}`);return}if(S){console.log(`stderr: ${S}`);return}}),E={name:t,pid:O.pid,lastPaused:"---",pauseElapsed:0,selectedSound:i==="default"?c.selectedSound:i};(0,u.writeFileSync)(o,JSON.stringify(E)),p({msg:`Timer "${t}" started for ${h(e)}!`,launchedFromMenuBar:s,isErr:!1})}function $(e,t,s,i){let r=(0,a.getPreferenceValues)(),g=`${a.environment.assetsPath+"/"+(i==="default"?r.selectedSound:i)}`,o=[`sleep ${s}`];o.push(`if [ -f "${e}" ]; then osascript -e 'display notification "Timer \\"${t}\\" complete" with title "Ding!"'`);let c=r.selectedSound==="speak_timer_name"?`say ${t}`:`afplay "${g}" --volume ${r.volumeSetting.replace(",",".")}`;if(o.push(c),r.ringContinuously){let d=`${e}`.replace(".timer",".dismiss");o.push(`while [ -f "${d}" ]; do ${c}; done`)}return o.push(`rm "${e}"; else echo "Timer deleted"; fi`),o.join(" ; ")}var J=async()=>{y()&&await P({timeInSeconds:60*15,timerName:"15 Minute Timer"})};
