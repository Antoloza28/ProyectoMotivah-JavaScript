// =====================
// VARIABLES
// =====================

let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// =====================
// SELECTORES
// =====================

const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("carrito");
const totalHTML = document.getElementById("total");

// =====================
// FETCH (JSON)
// =====================

fetch("../data/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        renderProductos();
    });

// =====================
// FUNCIONES
// =====================

function renderProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(prod => {
        const div = document.createElement("div");

        div.innerHTML = `
            ${prod.nombre} - $${prod.precio}
            <button onclick="agregarAlCarrito(${prod.id})">Agregar</button>
        `;

        contenedorProductos.appendChild(div);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);

    guardarStorage();
    renderCarrito();

    Swal.fire({
        title: "Agregado al carrito",
        text: producto.nombre,
        icon: "success"
    });
}

function renderCarrito() {
    contenedorCarrito.innerHTML = "";

    carrito.forEach(prod => {
        const li = document.createElement("li");
        li.textContent = `${prod.nombre} - $${prod.precio}`;
        contenedorCarrito.appendChild(li);
    });

    actualizarTotal();
}

function actualizarTotal() {
    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
    totalHTML.textContent = `Total: $${total}`;
}

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function vaciarCarrito() {
    carrito = [];
    guardarStorage();
    renderCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        Swal.fire("El carrito está vacío");
        return;
    }

    Swal.fire({
        title: "Compra realizada",
        text: "Gracias por tu compra",
        icon: "success"
    });

    vaciarCarrito();
}

// =====================
// EVENTOS
// =====================

document.getElementById("vaciar").addEventListener("click", vaciarCarrito);
document.getElementById("comprar").addEventListener("click", finalizarCompra);

// =====================
// INICIO
// =====================

renderCarrito();