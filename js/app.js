// para los menús en el header. Cada li de la ul llama una función  que muestra un sub-menú distinto. A su vez cada elemento del submenú llama a una función diferente

// este es la función que se llama al clickear sobre el logo. Es el mismo texto con el que se carga la página la primera vez. Esta función borra los submenús y la lista de películas que hubiese y muestra el texto de presentación
function mostrarPaginaPrincipal() {
    tituloPagina.innerText = 'Bienvenidos a "El Gabinete", un sitio dedicado a la preservación y difusión de películas pertenecientes al dominio público con particular acento en los géneros del terror, el misterio y el thriller'
    divPeliculas.innerHTML = ""
    let subMenuPrincipal = document.getElementById("subMenu")
    subMenuPrincipal.innerHTML = ""
}

// esta función muestra el sub-menú donde aparece el botón que llama a la función para mostrar la lista completa de películas
function mostrarMenuLista() {
    tituloPagina.innerHTML = ""
    divPeliculas.innerHTML = ""
    let subMenuLista = document.getElementById("subMenu")
    subMenuLista.setAttribute("class", "subMenu")
    subMenuLista.innerHTML = `
    <div>
        Lista completa de películas
    </div>
    <section class="opciones">
        <button id="verTodas">Cliquee aquí para ver Lista completa</button>
    </section>`
    let botonMostrar = document.getElementById("verTodas")
    botonMostrar.addEventListener("click", mostrarListaCompleta)
}

// sub-menú con el sistema de búsqueda por título, director u año. Luego de leer los inputs llama a funciones pasando como parámetro el valor introducido por el usuario y el input utilizado
function mostrarMenuBusqueda() {
    tituloPagina.innerHTML = ""
    divPeliculas.innerHTML = ""
    let subMenuBusqueda = document.getElementById("subMenu")
    subMenuBusqueda.setAttribute("class", "subMenu")
    subMenuBusqueda.innerHTML = `
    <div>
        Búsquedas
    </div>
    <section class="opciones">
        <article>
            <button id="enviarTitulo">Buscar por título</button>
            <input type="text" id="inputTitulo">
        </article>
        <article>
            <button id="enviarDirector">Buscar por director</button>
            <input type="text" id="inputDirector">
        </article>
        <article>
            <button id="enviarAnio">Buscar por año</button>
            <input type="text" id="inputAnio">
        </article>
    </section>`

    let titulo = document.getElementById("inputTitulo")
    let director = document.getElementById("inputDirector")
    let anio = document.getElementById("inputAnio")

    const guardarTituloBtn = document.getElementById("enviarTitulo")
    const guardarDirectorBtn = document.getElementById("enviarDirector")
    const guardarAnioBtn = document.getElementById("enviarAnio")

    guardarTituloBtn.addEventListener("click", () => guardarTitulo(titulo.value, titulo))
    guardarDirectorBtn.addEventListener("click", () => guardarDirector(director.value, director))
    guardarAnioBtn.addEventListener("click", () => guardarAnio(anio.value, anio))
}

// Esta función muestra el submenú con el botón que llama a la función favoritasONo 
function mostrarMenuFavoritas() {
    tituloPagina.innerHTML = ""
    divPeliculas.innerHTML = ""
    let subMenuFavoritas = document.getElementById("subMenu")
    subMenuFavoritas.setAttribute("class", "subMenu")
    subMenuFavoritas.innerHTML = `
        <div>Lista de películas favoritas</div>
        <section class="opciones">
            <button id="botonMostrarFavoritas">Cliquee aquí para ver favoritas</button>
        </section>`
    let botonMostrarFavoritas = document.getElementById("botonMostrarFavoritas")
    botonMostrarFavoritas.addEventListener("click", favoritasONo)
}

// esta función muestra la lista completa de películas en el array. Muestra los datos utilizando DOM en el HTML y muestra los botones para agregar a favoritas y para ver la película elegida. Cada uno de estos botones tienen eventos asociados que llaman funciones
function mostrarListaCompleta() {
    tituloPagina.innerText = "Lista completa de películas"
    divPeliculas.innerHTML = ""
    filmoteca.forEach((pelicula) => {
        let nuevaPelicula = document.createElement("div")
        nuevaPelicula.innerHTML = `<article class="card">
                                        <h2>${pelicula.titulo}</h2>
                                        <p>Estrenada en ${pelicula.anio}</p>
                                        <p>Dirigida por ${pelicula.director}</p>
                                        <button id="verPelicula${contadorLista}">Ver Pelicula</button>
                                        <img src="${pelicula.afiche}">
                                        <button id="agregarAFavoritas${contadorLista}">Agregar a Favoritas</button>
                                    </article>`
        divPeliculas.appendChild(nuevaPelicula)
        let botonVerPelicula = document.getElementById(`verPelicula${contadorLista}`)
        let botonFavoritas = document.getElementById(`agregarAFavoritas${contadorLista}`)
        contadorLista++
        botonVerPelicula.addEventListener('click', () => verPelicula(pelicula))
        botonFavoritas.addEventListener("click", () => agregarAFavoritas(pelicula))
    })
}

// La función verPelicula recibe como parámetro un objeto y utiliza los atributos .titulo y .urlVideo. Un sweet alert incluye un html con el video incorporado.
function verPelicula(pelicula) {
    Swal.fire({
        title: `${pelicula.titulo}`,
        confirmButtonText: "Cerrar",
        color: "white",
        background: "#2b2b2b",
        width: 900,
        confirmButtonColor: "#2b2b2b",
        html: ` <iframe width="800" height="600"
        src="${pelicula.urlVideo}">
        </iframe> `
    })
}

// las funciones guardaTitulo, guardarDirector y guardarAnio recibe como parámetros los valores de los inputs y el tipo de input utilizado. A su vez se llama a la función búsqueda pasando estos parámetros y agregando una string para llamar a la función busqueda 
function guardarTitulo(titulo, valorInput) {
    busqueda(titulo, "titulo", valorInput)
}

function guardarDirector(director, valorInput) {
    busqueda(director, "director", valorInput)
}

function guardarAnio(anio, valorInput) {
    busqueda(anio, "anio", valorInput)
}

// la función búsqueda consta de condicionales if else que según el tipo de parámetro datoPeli busca dentro de un atributo específico del array. El parámetro termino es comparado con el atributo del objeto y llama a un resultado. El parámetro valorInput indica qué tipo de input tiene que ser reseteado al apretar el botón de búsqueda. Se utiliza un método filter y se llama a la función resultadoONo con un array como parámetro
function busqueda(termino, datoPeli, valorInput) {
    if (datoPeli == "titulo") {
        valorInput.value = ""
        const resultado = filmoteca.filter((el) => el.titulo.toUpperCase() == termino.toUpperCase())
        resultadoONo(resultado)
    }
    else if (datoPeli == "director") {
        valorInput.value = ""
        const resultado = filmoteca.filter((el)=> el.director.toUpperCase() == termino.toUpperCase())
        resultadoONo(resultado)
    }
    else {
        valorInput.value = ""
        const resultado = filmoteca.filter((el)=> el.anio == termino)
        resultadoONo(resultado)
    }
}

// la función resultadoONo chequea el largo del array obtenido antes con el método filter. si el largo es cero avisa al usuario que la busqueda no arrojó resultados. Si el array tiene uno o más elementos llama a la función mostrar resultados utilizando el array como parámetro
function resultadoONo(resultado) {
        
    divPeliculas.innerHTML = ""

    resultado.length == 0 ? tituloPagina.innerText = "Su busqueda no arrojó resultados" : mostrarResultados(resultado)
}

// la función mostrarResultados recibe un array de uno o más elementos y realiza un ciclo forEach. Utilizando DOM el forEach muestra los atributos de los objetos en el array los botones para ver película o enviar a favoritas. Cada uno de los botones llama a una función específica
function mostrarResultados(resultadoBusqueda) {
        
    divPeliculas.innerHTML = ""
    tituloPagina.innerText = "Su búsqueda arrojó los siguientes resultados:"
    resultadoBusqueda.forEach((pelicula) => {
        let nuevaPelicula = document.createElement("div")
        nuevaPelicula.innerHTML = `<article class="card">
                                        <h2>${pelicula.titulo}</h2>
                                        <p>estrenada en ${pelicula.anio}</p>
                                        <p>dirigida por ${pelicula.director}</p>
                                        <button id="verPelicula${contadorBusqueda}">Ver Pelicula</button>
                                        <img src="${pelicula.afiche}">
                                        <button id="agregarAFavoritas${contadorBusqueda}">Agregar a Favoritas</button>
                                    </article>`
        divPeliculas.appendChild(nuevaPelicula)
        let botonVerPelicula = document.getElementById(`verPelicula${contadorBusqueda}`)
        let botonFavoritas = document.getElementById(`agregarAFavoritas${contadorBusqueda}`)
        contadorBusqueda++
        botonVerPelicula.addEventListener('click', () => verPelicula(pelicula))
        botonFavoritas.addEventListener("click", () => agregarAFavoritas(pelicula))
    })
    
}

// Esta función recibe como parámetro la película sobre la que se cliqueó y la agrega al array con la lista de películas favoritas y se las guarda en texto plano en el localStorage para poder ser vistas luego. unos toasts avisa si la película ya fue agregada o si está siendo agregada
function agregarAFavoritas(pelicula) {
    let peliculaElegida = favoritas.find((elem) => (elem.titulo == pelicula.titulo))
    if (peliculaElegida == undefined) {
        favoritas.push(pelicula)
        localStorage.setItem("favoritas", JSON.stringify(favoritas))
        Toastify({
                text: `Agregaste ${pelicula.titulo} a favoritas`,
                className: "info",
                style: {
                  background: "#2b2b2b",
                }
              }).showToast()
    }
    else {
        Toastify({
            text: `${pelicula.titulo} ya está en favoritas`,
            className: "info",
            style: {
              background: "#2b2b2b",
            }
          }).showToast()
    }
}

// esta función chequea el largo del array favoritas y de acuerdo a eso, utilizando un operador ternario, avisa que no hay películas o llama a la función para mostrar la lista de favoritas 
function favoritasONo() {
    favoritas.length == 0 ? (tituloPagina.innerText = "No hay películas favoritas elegidas") : mostrarFavoritas()
}

// Esta función parsea el array en texto plano para mostrar la lista de películas favoritas
function mostrarFavoritas() {
    tituloPagina.innerText = "Lista de películas favoritas"
    divPeliculas.innerHTML = ""
    let favoritasParseadas = JSON.parse(localStorage.getItem("favoritas"))
    favoritasParseadas.forEach((pelicula) => {
        let nuevaPelicula = document.createElement("div")
        nuevaPelicula.innerHTML = `<article class="card">
                                        <h2>${pelicula.titulo}</h2>
                                        <p>estrenada en ${pelicula.anio}</p>
                                        <p>dirigida por ${pelicula.director}</p>
                                        <button id="verPelicula${contadorFavoritas}">Ver Pelicula</button>
                                        <img src="${pelicula.afiche}">
                                        <button id="quitarDeFavoritas${contadorFavoritas}">Quitar de Favoritas</button>
                                    </article>`
        divPeliculas.appendChild(nuevaPelicula)
        let botonVerPelicula = document.getElementById(`verPelicula${contadorFavoritas}`)
        let botonQuitar = document.getElementById(`quitarDeFavoritas${contadorFavoritas}`)
        contadorFavoritas++
        botonVerPelicula.addEventListener('click', () => verPelicula(pelicula))
        botonQuitar.addEventListener('click', () => quitarPelicula(pelicula))
    })
}

// esta función utiliza el método map para chequear la posición en el array del objeto pelicula con el atributo .titulo especificado. Al obtener la posición en el array se utiliza un método splice para quitar el objeto del array. Se guarda en localStorage, se limpia la lista y se vuelve a llamar a la función favoritasONo
function quitarPelicula(pelicula) {
    let tituloPeli = pelicula.titulo
    const indice = favoritas.map(peli => peli.titulo).indexOf(tituloPeli)
    favoritas.splice(indice, 1)
    localStorage.setItem("favoritas", JSON.stringify(favoritas))
    divPeliculas.innerHTML = ""
    favoritasONo()
}

// Definción de nodos y de eventos para el menú y los contenidos de la página
let botonPrincipal = document.getElementById("nombreSitio")
let listaBtn = document.getElementById("lista")
let busquedaBtn = document.getElementById("busqueda")
let favoritasBtn = document.getElementById("favoritas")
let tituloPagina = document.getElementById("tituloPagina")
let divPeliculas = document.getElementById("peliculas")
divPeliculas.setAttribute("class", "estiloPeliculas")

botonPrincipal.addEventListener("click", mostrarPaginaPrincipal)
listaBtn.addEventListener("click", mostrarMenuLista)
busquedaBtn.addEventListener("click", mostrarMenuBusqueda)
favoritasBtn.addEventListener("click", mostrarMenuFavoritas)

// clase Peliculas, a partir de la cual hay un constructor para los objetos
class Peliculas {
    constructor(titulo, anio, director, urlVideo, afiche) {
        this.titulo = titulo,
        this.anio = anio,
        this.director = director,
        this.urlVideo = urlVideo,
        this.afiche = afiche
    }
}

// acá utilizo un await dentro de una función asincrónica async. Un método fetch hace una petición a un archivo .json que incluye la lista que, por medio de un for of, utiliza el constructor para pushear cada objeto nuevo al array filmoteca. A continuación se invoca a la función para armar el array
const llenarFilmoteca = async () => {
    const respuesta = await fetch("peliculas.json")
    const listaPelis = await respuesta.json()
    for (let pelicula of listaPelis) {
        let peliculaNueva = new Peliculas(pelicula.titulo, pelicula.anio, pelicula.director, pelicula.urlVideo, pelicula.afiche)
        filmoteca.push(peliculaNueva)
    }
}
llenarFilmoteca()

// el array filmoteca se llneará con la función asincrónica antes definida
let filmoteca = []

// array de objetos con la lista de películas favoritas, si no está vacía recibe los datos del localStorage
let favoritas = JSON.parse(localStorage.getItem("favoritas")) || []

// definición de los contadores para utilizar dentro de las funciones mostrar lista, búsqueda y favoritas
let contadorLista = 1
let contadorFavoritas = 0
let contadorBusqueda = 1

// definiciones de los nodos y eventos para los botones que cambian los modos claros y oscuros
let botonOscuro = document.getElementById("botonOscuro")
let botonClaro = document.getElementById("botonClaro")

botonClaro.addEventListener("click", ()=> {
    document.body.classList.add("modoClaro")
    localStorage.setItem("modoClaro", "claro")
})

botonOscuro.addEventListener("click", ()=> {
    document.body.classList.remove("modoClaro")
    localStorage.setItem("modoClaro", "oscuro")
})

// Para el default, se nombra la variable sin darle un valor para ver en qué situación está 
let modoClaro

if(localStorage.getItem("modoClaro")) {
    modoClaro = localStorage.getItem("modoClaro")
}
else {
    localStorage.setItem("modoClaro", "oscuro")
}

// Si el modoClaro está en claro, tal como lo hace el eventListener, entonces transformo la clase a claro
if(modoClaro == "claro") {
    document.body.classList.add("modoClaro")
}

// utilizando la librería luxon para incluir la fecha en el footer
const dt = luxon.DateTime.now()

document.getElementById("fechaYHora").innerText = `Hoy es ${dt.day} del ${dt.month} de ${dt.year}`