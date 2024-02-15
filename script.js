
var bd=document.querySelector('.board');
var allCards;
var msg=document.getElementById('mssg');
var mv=document.getElementById('moves');
var tim=document.getElementById('time');
var items=['🍉','🍋','🍇','🥞','🍓','🍔','🥝','🍟','🍦','🍭','🍌','🍎','🍺','🍒','🥕','🍙','🍊','🍍','🥭','🍏','🍅','🍄','🍕','☃️','🍡','☕','🍧','🍩','🧁','🍰','🍮','🍹','🥤'];
var myItems;
var row=4;
var col=4;
var pick=row*col/2;
var moves;
var time;
var count;
var side=130;
var fntSize="60px";

choose();
function choose()
{
   var cpy=[].concat(items);
   msg.style.display="none";
   pick=row*col/2;
   myItems=[];
   moves=0;
   time=0;
   count=0;
   mv.innerHTML="Total moves : ";
   tim.innerHTML="Total time : ";
   var k=1;
   while(k<=pick)
   {
     var x=Math.floor(Math.random()*cpy.length);
     myItems.push(cpy[x]);
     cpy.splice(x,1);
     k+=1;
   }
   myItems=myItems.concat(myItems);
   shuffle();
}
function shuffle()
{
        for(var j=0;j<pick;j++)
        {
            var x=Math.floor(Math.random()*pick)+pick;
            var t=myItems[x];
            myItems[x]=myItems[j];
            myItems[j]=t;
        }
    createBoard();
}
var cnt=0;
function createBoard()
{
    bd.style.height=row*(side+20)+20+"px";
    bd.style.width=col*(20+side)+"px";
    var k=0;
    for(var i=1;i<=row;i++)
    {
        for(var j=1;j<=col;j++)
        {
           var crd=document.createElement('div');
           crd.classList.add('card');
           var cb=document.createElement('div');
           cb.classList.add('cardBack' , 'card-faces');
           var cf=document.createElement('div');
           cf.classList.add('cardFront', 'card-faces');
           cb.innerHTML=myItems[k];
           cf.innerHTML="?";
           crd.appendChild(cf);
           crd.appendChild(cb);
           bd.appendChild(crd);
           k+=1;
        }
        bd.innerHTML+="<br>";
    }
   allCards=document.querySelectorAll('.card');

   allCards.forEach((car)=>{
    car.style.height=side+"px";
    car.style.width=side+"px";
    car.style.fontSize=fntSize;
   });

   allCards.forEach((car)=>{
    car.addEventListener('click',()=> rotateCard(car) )
   });
}
function rotateCard(car)
{
    var cb=car.querySelector('.cardBack');
    var cf=car.querySelector('.cardFront');
    var rotated=window.getComputedStyle(car).getPropertyValue('--isRotated');
    if(rotated==="no")
    {
        moves+=1;
        t+=1;
        cb.style.transform="rotateY(0deg)";
        cf.style.transform="rotateY(180deg)";
        car.style.setProperty('--isRotated', 'yes');
        checkWin(car);
    }
}
var flip;
var t=0;
function checkWin(car)
{
    if(t==2)
    {
        t=0;
        var flipb=flip.querySelector('.cardBack');
        var cb=car.querySelector('.cardBack');
        var flipf=flip.querySelector('.cardFront');
        var cf=car.querySelector('.cardFront');
        
        if(flipb.innerHTML==cb.innerHTML)
        { 
          count+=2;
          flip.style.visibility="hidden";
          car.style.visibility="hidden";
          if(count==col*row)
            setTimeout(finish,1000);
        }
        else
        {
            setTimeout(letscheck,900);
            function letscheck()
            {
             cb.style.transform="rotateY(180deg)";
             cf.style.transform="rotateY(0deg)"; 
             car.style.setProperty('--isRotated','no');
             flipb.style.transform="rotateY(180deg)";
             flipf.style.transform="rotateY(0deg)"; 
             car.style.setProperty('--isRotated', 'no');

            }
        }
    }
    else{
        flip=car;
    }
}
function finish()
{
   document.getElementById('moves').innerHTML+=moves;
   document.getElementById('time').innerHTML+=time+" sec";
   document.getElementById('mssg').style.display="block";  
}

function showLevels()
{
    var x=document.querySelector('.cnt');
    if(x.style.display=="block")
      x.style.display="none";
    else
      x.style.display="block";

}
function getlvl(l)
{
    var a=document.querySelectorAll('.card');
    a.forEach((car)=>{
        car.remove();
    });
    var br=document.querySelectorAll('br');
    br.forEach((brk)=>{
        brk.remove();
    });
    var lvlType=l.innerHTML;
    if(lvlType=="Easy")
    { 
        row=4;
        col=4;
        side=130;
        fntSize="60px";
    }
    else if(lvlType=="Medium")
     {
        row=5;
        col=6;
        side=100;
        fntSize="55px";
     }
    else
    {
        row=5;
        col=8;
        side=90;
        fntSize="50px";
    }
    choose();
}


setInterval(function (){
    time+=1;
})
