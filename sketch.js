function setup() 
{
	createCanvas(window.innerWidth, window.innerHeight, WEBGL);

    setAlturas();
    setPuntos();

    windowResized();
}
const puntos = [];

let t = 0;
const dt = 0.004;
function draw()
{
    background(100);
    
    edificios();
    curves();

    t = (t + dt) % 20;
    const pos = changePos(t);
    const t1 = (t + 1) % 20;
    const posLook = changePos(t1);

    //console.log(pos,posLook);

    camera(pos.x, pos.y, pos.z,posLook.x,posLook.y,posLook.z);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

function interpolacion(punto,X,Y) {

    function L_nk(x, X, k, n) {
        let L_N = 1;
        for (let i = 0; i < n; i++) {
          if (i !== k) {
            let x_i = X[i];
            let x_k = X[k];
      
            L_N = L_N * ((x - x_i) / (x_k - x_i));
          }
        }
        return L_N;
      }

      function P_N(x, X, Y, n) {
        let pn = 0;
        for (let k = 0; k < n; k++) {
          pn += Y[k] * L_nk(x, X, k, n);
        }
        return pn;
      }

      return P_N(punto,X,Y,3);
    
}

const alturas = [];

function setAlturas() {
    for (let i = 0; i < 10; i++) {
        let altura = [];
        for (let j = 0; j < 10; j++) {

            altura.push(Math.random() * 50 + 10);

        }
        alturas.push(altura);
    }
}

function changePos(t) {
    const tEntero = Math.floor(t);
    const t1 = (tEntero + 1) % 20;
    const t2 = (tEntero + 2) % 20;
    const X = [tEntero,t1,t2];
    const Yx = [puntos[tEntero].x,puntos[t1].x,puntos[t2].x];
    const Yy = [puntos[tEntero].y,puntos[t1].y,puntos[t2].y];
    const Yz = [puntos[tEntero].z,puntos[t1].z,puntos[t2].z];
    const x = interpolacion(t,X,Yx);
    const y = interpolacion(t,X,Yy);
    const z = interpolacion(t,X,Yz);

    return {x:x,y:y,z:z};
}

function curves() {
    
    for (let i = 0; i < puntos.length - 3; i++) {
        const p1 = puntos[i];
        const p2 = puntos[i+1];
        const p3 = puntos[i+2];
        const p4 = puntos[i+3];
        push();
        noFill();
        stroke(255, 102, 0);
        curve(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z, p4.x, p4.y, p4.z);
        pop();
        
    }

}

function setPuntos() {

    const inicial = {
        x:0,
        y:-120,
        z:0
    }

    puntos.push(inicial);

    for (let i = 0; i < 18; i++) {
        
        const punto = {
            x:Math.random() * 600,
            y:-((Math.random() * 60) + 60),
            z:Math.random() * 600
        }

        puntos.push(punto);
        
    }

    puntos.push(inicial);

    console.log(puntos);
    
}

function edificios(){
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
        
            push();
            fill((alturas[i][j] - 10),(alturas[i][j] - 10)*5,(alturas[i][j] - 10)*3);
            translate(i * 60, -(alturas[i][j]/2), j * 60);
            box(50, alturas[i][j], 50);     
            pop();
        }        
    }
}