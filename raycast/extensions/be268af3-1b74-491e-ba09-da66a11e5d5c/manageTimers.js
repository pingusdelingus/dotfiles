"use strict";var Z=Object.defineProperty;var Ee=Object.getOwnPropertyDescriptor;var De=Object.getOwnPropertyNames;var Oe=Object.prototype.hasOwnProperty;var Le=(e,t)=>{for(var n in t)Z(e,n,{get:t[n],enumerable:!0})},Re=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of De(t))!Oe.call(e,o)&&o!==n&&Z(e,o,{get:()=>t[o],enumerable:!(r=Ee(t,o))||r.enumerable});return e};var Ae=e=>Re(Z({},"__esModule",{value:!0}),e);var Ue={};Le(Ue,{default:()=>Ie});module.exports=Ae(Ue);var d=require("@raycast/api"),be=require("react");var Q=require("react");var h=require("@raycast/api"),ee=require("child_process"),me=require("crypto"),m=require("fs"),ce=require("path");var R=e=>{let t=Math.floor(e/3600),n=String(Math.floor(e%3600/60)).padStart(2,"0"),r=String(Math.floor(e%60)).padStart(2,"0");return`${t===0?"":t+":"}${n}:${r}`},ie=e=>{let t=new Date(e),n=[t.getFullYear().toString(),(t.getMonth()+1).toString().padStart(2,"0"),t.getDate().toString().padStart(2,"0")],r=[t.getHours(),t.getMinutes(),t.getSeconds()].map(s=>s.toString().padStart(2,"0")),o=n.join("-"),l=r.join(":");return`${o} ${l}`},$=e=>(e.d1=e.d1=="----"?void 0:e.d1,e.d2=e.d2=="----"?void 0:e.d2,Math.round((e.d1?new Date(e.d1):new Date).getTime()-(e.d2?new Date(e.d2):new Date).getTime())/1e3);var f=require("@raycast/api"),j=require("fs");var J=e=>{let t=(0,f.getPreferenceValues)();if(e.launchedFromMenuBar||t.closeWindowOnTimerStart){let n=e.isErr?"\u26A0\uFE0F":"\u{1F389}";return(0,f.showHUD)(`${n} ${e.msg}`),(0,f.popToRoot)()}else(0,f.showToast)({style:e.isErr?f.Toast.Style.Failure:f.Toast.Style.Success,title:e.msg})},se=async()=>{let e=f.environment.supportPath+"/ringContinuouslyWarningShown";if(!(0,f.getPreferenceValues)().ringContinuously||(0,j.existsSync)(e))return!0;let n=await(0,f.confirmAlert)({title:"Ring Continuously is enabled!",icon:f.Icon.Bell,message:'When the timer rings, you will need to use the "Stop Running Timer" command or stop the timer in the "Manage Timers" command to dismiss the sound. You can configure this in your Raycast settings.'});return n&&(0,j.writeFileSync)(e,""),n};var ue=require("process"),y=h.environment.supportPath+"/customTimers.json",qe=h.environment.supportPath+"/defaultPresetVisibles.json",ae=e=>{try{(0,m.unlinkSync)(e)}catch(t){if(t instanceof Error&&!t.message.includes("ENOENT"))throw t}},x=(e=!1)=>{let t=(0,h.getPreferenceValues)();return parseFloat(t.volumeSetting)>5?(J({msg:"Timer alert volume should not be louder than 5 (it can get quite loud!)",launchedFromMenuBar:e,isErr:!0}),!1):!0};async function D({timeInSeconds:e,timerName:t="Untitled",launchedFromMenuBar:n=!1,selectedSound:r="default",skipRingContinuouslyWarning:o=!1}){if(!o&&!await se())return;let s=(h.environment.supportPath+"/"+new Date().toISOString()+"---"+e+".timer").replace(/:/g,"__"),c=(0,h.getPreferenceValues)();if(c.ringContinuously){let E=`${s}`.replace(".timer",".dismiss");(0,m.writeFileSync)(E,".dismiss file for Timers")}let v=le(s,t,e,r),M=(0,ee.exec)(v,(E,k)=>{if(E){console.log(`error: ${E.message}`);return}if(k){console.log(`stderr: ${k}`);return}}),_={name:t,pid:M.pid,lastPaused:"---",pauseElapsed:0,selectedSound:r==="default"?c.selectedSound:r};(0,m.writeFileSync)(s,JSON.stringify(_)),J({msg:`Timer "${t}" started for ${R(e)}!`,launchedFromMenuBar:n,isErr:!1})}function le(e,t,n,r){let o=(0,h.getPreferenceValues)(),l=`${h.environment.assetsPath+"/"+(r==="default"?o.selectedSound:r)}`,s=[`sleep ${n}`];s.push(`if [ -f "${e}" ]; then osascript -e 'display notification "Timer \\"${t}\\" complete" with title "Ding!"'`);let c=o.selectedSound==="speak_timer_name"?`say ${t}`:`afplay "${l}" --volume ${o.volumeSetting.replace(",",".")}`;if(s.push(c),o.ringContinuously){let v=`${e}`.replace(".timer",".dismiss");s.push(`while [ -f "${v}" ]; do ${c}; done`)}return s.push(`rm "${e}"; else echo "Timer deleted"; fi`),s.join(" ; ")}function de(e){let t=h.environment.supportPath+"/"+e,n=t.replace(".timer",".dismiss");ae(t),ae(n)}function pe(e,t){let n=h.environment.supportPath+"/"+e;(0,ue.kill)(t);let r=(0,m.readFileSync)(n).toString(),o=JSON.parse(r);o.pid=void 0,o.lastPaused=new Date,(0,m.writeFileSync)(n,JSON.stringify(o))}function fe(e){let t=h.environment.supportPath+"/"+e.originalFile,n=le(t,e.name,e.timeLeft,e.selectedSound),r=(0,ee.exec)(n),o=(0,m.readFileSync)(t).toString(),l=JSON.parse(o);l.pauseElapsed=l.pauseElapsed+$({d2:e.lastPaused}),l.lastPaused="---",l.pid=r.pid,(0,m.writeFileSync)(t,JSON.stringify(l))}function he(){let e=[];return(0,m.readdirSync)(h.environment.supportPath).forEach(n=>{if((0,ce.extname)(n)==".timer"){let r={name:"",secondsSet:-99,timeLeft:-99,originalFile:n,timeEnds:new Date,pid:void 0,lastPaused:"---",pauseElapsed:0,selectedSound:"default"},o=(0,m.readFileSync)(h.environment.supportPath+"/"+n).toString();try{let c=JSON.parse(o);r.name=c.name,r.pid=c.pid,r.lastPaused=c.lastPaused,r.pauseElapsed=c.pauseElapsed,r.selectedSound=c.selectedSound}catch(c){if(!(c instanceof SyntaxError))throw c;r.name=o}let l=n.split("---");r.secondsSet=Number(l[1].split(".")[0]);let s=l[0].replace(/__/g,":");r.timeEnds=new Date(s),r.timeEnds.setSeconds(r.timeEnds.getSeconds()+r.secondsSet+r.pauseElapsed),r.timeLeft=Math.max(0,Math.round(r.pid===void 0?r.secondsSet-$({d1:r.lastPaused==="---"?void 0:r.lastPaused,d2:new Date(s)})+r.pauseElapsed:$({d1:r.timeEnds}))),e.push(r)}}),e.sort((n,r)=>n.timeLeft-r.timeLeft),e}function Se(e,t){let n=h.environment.supportPath+"/"+e,r=(0,m.readFileSync)(n).toString(),o=JSON.parse(r);o.name=t,(0,m.writeFileSync)(n,JSON.stringify(o))}function b(){(0,m.existsSync)(y)||(0,m.writeFileSync)(y,JSON.stringify({}))}function G(e){b();let t=JSON.parse((0,m.readFileSync)(y,"utf8"));t[(0,me.randomUUID)()]=e,(0,m.writeFileSync)(y,JSON.stringify(t))}function q(){b();let e=JSON.parse((0,m.readFileSync)(y,"utf8"));return Object.fromEntries(Object.entries(e).map(([t,n])=>n.showInMenuBar===void 0?[t,{...n,showInMenuBar:!0}]:[t,n]))}function ge(e,t){b();let n=JSON.parse((0,m.readFileSync)(y,"utf8"));n[e].name=t,(0,m.writeFileSync)(y,JSON.stringify(n))}function Te(e){b();let t=JSON.parse((0,m.readFileSync)(y,"utf8"));delete t[e],(0,m.writeFileSync)(y,JSON.stringify(t))}function we(e){b();let t=JSON.parse((0,m.readFileSync)(y,"utf8")),n=t[e].showInMenuBar;t[e].showInMenuBar=n===void 0?!1:!n,(0,m.writeFileSync)(y,JSON.stringify(t))}var g=require("@raycast/api");function A(){let[e,t]=(0,Q.useState)(void 0),[n,r]=(0,Q.useState)({}),[o,l]=(0,Q.useState)(e===void 0),s=()=>{b();let a=he();t(a);let C=q();r(C),l(!1)};return{timers:e,customTimers:n,isLoading:o,refreshTimers:s,handleStartTimer:a=>{x(a.launchedFromMenuBar)&&(D(a),s())},handlePauseTimer:a=>{if(a.pid==null&&a.lastPaused==="---")return(0,g.showToast)({style:g.Toast.Style.Failure,title:"This timer does not support pausing. Try restarting it to enable pausing."});pe(a.originalFile,a.pid),s()},handleUnpauseTimer:a=>{if(a.pid==null&&a.lastPaused==="---")return(0,g.showToast)({style:g.Toast.Style.Failure,title:"This timer does not support pausing. Try restarting it to enable pausing."});fe(a),s()},handleStopTimer:a=>{t(e?.filter(C=>C.originalFile!==a.originalFile)),de(a.originalFile),s()},handleStartCT:({customTimer:a,launchedFromMenuBar:C})=>{x(C)&&(D({timeInSeconds:a.timeInSeconds,launchedFromMenuBar:C,timerName:a.name,selectedSound:a.selectedSound}),s())},handleCreateCT:a=>{let C={name:a.name,timeInSeconds:a.secondsSet,selectedSound:"default",showInMenuBar:!0};G(C),s()},handleDeleteCT:async a=>{let C={title:"Delete this preset?",icon:g.Icon.Trash,message:"You won't be able to recover it.",dismissAction:{title:"Cancel",style:g.Alert.ActionStyle.Cancel},primaryAction:{title:"Delete",style:g.Alert.ActionStyle.Destructive}};await(0,g.confirmAlert)(C)&&(Te(a),s())},handleToggleCTVisibility:async a=>{we(a),s()}}}var p=require("@raycast/api"),z=require("react");var O=require("@raycast/api"),Ce=[{title:"Alarm Clock",icon:O.Icon.Alarm,value:"alarmClock.wav"},{title:"Dismembered Woodpecker",icon:O.Icon.Bird,value:"dismemberedWoodpecker.wav"},{title:"Flute Riff",icon:O.Icon.Music,value:"fluteRiff.wav"},{title:"Level Up",icon:O.Icon.Trophy,value:"levelUp.wav"},{title:"Piano Chime",icon:O.Icon.Music,value:"pianoChime.wav"},{title:"Terminator",icon:O.Icon.BarCode,value:"terminator.wav"},{title:"Speak Timer Name",icon:O.Icon.Person,value:"speak_timer_name"}];var P=require("react/jsx-runtime");function te(e){let t=Object.values(e.arguments).some(i=>i!==""),[n,r]=(0,z.useState)(),[o,l]=(0,z.useState)(),[s,c]=(0,z.useState)(),{pop:v}=(0,p.useNavigation)(),M=(0,p.getPreferenceValues)();if(t&&M.customTimerFormBypass){let[i,S,W]=["hours","minutes","seconds"].map(Y=>e.arguments[Y]).map(Number).map(Y=>Number.isNaN(Y)?0:Y);return D({timeInSeconds:3600*i+60*S+W}),null}let _=i=>{if(b(),i.hours===""&&i.minutes===""&&i.seconds==="")new p.Toast({style:p.Toast.Style.Failure,title:"No values set for timer length!"}).show();else if(isNaN(Number(i.hours)))r("Hours must be a number!");else if(isNaN(Number(i.minutes)))l("Minutes must be a number!");else if(isNaN(Number(i.seconds)))c("Seconds must be a number!");else{if(!x())return;let S=i.name?i.name:"Untitled",W=3600*Number(i.hours)+60*Number(i.minutes)+Number(i.seconds);D({timeInSeconds:W,timerName:S,selectedSound:i.selectedSound}).then(()=>v()),i.willBeSaved&&G({name:i.name,timeInSeconds:W,selectedSound:i.selectedSound,showInMenuBar:!0})}},E=()=>{n&&n.length>0&&r(void 0)},k=()=>{o&&o.length>0&&l(void 0)},K=()=>{s&&s.length>0&&c(void 0)},X=[{id:"hours",title:"Hours",placeholder:"0",err:n,drop:E,validator:i=>{let S=i.target.value;isNaN(Number(S))?r("Hours must be a number!"):E()}},{id:"minutes",title:"Minutes",placeholder:"00",err:o,drop:k,validator:i=>{let S=i.target.value;isNaN(Number(S))?l("Minutes must be a number!"):k()}},{id:"seconds",title:"Seconds",placeholder:"00",err:s,drop:K,validator:i=>{let S=i.target.value;isNaN(Number(S))?c("Seconds must be a number!"):K()}}];return M.newTimerInputOrder!=="hhmmss"&&X.reverse(),(0,P.jsxs)(p.Form,{actions:(0,P.jsx)(p.ActionPanel,{children:(0,P.jsx)(p.Action.SubmitForm,{title:"Start Custom Timer",onSubmit:i=>_(i)})}),children:[X.map((i,S)=>(0,P.jsx)(p.Form.TextField,{id:i.id,title:i.title,placeholder:i.placeholder,defaultValue:e.arguments[i.id],error:i.err,onChange:i.drop,onBlur:i.validator},S)),(0,P.jsxs)(p.Form.Dropdown,{id:"selectedSound",defaultValue:"default",title:"Sound",children:[(0,P.jsx)(p.Form.Dropdown.Item,{value:"default",title:"Default"}),Ce.map((i,S)=>(0,P.jsx)(p.Form.Dropdown.Item,{title:i.value===M.selectedSound?`${i.title} (currently selected)`:i.title,value:i.value,icon:i.icon},S))]}),(0,P.jsx)(p.Form.TextField,{id:"name",title:"Name",placeholder:"Pour Tea",autoFocus:t}),(0,P.jsx)(p.Form.Checkbox,{id:"willBeSaved",label:"Save as preset"})]})}var u=require("@raycast/api");var V=require("@raycast/api");var T=require("@raycast/api");var ye=require("@raycast/api");var I=require("fs");var B=ye.environment.supportPath+"/raycast-stopwatches.json",ve=()=>{(!(0,I.existsSync)(B)||(0,I.readFileSync)(B).toString()=="")&&(0,I.writeFileSync)(B,"[]")};var Pe=(e,t)=>{ve();let r=JSON.parse((0,I.readFileSync)(B,"utf8")).map(o=>o.swID==e?{...o,name:t}:o);(0,I.writeFileSync)(B,JSON.stringify(r))};var U=require("react/jsx-runtime");function Ne(e){let{pop:t}=(0,T.useNavigation)(),n=r=>{if(r===""||r===e.currentName)new T.Toast({style:T.Toast.Style.Failure,title:"No new name given!"}).show();else{switch(t(),e.originalFile){case"customTimer":ge(e.ctID?e.ctID:"-99",r);break;case"stopwatch":Pe(e.ctID?e.ctID:"-99",r);break;default:Se(e.originalFile,r);break}J({msg:`Renamed to ${r}!`,launchedFromMenuBar:!1,isErr:!1})}};return(0,U.jsx)(T.Form,{actions:(0,U.jsx)(T.ActionPanel,{children:(0,U.jsx)(T.Action.SubmitForm,{title:"Rename",onSubmit:r=>n(r.newName)})}),children:(0,U.jsx)(T.Form.TextField,{id:"newName",title:"New name",placeholder:e.currentName})})}var ne=require("react/jsx-runtime");function H(e){let{push:t}=(0,V.useNavigation)();return(0,ne.jsx)(V.Action,{title:`Rename ${e.renameLabel}`,icon:V.Icon.TextInput,onAction:()=>t((0,ne.jsx)(Ne,{currentName:e.currentName,originalFile:e.originalFile,ctID:e.ctID}))})}var F=require("react/jsx-runtime"),Me={tag:{value:"Paused",color:u.Color.Red}},ke={source:u.Icon.Clock,tintColor:u.Color.Red},Je={source:u.Icon.Clock,tintColor:u.Color.Yellow},Ve={tag:{value:"Running",color:u.Color.Yellow}},$e={source:u.Icon.Clock,tintColor:u.Color.Green},xe={tag:{value:"Finished!",color:u.Color.Green}};function re({timer:e}){let{handlePauseTimer:t,handleUnpauseTimer:n,handleStopTimer:r,handleCreateCT:o}=A();return(0,F.jsx)(u.List.Item,{icon:e.timeLeft===0?$e:e.lastPaused!=="---"?ke:Je,title:e.name,subtitle:R(e.timeLeft)+" left",accessories:[{text:R(e.secondsSet)+" originally"},{text:`${e.timeLeft===0?"Ended":"Ends"} at ${ie(e.timeEnds)}`},e.timeLeft===0?xe:e.lastPaused!=="---"?Me:Ve],actions:(0,F.jsxs)(u.ActionPanel,{children:[e.timeLeft===0?(0,F.jsx)(u.Action,{title:"Stop Timer",icon:u.Icon.Stop,onAction:()=>r(e)}):(0,F.jsx)(u.Action,{title:(e.lastPaused!=="---"?"Unpause":"Pause")+" Timer",icon:u.Icon.Pause,onAction:e.lastPaused!=="---"?()=>n(e):()=>t(e)}),(0,F.jsx)(H,{renameLabel:"Timer",currentName:e.name,originalFile:e.originalFile,ctID:null}),(0,F.jsx)(u.Action,{title:"Stop Timer",icon:u.Icon.Stop,shortcut:{modifiers:["ctrl"],key:"x"},onAction:()=>r(e)}),(0,F.jsx)(u.Action,{title:"Save Timer as Preset",icon:u.Icon.SaveDocument,shortcut:{modifiers:["cmd","shift"],key:"enter"},onAction:()=>o(e)})]})})}var w=require("@raycast/api");var L=require("react/jsx-runtime"),Be=e=>`raycast://extensions/ThatNerd/timers/manageTimers?context=${encodeURIComponent(JSON.stringify({timerID:e}))}`;function oe(e){let{handleStartCT:t,handleDeleteCT:n}=A();return(0,L.jsx)(w.List.Item,{icon:w.Icon.Clock,title:e.customTimer.name,subtitle:R(e.customTimer.timeInSeconds),actions:(0,L.jsxs)(w.ActionPanel,{children:[(0,L.jsx)(w.Action,{title:"Start Timer",icon:w.Icon.Hourglass,onAction:()=>t({customTimer:e.customTimer})}),(0,L.jsx)(H,{renameLabel:"Timer",currentName:e.customTimer.name,originalFile:"customTimer",ctID:e.id}),(0,L.jsx)(w.Action,{title:"Delete Custom Timer",icon:w.Icon.Trash,shortcut:{modifiers:["ctrl"],key:"x"},onAction:()=>n(e.id)}),(0,L.jsx)(w.Action.CreateQuicklink,{quicklink:{name:e.customTimer.name,link:Be(e.id)},title:"Add Preset to Root Search"})]})})}var N=require("react/jsx-runtime");function Ie(e){if(e.launchContext?.timerID){let c=q()[e.launchContext.timerID];if(c==null)(0,d.showToast)({style:d.Toast.Style.Failure,title:"This custom timer no longer exists!"});else{D({timeInSeconds:c.timeInSeconds,timerName:c.name,selectedSound:c.selectedSound}).then(()=>(0,d.popToRoot)());return}}let{timers:t,customTimers:n,isLoading:r,refreshTimers:o}=A(),{push:l}=(0,d.useNavigation)();return(0,be.useEffect)(()=>{o(),setInterval(()=>{o()},1e3)},[]),(0,N.jsxs)(d.List,{isLoading:r,children:[(0,N.jsxs)(d.List.Section,{title:t?.length!==0&&t!=null?"Currently Running":"No Timers Running",children:[t?.map(s=>(0,N.jsx)(re,{timer:s},s.originalFile)),(0,N.jsx)(d.List.Item,{icon:d.Icon.Clock,title:"Create a new timer",subtitle:"Press Enter to start a timer",actions:(0,N.jsx)(d.ActionPanel,{children:(0,N.jsx)(d.Action,{title:"Start Timer",icon:d.Icon.Hourglass,onAction:()=>l((0,N.jsx)(te,{arguments:{hours:"",minutes:"",seconds:""}}))})})},0)]}),(0,N.jsx)(d.List.Section,{title:"Custom Timers",children:Object.keys(n)?.sort((s,c)=>n[s].timeInSeconds-n[c].timeInSeconds).map(s=>(0,N.jsx)(oe,{customTimer:n[s],id:s},s))})]})}
