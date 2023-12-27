/*
    FALTA VER:
        textos mas agradables en el html(intro, pregunta y resultados)?
*/


const SVG_RUTA_ESTADIST =`<path fill="#c3d4d4" d="M9.037,40.763h4.286c0.552,0,1-0.447,1-1v-7.314c0-0.553-0.448-1-1-1H9.037c-0.552,0-1,0.447-1,1v7.314 C8.037,40.315,8.485,40.763,9.037,40.763z M10.037,33.448h2.286v5.314h-2.286V33.448z"></path> <path fill="#c3d4d4" d="M21.894,40.763c0.552,0,1-0.447,1-1v-20.64c0-0.553-0.448-1-1-1h-4.286c-0.552,0-1,0.447-1,1v20.64 c0,0.553,0.448,1,1,1H21.894z M18.608,20.123h2.286v18.64h-2.286V20.123z"></path> <path fill="#c3d4d4" d="M30.465,40.763c0.552,0,1-0.447,1-1V25.96c0-0.553-0.448-1-1-1H26.18c-0.552,0-1,0.447-1,1v13.803 c0,0.553,0.448,1,1,1H30.465z M27.18,26.96h2.286v11.803H27.18V26.96z"></path> <path fill="#c3d4d4" d="M33.751,9.763v30c0,0.553,0.448,1,1,1h4.286c0.552,0,1-0.447,1-1v-30c0-0.553-0.448-1-1-1h-4.286 C34.199,8.763,33.751,9.21,33.751,9.763z M35.751,10.763h2.286v28h-2.286V10.763z"></path>`;
const SVG_RUTA_CERRAR =`<path fill="#c3d4d4" d="M9.016,40.837c0.195,0.195,0.451,0.292,0.707,0.292c0.256,0,0.512-0.098,0.708-0.293l14.292-14.309 l14.292,14.309c0.195,0.196,0.451,0.293,0.708,0.293c0.256,0,0.512-0.098,0.707-0.292c0.391-0.39,0.391-1.023,0.001-1.414 L26.153,25.129L40.43,10.836c0.39-0.391,0.39-1.024-0.001-1.414c-0.392-0.391-1.024-0.391-1.414,0.001L24.722,23.732L10.43,9.423 c-0.391-0.391-1.024-0.391-1.414-0.001c-0.391,0.39-0.391,1.023-0.001,1.414l14.276,14.293L9.015,39.423 C8.625,39.813,8.625,40.447,9.016,40.837z"></path>`;


let cantJugadas = JSON.parse(sessionStorage.getItem("cantJugadas")) || 0; 
let cantCorrectas = JSON.parse(sessionStorage.getItem("cantCorrectas")) || 0;

const cantJugadasXCateg = JSON.parse(sessionStorage.getItem("cantJugadasXCateg")) || [0,0,0,0];
const cantCorrectasXCateg = JSON.parse(sessionStorage.getItem("cantCorrectasXCateg")) || [0,0,0,0];

const texto = document.querySelector("#texto");
const btnEmpezar = document.querySelector("#btnEmpezar");
const opciones = [document.querySelector("#opcion0"),
                  document.querySelector("#opcion1"),
                  document.querySelector("#opcion2"),
                  document.querySelector("#opcion3")];


let eligirCategoria = false;
let pregActual;

inicio();

btnEmpezar.addEventListener("click", ()=> eligirCategoria?escribirPregunta("aleatorio"):elegirCategoria());

for(let i=0; i<4; i++){
    opciones[i].addEventListener("click", ()=> eligirCategoria?escribirPregunta(categoriasValidas[i]):resultado(pregActual, i));
}

btnEstadisticas.addEventListener("mouseover", mostrarEstadisticas);
btnEstadisticas.addEventListener("mouseout", ()=> estadisticasAbierto? null : document.getElementById("estadisticas").style.display= "none");

let estadisticasAbierto = false;
btnEstadisticas.addEventListener("click", ()=> {
    if(estadisticasAbierto) {
        document.querySelector("#SVGRepo_iconCarrier").innerHTML = SVG_RUTA_ESTADIST;
        document.getElementById("estadisticas").style.display= "none";
    } else {
        document.querySelector("#SVGRepo_iconCarrier").innerHTML = SVG_RUTA_CERRAR;
        mostrarEstadisticas();
    }
    estadisticasAbierto = !estadisticasAbierto;
} )
