let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorProductos = document.getElementById("productos");
const carritoHTML = document.getElementById("carrito");
const totalHTML = document.getElementById("total");
const contadorCarrito = document.getElementById("contador-carrito");
const formulario = document.getElementById("formulario");
const buscador = document.getElementById("buscador");

// FETCH JSON
fetch("data/productos.json")
.then(res => res.json())
.then(data => {
    productos = data;
    renderProductos();
});

// RENDER PRODUCTOS
function renderProductos(lista = productos){
    contenedorProductos.innerHTML = "";

    lista.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
        <img src="${prod.img}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>$${prod.precio}</p>
        <button onclick="agregarAlCarrito(${prod.id})">Agregar</button>
        `;

        contenedorProductos.appendChild(div);
    });
}

// BUSCADOR (FILTER)
buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();

    const filtrados = productos.filter(prod =>
        prod.nombre.toLowerCase().includes(texto)
    );

    renderProductos(filtrados);
});

// AGREGAR AL CARRITO (CON CANTIDAD)
function agregarAlCarrito(id){

    const producto = productos.find(p => p.id === id);
    const existe = carrito.find(p => p.id === id);

    if(existe){
        existe.cantidad++;
    } else {
        carrito.push({...producto, cantidad:1});
    }

    guardarStorage();
    renderCarrito();

    Swal.fire({
       toast: true,
       position: 'top-end',
       icon: 'success',
       title: 'Agregado al carrito',
       showConfirmButton: false,
       timer: 1200
    });
}

// RENDER CARRITO
function renderCarrito(){
    carritoHTML.innerHTML = "";

    carrito.forEach((prod,index) => {

        const li = document.createElement("li");

        li.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <span>${prod.nombre}</span>
            <div>
                <button onclick="restarCantidad(${index})">➖</button>
                ${prod.cantidad}
                <button onclick="sumarCantidad(${index})">➕</button>
                <button onclick="eliminarProducto(${index})">❌</button>
            </div>
        </div>
        `;

        carritoHTML.appendChild(li);
    });

    actualizarTotal();
    actualizarContador();
}

// ELIMINAR
function eliminarProducto(index){
    carrito.splice(index,1);
    guardarStorage();
    renderCarrito();
}

function sumarCantidad(index){
    carrito[index].cantidad++;
    guardarStorage();
    renderCarrito();
}

function restarCantidad(index){
    if(carrito[index].cantidad > 1){
        carrito[index].cantidad--;
    } else {
        carrito.splice(index,1);
    }

    guardarStorage();
    renderCarrito();
}

// TOTAL
function actualizarTotal(){
    const total = carrito.reduce(
        (acc,prod)=> acc + (prod.precio * prod.cantidad),
        0
    );

    totalHTML.textContent = `Total: $${total}`;
}

// CONTADOR
function actualizarContador(){
    contadorCarrito.textContent = `🛒 ${carrito.length}`;
}

// STORAGE
function guardarStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// VACIAR
function vaciarCarrito(){
    carrito = [];
    guardarStorage();
    renderCarrito();
}

// FINALIZAR COMPRA
function finalizarCompra(){

    if(carrito.length === 0){
        Swal.fire("El carrito está vacío");
        return;
    }

    formulario.style.display = "block";
}

// VALIDACIONES FORM
formulario.addEventListener("submit", (e) => {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const direccion = document.getElementById("direccion").value.trim();

    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{3,}$/;

    if(!nombreRegex.test(nombre)){
        Swal.fire("Nombre inválido");
        return;
    }

    if(!email.includes("@")){
        Swal.fire("Email inválido");
        return;
    }

    if(direccion.length < 5){
        Swal.fire("Dirección inválida");
        return;
    }

    Swal.fire({
        title:"Compra realizada",
        text:`Gracias por tu compra ${nombre}`,
        icon:"success"
    });

    vaciarCarrito();
    formulario.reset();
    formulario.style.display = "none";
});

// EVENTOS
document.getElementById("vaciar").addEventListener("click", vaciarCarrito);
document.getElementById("comprar").addEventListener("click", finalizarCompra);

// INICIO
renderCarrito();