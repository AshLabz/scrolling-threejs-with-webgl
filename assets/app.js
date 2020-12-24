import Sketch from './module';
import gsap from 'gsap';

let sketch =  new Sketch({
    dom: document.getElementById('container')
})

let speed = 0;
let position = 0;
let attractMode = false;
let attractTo = 0;
let rounded  = 0;
let block = document.getElementById('block');
let wrap = document.getElementById('wrap');
let eles = [...document.querySelectorAll('.n')];

document.getElementsByTagName("body")[0].addEventListener("mousemove", function(n) {
    e.style.left = n.clientX + "px",
        e.style.top = n.clientY + "px"
});
let e = document.getElementById("js-pointer");

window.addEventListener('wheel', function (e) {
    if (loader) {
        return false;
    }
    speed += e.deltaY*0.0003;

});

let objs = Array(4).fill({dist:0})
let currentElement;
position = 3;
speed = 0.09;
let loader = true;
function raf () {
    if (loader) {
        gsap.to(rots, {
            duration: 0.3,
            x:-0.5,
            y:0,
            z:0,
        })
        position -= speed;

        if (position < -0.3) {
            position = -0.3;
            speed = 0;
            loader = false;
            gsap.to(rots, {
                duration: 1,
                x:-0.2,
                y:-0.3,
                z:-0.1,
            });
            gsap.to(scene, {
                duration: 1,
                x:0.6,
            });
        }
        speed -= 0.001;
    } else {
        position += speed;
        if (position < 0) {
            position += Math.abs(speed)*0.9;
        } else if(position > 3){
            position -= speed*0.9;
        }
        speed *= 0.8;
    }
    objs.forEach((o,i)=>{
        o.dist = Math.min(Math.abs(position - i), 1)
        o.dist = 1 - o.dist**2;
        eles[i].style.transform = `scale(${1 + .2*o.dist})`;
        eles[i].style.opacity = 0.8*o.dist;
        eles[i].classList.remove('new1','new0');
        eles[i].classList.add('new'+Math.round(o.dist));
let scale = 1 + .08*o.dist;
currentElement = eles[i];
        sketch.meshes[i].position.y = -(i*1.5 - position*1.5);
        sketch.meshes[i].scale.set(scale, scale, scale);
        sketch.meshes[i].material.uniforms.distanceFromCenter.value = o.dist;

    });
    // document.querySelector('#container').style.background = currentElement.querySelector('img').getAttribute('data-bg');
    rounded  = Math.round(position);
    let diff = (rounded - position);
    if (attractMode) {
        position += -(position - attractTo)*0.05;
        wrap.style.transform = `translate(0, ${-position*250 }px)`;
    } else {
        position += Math.sign(diff)*Math.pow(Math.abs(diff), 0.7)*0.015;
        wrap.style.transform = `translate(0, ${-position*250 }px)`;
    }
    document.querySelectorAll('.title').forEach(el=>{
        el.classList.remove('active');
    })
    document.querySelector('.title' + rounded).classList.add('active');

    document.querySelector('#container').style.background = document.querySelector('.new1 img').getAttribute('data-bg');
    // block.style.transform = `translate(0, ${position*100 + 50}px)`;
    window.requestAnimationFrame(raf)
}

raf();
let titlePos = Math.round(position);
setInterval(function () {
if (Math.round(position) != titlePos) {
    titlePos = Math.round(position);
    let ele = document.querySelector('.active');
    gsap.to(ele, {
        duration: 0.5,
        x:2,
        opacity:1
    });
}
}, 500)
let navs = [...document.querySelectorAll('li')];
let nav = document.querySelector('.nav');

let rots = sketch.groups.map(e=>e.rotation);
let scene = sketch.scene.position;
nav.addEventListener('mouseenter', function () {
    attractMode = true;
    gsap.to(rots, {
        duration: 0.3,
        x:-0.5,
        y:0,
        z:0,
    });
    gsap.to(scene, {
        duration: 0.3,
        x:0,
    });
});

nav.addEventListener('mouseleave', function () {
    attractMode = false;
    gsap.to(rots, {
        duration: 0.3,
        x:-0.2,
        y:-0.3,
        z:-0.1,
    });
    gsap.to(scene, {
        duration: 0.3,
        x:0.6,
    });
});

navs.forEach(el => {
    el.addEventListener('mouseover', (e)=>{
        attractTo = Number(e.target.getAttribute('data-nav'));
        document.querySelector('#js-pointer').classList.add('pointer-active');
    });

    el.addEventListener('mouseleave', (el)=>{
        document.querySelector('#js-pointer').classList.remove('pointer-active');
    })
});