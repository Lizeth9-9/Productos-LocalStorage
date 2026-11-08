//- JS, CONTADOR DE AGREGAR A CONTADOR Y NO SE DUPLIQUE
//FLUJO:

// funcion para que se cree 1. carrito compra donde se van a guardar productos
//funciones del evento
//1. avento al formulario // 2. submit (donde añade el producto y valida)
//funcion leer el localstorage
//fuction guardar ese local storage
//pintar la lista de productos recogiedno del local stroe con foreach  para poder pintar
//funcion anadir producto


//capturar elementos del dom
const formulario = document.querySelector("#formularioCompra");
const botonAgregar = document.querySelector("#botonAgregar");
const listaMuestraProducto = document.querySelector("#tablaMuestraProducto");
const inputProducto = document.querySelector("#inputProducto");

// Llinea es la que busca la llave 'el cajon' y traduce a Js para manejar los datos
const carritoCompra = JSON.parse(localStorage.getItem("productos")) || []; // si el cajón está vacío, crea un array limpio []

// console.log("estado incial", carritoCompra);

//EVENTOS

formulario.addEventListener("submit", (ev) => {
    ev.preventDefault();
    aniadirProducto(); //recogera y validara la funcion añadir

    // console.log("mirando que funcione el envio submit", ev);
});

//este local lo va leer el pintar lista de productos cuando entren datos y quedan alli en el local
const leerLocalStorage = () => {
    const local = JSON.parse(localStorage.getItem("productos")) || [];
    // console.log("hello - lee desde la funcion leer local ", local);
    return local;
};

//almacena permanentemente en el navegador bajo la llave 'productos'
//traduce a texto y mete los datos en la llave 'el cajon' (productos)

const guardarLocalStorage = (listadeProductos) => {
    // la lista que entrara en el input y cambiarla con strinfy a texto
    const datosLista = JSON.stringify(listadeProductos); // convirrtiendo a texto
    localStorage.setItem("productos", datosLista); //guardando en el localstorage con setitem , abre el cajón 'productos' (key) y mete el texto dentro

    // console.log("lista guardada", listadeProductos);
};

//PINTAR PRODUCTOS
//lee la informacion de leer localstorage
const pintarListaProductos = () => {
    listaMuestraProducto.replaceChildren(); // se vacia el contenedor igual de con "" con el innerhtml
    const listaPintar = leerLocalStorage();

    if (listaPintar.length === 0) {
        listaMuestraProducto.innerHTML =
            "<p>No hay productos en el carrito.</p>";
        return;
    }

    // creando el esqueleto (estructura) de filas y columnas
    const productosIngresadosTabla = document.createElement("table"); // tabla
    productosIngresadosTabla.classList = "tablaProductos";

    const cabecera = document.createElement("thead");
    const filaCabecera = document.createElement("tr"); // fila

    const columnaNombre = document.createElement("th");
    columnaNombre.textContent = "Nombre Del Producto";

    const columnaCantidad = document.createElement("th");
    columnaCantidad.textContent = "Cantidad";

    const columnaOpciones = document.createElement("th");
    columnaOpciones.textContent = "Opciones";

    filaCabecera.append(columnaNombre, columnaCantidad, columnaOpciones);
    cabecera.append(filaCabecera);
    productosIngresadosTabla.append(cabecera); // creando el esqueleto de filas y columnas

    // table body contiene los datos reales de dentro de la tabla que se creo antes lo que necesito para js
    const cuerpoTabla = document.createElement("tbody");
    cuerpoTabla.id = "cuerpoTabla";

    // creando los datos resles en el cuerpo con js
    listaPintar.forEach((element) => {
        const filaProducto = document.createElement("tr");
        filaProducto.classList.add = "filaProducto"; // fila pra producto

        const filaNombre = document.createElement("td");
        filaNombre.textContent = element.nombre;

        const filaCantidad = document.createElement("td");
        filaCantidad.textContent = element.cantidad;

        const filaOpciones = document.createElement("td");

        const botonEliminar = document.createElement("button");  

        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add = "botonEliminar";

        filaOpciones.append(botonEliminar);
        filaProducto.append(filaNombre, filaCantidad, filaOpciones);
        cuerpoTabla.append(filaProducto);
    });

    productosIngresadosTabla.append(cuerpoTabla);
    listaMuestraProducto.append(productosIngresadosTabla);
};

// AÑADIR A CARRITO
//Recoge valida y añade el producto
const aniadirProducto = () => {
    const agregarNuevo = inputProducto.value.trim(); 
    if (!agregarNuevo) return;

    const listaActual = leerLocalStorage();
    const existeProducto = listaActual.find(
        (product) =>
            product.nombre.toLowerCase() === agregarNuevo.toLowerCase(),
    );
    if (existeProducto) {
        existeProducto.cantidad += 1;  //contador 
    } else {
        const nuevoProduct = {
            // si no existe cantidad se añade
            nombre: agregarNuevo,
            cantidad: 1,
        };

        listaActual.push(nuevoProduct); // se agrega el nuevo producto si no existia a la lista actual que se trae de leer local.
    }

    guardarLocalStorage(listaActual);
    pintarListaProductos(); // pinta de nuevo la lista
    inputProducto.value = "";
};


//llamado de funcion
leerLocalStorage();
pintarListaProductos();
