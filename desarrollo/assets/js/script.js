// 1. Implementar patrón modulo mediante IIFE.
const main = (() => {
    // Incluye función privada que recibe la URL del video y la ID de la etiqueta iframe
    const insertar = (url, id) => {
        const elemento = document.getElementById(id)
        elemento.setAttribute("src", url);
    };
    // Retorna función publica que recibe los parámetros (url, id) y realice el llamado a la función interna (privada) para insertar elementos recibidos
    return { 
        mostrarVideo: (url, id) => insertar(url, id) 
    };
})();

// 2. Establecer clase padre: Multimedia. Recibe propiedad url, que será el atributo src de la etiqueta iframe.
class Multimedia {
    #url;
    constructor(url){
        this.#url = url;
    };

    get url(){
        return this.#url;
    };
    set url(nuevaUrl){
        this.#url = nuevaUrl
    }

    // Agrega método llamado setInicio que retorne "Este metodo es para realizar un cambio en la URL del video"
    setInicio(){
        return `Este método es para realizar un cambio en la URL del video`
    }
}

// 3. Crear clase "Reproductor", hija de clase Multimedia.
class Reproductor extends Multimedia {
    // Recibe propiedad id, será el elemento del DOM
    #id;
    constructor(url, id){
        super(url);
        this.#id = id;
    }

    get id(){
        return this.#id;
    }
    // Crea metodo llamado playMultimedia que permite llamar a funcion publica de la IIFE, enviando atributos url e id.
    playMultimedia(){
        main.mostrarVideo(this.url, this.id)
    }
    // Agrega metodo setInicio, recibe y agrega tiempo de inicio a URL de etiqueta iframe.
    setInicio(tiempo){
        let url = this.url;
        // En el reproductor de youtube se pueden pasar varios parámetros al final de la url para hacer consultas,
        // el primero se separa de la url con un '?' y a partir del segundo se agrega un '&'.
        // Validaremos la existencia de algun parametro antes de agregar el parametro de tiempo de inicio.
        if(url.includes("?")){
            url += `&start=${tiempo}`
        } else {
            url += `?start-${tiempo}`
        }
        this.url = url;
        console.log(this.url)
    }
}

// 4. Instanciar clase hija
let mostrarMusica = new Reproductor("https://www.youtube.com/embed/2i6WUb9xavk?si=P9AbiZ1JBrya4-Z1", 'musica')
let mostrarPelicula = new Reproductor("https://www.youtube.com/embed/LDG9bisJEaI?si=BDL9wSn7sJokTYQ1", 'peliculas')
let mostrarSerie = new Reproductor("https://www.youtube.com/embed/PSLTXPefVGE?si=XJoy-odE68NR8rDd", 'series');

// 6. Utiliza metodo setInicio para modificar el tiempo de inicio en alguna de las instancias creadas. Importante invocar este método antes de playMultimedia para tener lista la url con el parámetro de tiempo de inicio.
mostrarMusica.setInicio(3000)

// 5. Invocar método playMultimedia para cada instancia creada
mostrarMusica.playMultimedia()
mostrarPelicula.playMultimedia()
mostrarSerie.playMultimedia()
