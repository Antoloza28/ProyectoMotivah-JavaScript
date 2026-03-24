let productos=[]
let carrito=JSON.parse(localStorage.getItem("carrito"))||[]

const contenedorProductos=document.getElementById("productos")
const carritoHTML=document.getElementById("carrito")
const totalHTML=document.getElementById("total")
const contadorCarrito=document.getElementById("contador-carrito")
const formulario=document.getElementById("formulario")

fetch("data/productos.json")
.then(res=>res.json())
.then(data=>{
productos=data
renderProductos()
})

function renderProductos(){
contenedorProductos.innerHTML=""

productos.forEach(prod=>{

const div=document.createElement("div")
div.classList.add("producto")

div.innerHTML=`
<h3>${prod.nombre}</h3>
<p>$${prod.precio}</p>
<button onclick="agregarAlCarrito(${prod.id})">Agregar</button>
`

contenedorProductos.appendChild(div)

})

}

function agregarAlCarrito(id){

const producto=productos.find(p=>p.id===id)

carrito.push(producto)

guardarStorage()
renderCarrito()

Swal.fire({
position:"top-end",
icon:"success",
title:"Producto agregado",
showConfirmButton:false,
timer:1000
})

}

function renderCarrito(){

carritoHTML.innerHTML=""

carrito.forEach((prod,index)=>{

const li=document.createElement("li")

li.innerHTML=`
${prod.nombre} - $${prod.precio}
<button onclick="eliminarProducto(${index})">❌</button>
`

carritoHTML.appendChild(li)

})

actualizarTotal()
actualizarContador()

}

function eliminarProducto(index){

carrito.splice(index,1)

guardarStorage()
renderCarrito()

}

function actualizarTotal(){

const total=carrito.reduce((acc,prod)=>acc+prod.precio,0)

totalHTML.textContent=`Total: $${total}`

}

function actualizarContador(){

contadorCarrito.textContent=`🛒 ${carrito.length}`

}

function guardarStorage(){

localStorage.setItem("carrito",JSON.stringify(carrito))

}

function vaciarCarrito(){

carrito=[]

guardarStorage()
renderCarrito()

}

function finalizarCompra(){

if(carrito.length===0){
Swal.fire("El carrito está vacío")
return
}

formulario.style.display="block"

}

formulario.addEventListener("submit",(e)=>{

 e.preventDefault()

 const nombre=document.getElementById("nombre").value

 Swal.fire({
 title:"Compra realizada",
 text:`Gracias por tu compra ${nombre}`,
 icon:"success"
 })

 vaciarCarrito()
 formulario.reset()
 formulario.style.display="none"

})

document.getElementById("vaciar").addEventListener("click",vaciarCarrito)

document.getElementById("comprar").addEventListener("click",finalizarCompra)

renderCarrito()