//VARIABLES
const carrito = document.querySelector('#carrito');
const contenidoCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];
cargarEventListeners();
function cargarEventListeners() {
    //cuando agregas al presionar"Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCurso);

    vaciarCarrito.addEventListener('click', () =>{
        articulosCarrito = [];
        limpiarHTML();
    });
}

//Funciones
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado=e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
//Eliminar Curso
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //eliminar del arreglo
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        ////////////////////////////////////////
        
        carritoHTML();
    }

}
function leerDatosCurso(curso) {
    //console.log(curso);

    //crear un objeto con el conenido
    const infoCurso={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //revisar si ya existe
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    
    if (existe) {
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //Agregar articulos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
        console.log(articulosCarrito);
    }


    //console.log(infoCurso);

    carritoHTML();
}

//Muestra en el carrito
function carritoHTML() {
    //Limpiar el HTML
    limpiarHTML();

    //Recorre el contenido
    articulosCarrito.forEach(curso =>{
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
      row.innerHTML = `
        <td>
        <img src="${imagen}" width=100>
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>

      `;

      //agregar el HTML del carrito en el tbody
      contenidoCarrito.appendChild(row);
    });
}

//elimina lo elementos del tbody
function limpiarHTML() {
    //contenidoCarrito.innerHTML = '';
    while (contenidoCarrito.firstChild) {
        contenidoCarrito.removeChild(contenidoCarrito.firstChild)
    }
}