// 캔버스 설정
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height =600;


var img = new Image()
img.crossOrigin="anonymous";
img.src = "3.jpg";
img.onload = function(){
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
}

let circle_color ="black";  
let edge = "30";

// 이전으로 돌리기 // 빈배열을 만든다.
let restore_array =[];
let index = -1;

let drawing = false;
const mouse = {
    x : null,   
    y : null
}
8
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

class Root {
    constructor(x,y,color,centerX, centerY){
        this.x = x;
        this.y = y;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.centerX = centerX;
        this.centerY = centerY;
    }
    draw(){
        this.speedX += (Math.random()) /2// -0.25 ~0.25
        this.speedY += (Math.random()) /2; // -0.25 ~0.25
        this.x += this.speedX;
        this.y += this.speedY;

        const distanceX = this.x - this.centerX;
        const distanceY = this.y - this.centerY;
        const distance = Math.sqrt(distanceX * distanceX + 
            distanceY * distanceY);
        const radius = (-distance / edge + 1) * edge/ 10 ;

        if (radius > 0) {
            requestAnimationFrame(this.draw.bind(this));
            ctx.beginPath();
            ctx.arc(this.x,this.y,radius,0,2*Math.PI);
            ctx.globalAlpha = 0.05;
            ctx.fillStyle = circle_color;
            ctx.fill();
            
            
        }
    }
}

function branchOut(){
    if(drawing === true){
        const centerX = mouse.x;
        const centerY = mouse.y;
        for(let i=0; i<3; i++){
            const root = new Root(mouse.x, mouse.y,circle_color, centerX,
            centerY);
            root.draw();
        }
    }
}

// 컬러변경
function change_color(element){
    circle_color = element.style.background;
}

window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mousemove',function(){
    //ctx.fillStyle = 'rgba(255,255,255,0.03)';
    //ctx.fillRect(0,0,canvas.width,canvas.height);
    branchOut();
});

window.addEventListener('mousedown',function(){
    drawing = true;
});

window.addEventListener('mouseup', function(){
    drawing = false;
});


//저장하기
function save(){
    canvas.toBlob((blob)=>{

        const a = document.createElement('a');
        document.body.append(a);
        a.download ='export{timestamp}.png';
        a.href= URL.createObjectURL(blob);
        a.click();
        a.remove();
    });
}