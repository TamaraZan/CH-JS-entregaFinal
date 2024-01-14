function actualizarEstadisticasJugadas(categoria) {
    cantJugadas++;
    localStorage.setItem("cantJugadas", JSON.stringify(cantJugadas));
    let estadisticaDeCateg;
    if(localStorage.getItem(categoria) != null){
        estadisticaDeCateg = JSON.parse(localStorage.getItem(categoria));
        estadisticaDeCateg.jugadas++;
    } else {
        estadisticaDeCateg = {
            jugadas: 1,
            correctas: 0,
        }
    }
    localStorage.setItem(categoria, JSON.stringify(estadisticaDeCateg));
}
function actualizarEstadisticasCorrecta(categoria) {
    cantCorrectas++;
    localStorage.setItem("cantCorrectas", JSON.stringify(cantCorrectas));
    let estadisticaDeCateg = JSON.parse(localStorage.getItem(categoria));
    estadisticaDeCateg.correctas++;
    localStorage.setItem(categoria, JSON.stringify(estadisticaDeCateg));
}

function categoriaMasJugada() {
    const cantJuegosPorCategoria = [
        JSON.parse(localStorage.getItem("geografia"))?.jugadas || 0,
        JSON.parse(localStorage.getItem("historia"))?.jugadas || 0,
        JSON.parse(localStorage.getItem("entretenimiento"))?.jugadas || 0,
        JSON.parse(localStorage.getItem("ciencia"))?.jugadas || 0
    ];
    let juegosMax = Math.max(...cantJuegosPorCategoria);
    let res = [];
    for(let i=0; i<cantJuegosPorCategoria.length; i++) {
        if(cantJuegosPorCategoria[i] == juegosMax) res.push(categoriasValidas[i]);
    }
    return res.toString();
}
function mostrarEstadisticas() {
    document.getElementById("estadisticas").style.display= "block";
    document.querySelector("#cantJugadas").textContent = cantJugadas;
    document.querySelector("#cantCorrectas").textContent = cantCorrectas;
    let porcentaje = cantJugadas? (cantCorrectas / cantJugadas) * 100 : 0;
    document.querySelector("#porcentajeAcierto").textContent = porcentaje.toFixed(2);
    document.querySelector("#categMasJugada").textContent = categoriaMasJugada();


    document.querySelector("#cantJugadasGeografia").textContent = JSON.parse(localStorage.getItem("geografia"))?.jugadas || 0;
    document.querySelector("#cantCorrectasGeografia").textContent = JSON.parse(localStorage.getItem("geografia"))?.correctas || 0;

    document.querySelector("#cantJugadasHistoria").textContent = JSON.parse(localStorage.getItem("historia"))?.jugadas || 0;
    document.querySelector("#cantCorrectasHistoria").textContent = JSON.parse(localStorage.getItem("historia"))?.correctas || 0;

    document.querySelector("#cantJugadasEntretenimiento").textContent = JSON.parse(localStorage.getItem("entretenimiento"))?.jugadas || 0;
    document.querySelector("#cantCorrectasEntretenimiento").textContent = JSON.parse(localStorage.getItem("entretenimiento"))?.correctas || 0;

    document.querySelector("#cantJugadasCiencia").textContent = JSON.parse(localStorage.getItem("ciencia"))?.jugadas || 0;
    document.querySelector("#cantCorrectasCiencia").textContent = JSON.parse(localStorage.getItem("ciencia"))?.correctas || 0;
}


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

async function msjError(err){
    swal("Error al cargar datos", err.toString(), "warning", {
        button: false,
        className: "errorAlert"
    })
}


function inicio() {
    document.getElementById("btnEmpezar").style.display = "initial";
    btnEmpezar.textContent = "Empezar";
    let estadisticas = `Jugaste ${cantJugadas} ${cantJugadas==1? "ronda":"rondas"} y contestaste correctamente ${cantCorrectas} ${cantCorrectas==1? "pregunta":"preguntas"}.`;
    texto.textContent = cantJugadas==0? "Todavía no jugaste en esta sesión. Hacé click abajo para empezar." : estadisticas;
}

function elegirCategoria() {
    eligirCategoria = true;
    texto.textContent = "Elegí la categoría para la proxima pregunta:";
    document.getElementById("btnEmpezar").style.display = "initial";
    document.getElementById("botones").style.display = "grid";
    for(let i = 0; i<categoriasValidas.length; i++){
        opciones[i].textContent = categoriasValidas[i];
    }
    btnEmpezar.textContent = "aleatorio";
}
function elegirPregunta(categoria) {
    eligirCategoria = false;
    let pregPosibles;
    fetch("bd.json")
        .then(res => res.json())
        .then(bd => {
            if(categoria == "aleatorio") {
                pregPosibles = bd.preguntas;
            } else {
                pregPosibles = bd.preguntas.filter((preguntas) => categoria == preguntas.categoria);
            }
            escribirPregunta(pregPosibles[Math.floor(Math.random() * pregPosibles.length)]);
        })
        .catch(err => {msjError(err)})
}
function escribirPregunta(pregunta) {
    pregActual = pregunta;
    actualizarEstadisticasJugadas(pregActual.categoria);
    texto.innerHTML = `<p style="padding-bottom: 10px;">Categoría: ${pregActual.categoria}</p> <p>${pregActual.pregunta}</p>`;
    document.getElementById("btnEmpezar").style.display = "none";
    document.getElementById("botones").style.display = "grid";
    for(let i=0; i<4; i++){
        opciones[i].textContent = pregActual.opciones[i];
    }
}

function resultado(pregActual, nroRta){
    document.getElementById("botones").style.display = "none";
    if(pregActual.correcta == nroRta) {
        texto.textContent="Correcta";
        actualizarEstadisticasCorrecta(pregActual.categoria);
    } else {
        texto.textContent="Incorrecta";
    }
    setTimeout(inicio, 1500);
}
