const celulas = document.querySelectorAll("[data-celula]");
const tabu = document.querySelector("[tabuleiro]");
const msg = document.querySelector("[msg]");
const msgTexto = document.querySelector("[msgTexto]");
const reiniciar = document.querySelector("[reiniciar]");
let vitoriasBola = document.querySelector("[vitoriasBola]");
let vitoriasX = document.querySelector("[vitoriasX]");
let placaBola = 0
let placarX = 0;
const img = document.querySelector("img");

let vezBola = false;

const CombinacaoVitoria = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6]
];

const verificarVitoria = (Jogador) => {
    return CombinacaoVitoria.some(combinacao => {
        return combinacao.every((index) => {
            return celulas[index].classList.contains(Jogador);
        });
    });
};

const verificarEmpate = () => {
    return [...celulas].every((celula) =>{
       return celula.classList.contains("x") || celula.classList.contains("bola");
    });
};                                

const fim = (Empate) => {
    if(Empate){
        msgTexto.innerHTML = "Velha!";
    }else{
        if(vezBola){
            msgTexto.innerHTML = "Bola venceu";
            placaBola++;
            vitoriasBola.innerHTML = placaBola;
            
        }else{
            msgTexto.innerHTML = "X venceu";
            placarX++;
            vitoriasX.innerHTML = placarX;
            console.log(vitoriasX);
        }
        //msgTexto.innerHTML = vezBola ? "Bola venceu" : "X venceu";
    }

    msg.classList.add("mostrarMsg");
};


const start = () =>{
   vezBola = false; 
   for(const celula of celulas){
        celula.classList.remove("bola");
        celula.classList.remove("x");
        celula.removeEventListener("click", clique);
        celula.addEventListener("click", clique, {once:true});
    }

    mudaTabuleiro();
    msg.classList.remove("mostrarMsg");
}

const mudaTabuleiro = () => {
    tabu.classList.remove("bola");
    tabu.classList.remove("x");
    if(vezBola){
        tabu.classList.add("bola");
    }else{
        tabu.classList.add("x");
    }
}


const trocarTurno = () =>{
    vezBola = !vezBola;
    mudaTabuleiro();

};


const clique = (e) => {
    const celula = e.target;
    const adicionar = vezBola ? 'bola' : "x";

    celula.classList.add(adicionar);
    
    const resultado = verificarVitoria(adicionar);
    const empate = verificarEmpate();


    if(resultado){
        fim(false)
    }else if(empate){
        fim(true);
    }else{
        trocarTurno();
    }
    
};

start();
reiniciar.addEventListener("click", start);
img.addEventListener("click", start);