'use strict';
const ParisSchedule = (() => {
  function clock(now=new Date()) {
    const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now).map(x=>[x.type,x.value]));
    return {date:`${p.year}-${p.month}-${p.day}`,minutes:Number(p.hour)*60+Number(p.minute),label:`${p.hour}:${p.minute}`};
  }
  function minute(text){const m=/^(\d{1,2}):(\d{2})/.exec(text||'');return m?Number(m[1])*60+Number(m[2]):null;}
  function state(days,dayIndex,now=new Date()) {
    const c=clock(now),today=days.findIndex(d=>d.date===c.date),day=days[dayIndex];
    let current=-1,next=-1;
    if(day&&day.date===c.date){
      const starts=day.stops.map(s=>minute(s.time));
      next=starts.findIndex(t=>t!==null&&t>c.minutes);
      for(let i=0;i<starts.length;i++)if(starts[i]!==null&&starts[i]<=c.minutes)current=i;
      if(next<0&&current>=0&&c.minutes>=starts[current]+90)current=-1;
    }
    return {...c,today,current,next};
  }
  function initial(days,now=new Date()){const c=clock(now);const i=days.findIndex(d=>d.date>=c.date);return i<0?days.length-1:i;}
  return {clock,minute,state,initial};
})();
if(typeof module!=='undefined')module.exports=ParisSchedule;
