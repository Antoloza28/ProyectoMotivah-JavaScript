const productos = [
    { nombre: "Remera", precio: 5000 },
    { nombre: "Pantalón", precio: 12000 },
    { nombre: "Zapatillas", precio: 25000 }
];

let totalCompra = 0;

// =====================
// FUNCIONES
// =====================

// 1️⃣ Mostrar productos disponibles
function mostrarProductos() {
    let mensaje = "Productos disponibles:\n\n";

    for (let i = 0; i < productos.length; i++) {
        mensaje += `${i + 1}. ${productos[i].nombre} - $${productos[i].precio}\n`;
    }

    mensaje += "\nIngresá el número del producto que querés comprar.";
    return mensaje;
}

// 2️⃣ Calcular subtotal
function calcularSubtotal(precio, cantidad) {
    return precio * cantidad;
}

// 3️⃣ Mostrar resultado final
function mostrarResultado(total) {
    alert("🛒 Compra finalizada\n\nEl total a pagar es: $" + total);
    console.log("Total final de la compra: $" + total);
}

// =====================
// LÓGICA PRINCIPAL
// =====================

function iniciarSimulador() {
    
    console.table(productos);

    let continuar = true;

    while (continuar) {
        let opcion = prompt(mostrarProductos());

        if (opcion === null) {
            break;
        }

        opcion = parseInt(opcion);

        if (opcion >= 1 && opcion <= productos.length) {
            let cantidad = prompt(
                "Ingresá la cantidad de " + productos[opcion - 1].nombre
            );

            cantidad = parseInt(cantidad);

            if (cantidad > 0) {
                let subtotal = calcularSubtotal(
                    productos[opcion - 1].precio,
                    cantidad
                );

                totalCompra += subtotal;

                console.log(
                    `Producto: ${productos[opcion - 1].nombre} | Cantidad: ${cantidad} | Subtotal: $${subtotal}`
                );
            } else {
                alert("Cantidad inválida");
            }
        } else {
            alert("Opción inválida");
        }

        continuar = confirm("¿Querés agregar otro producto?");
    }

    mostrarResultado(totalCompra);
}

// =====================
// EJECUCIÓN
// =====================

iniciarSimulador();
