function actualizarEstadisticasJugadas(categoria) {
    cantJugadas++;
    sessionStorage.setItem("cantJugadas", JSON.stringify(cantJugadas));
    let estadisticaDeCateg;
    if(sessionStorage.getItem(categoria) != null){
        estadisticaDeCateg = JSON.parse(sessionStorage.getItem(categoria));
        estadisticaDeCateg.jugadas++;
    } else {
        estadisticaDeCateg = {
            jugadas: 1,
            correctas: 0,
        }
    }
    sessionStorage.setItem(categoria, JSON.stringify(estadisticaDeCateg));
}
function actualizarEstadisticasCorrecta(categoria) {
    cantCorrectas++;
    sessionStorage.setItem("cantCorrectas", JSON.stringify(cantCorrectas));
    let estadisticaDeCateg = JSON.parse(sessionStorage.getItem(categoria));
    estadisticaDeCateg.correctas++;
    sessionStorage.setItem(categoria, JSON.stringify(estadisticaDeCateg));
}

function categoriaMasJugada() {
    const cantJuegosPorCategoria = [
        JSON.parse(sessionStorage.getItem("geografia"))?.jugadas || 0,
        JSON.parse(sessionStorage.getItem("historia"))?.jugadas || 0,
        JSON.parse(sessionStorage.getItem("entretenimiento"))?.jugadas || 0,
        JSON.parse(sessionStorage.getItem("ciencia"))?.jugadas || 0
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


    document.querySelector("#cantJugadasGeografia").textContent = JSON.parse(sessionStorage.getItem("geografia"))?.jugadas || 0;
    document.querySelector("#cantCorrectasGeografia").textContent = JSON.parse(sessionStorage.getItem("geografia"))?.correctas || 0;

    document.querySelector("#cantJugadasHistoria").textContent = JSON.parse(sessionStorage.getItem("historia"))?.jugadas || 0;
    document.querySelector("#cantCorrectasHistoria").textContent = JSON.parse(sessionStorage.getItem("historia"))?.correctas || 0;

    document.querySelector("#cantJugadasEntretenimiento").textContent = JSON.parse(sessionStorage.getItem("entretenimiento"))?.jugadas || 0;
    document.querySelector("#cantCorrectasEntretenimiento").textContent = JSON.parse(sessionStorage.getItem("entretenimiento"))?.correctas || 0;

    document.querySelector("#cantJugadasCiencia").textContent = JSON.parse(sessionStorage.getItem("ciencia"))?.jugadas || 0;
    document.querySelector("#cantCorrectasCiencia").textContent = JSON.parse(sessionStorage.getItem("ciencia"))?.correctas || 0;
}


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


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
    opciones[0].textContent = categoriasValidas[0];
    opciones[1].textContent = categoriasValidas[1];
    opciones[2].textContent = categoriasValidas[2];
    opciones[3].textContent = categoriasValidas[3];
    btnEmpezar.textContent = "aleatorio";
}
function elegirPregunta(categoria) {
    let pregPosibles;
    if(categoria == "aleatorio") {
        pregPosibles = preguntas;
    } else {
        pregPosibles = preguntas.filter((preguntas) => categoria == preguntas.categoria);
    }
    return pregPosibles[Math.floor(Math.random() * pregPosibles.length)];
}
function escribirPregunta(categoria) {
    eligirCategoria = false;
    pregActual = elegirPregunta(categoria);
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
