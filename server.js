const express=require('express');
const http=require('http');
const {Server}=require('socket.io');
const path=require('path');
const app=express(); const server=http.createServer(app);const io=new Server(server);
app.use(express.static(path.join(__dirname,'public')));
const rooms=new Map();
const FISH=[{name:'小鯽魚',score:10,weight:45},{name:'河鱸',score:25,weight:30},{name:'彩虹鱒魚',score:60,weight:16},{name:'黃金鯉魚',score:150,weight:7},{name:'傳說湖怪',score:500,weight:2}];
const clean=s=>String(s||'').trim().slice(0,16).replace(/[<>]/g,'');
const code=()=>Math.random().toString(36).slice(2,7).toUpperCase();
function state(r){return {code:r.code,phase:r.phase,endAt:r.endAt,players:[...r.players.values()].map(p=>({id:p.id,name:p.name,score:p.score,catches:p.catches,casting:p.casting,x:p.x,z:p.z,yaw:p.yaw})),host:r.host};}
function emit(r){io.to(r.code).emit('state',state(r));}
function end(r){if(r.timer)clearTimeout(r.timer);r.timer=null;r.phase='finished';r.endAt=0;for(const p of r.players.values())p.casting=false;emit(r);}
function leave(socket){const c=socket.data.room;if(!c)return;socket.leave(c);socket.data.room=null;const r=rooms.get(c);if(!r)return;r.players.delete(socket.id);if(!r.players.size){if(r.timer)clearTimeout(r.timer);rooms.delete(c);return;}if(r.host===socket.id)r.host=r.players.keys().next().value;emit(r);}
io.on('connection',socket=>{
 socket.on('join',({room,name}={},cb=()=>{})=>{leave(socket);name=clean(name)||'釣魚玩家';let c=clean(room).toUpperCase();let r;if(c){r=rooms.get(c);if(!r)return cb({error:'找不到房間，請確認房號'});if(r.players.size>=8)return cb({error:'房間已滿（最多8人）'});if(r.phase!=='lobby')return cb({error:'比賽已開始，請等待下一場'});}else{do{c=code();}while(rooms.has(c));r={code:c,host:socket.id,phase:'lobby',endAt:0,players:new Map(),timer:null};rooms.set(c,r);}r.players.set(socket.id,{id:socket.id,name,score:0,catches:0,casting:false,castTimer:null,x:Math.cos(r.players.size*2.399)*15.5,z:Math.sin(r.players.size*2.399)*15.5,yaw:0,lastMove:Date.now()});socket.data.room=c;socket.join(c);cb({ok:true,code:c,id:socket.id});emit(r);});
 socket.on('start',()=>{const r=rooms.get(socket.data.room);if(!r||r.host!==socket.id||r.phase==='playing')return;for(const p of r.players.values()){p.score=0;p.catches=0;p.casting=false;}r.phase='playing';r.endAt=Date.now()+180000;r.timer=setTimeout(()=>end(r),180000);emit(r);});
 socket.on('cast',()=>{const r=rooms.get(socket.data.room);if(!r||r.phase!=='playing'||Date.now()>=r.endAt)return;const p=r.players.get(socket.id);if(!p||p.casting)return;p.casting=true;emit(r);const delay=2500+Math.random()*4500;p.castTimer=setTimeout(()=>{if(!r.players.has(socket.id)||r.phase!=='playing'||!p.casting)return;const roll=Math.random()*100;let sum=0;const fish=FISH.find(f=>(sum+=f.weight)>roll)||FISH[0];p.casting=false;p.score+=fish.score;p.catches++;socket.emit('caught',fish);io.to(r.code).emit('announcement',{name:p.name,fish:fish.name,score:fish.score});emit(r);},delay);});
 socket.on('move',data=>{const r=rooms.get(socket.data.room);if(!r)return;const p=r.players.get(socket.id);if(!p||!data)return;const x=Number(data.x),z=Number(data.z),yaw=Number(data.yaw);if(![x,z,yaw].every(Number.isFinite))return;const now=Date.now(),dt=Math.min((now-p.lastMove)/1000,0.25);p.lastMove=now;const distance=Math.hypot(x-p.x,z-p.z);if(distance>Math.max(0.7,dt*6.5))return;const radius=Math.hypot(x,z);if(radius<13.9||radius>37)return;p.x=x;p.z=z;p.yaw=yaw;socket.to(r.code).emit('playerMove',{id:p.id,x,z,yaw});});
 socket.on('disconnect',()=>leave(socket));socket.on('leave',()=>leave(socket));
});
server.listen(process.env.PORT||3000,()=>console.log('Fishing Party 3D: http://localhost:'+(process.env.PORT||3000)));
