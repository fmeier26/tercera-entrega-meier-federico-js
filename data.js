let productos = [
    { id: 1, nombre: "Torta Customizada", precio: 5000, categoria: "Pasteleria Creativa", img: "./img/XXX/20201214_094515.jpg" },
    { id: 2, nombre: "Papa Noel", precio: 11000, categoria: "Navidad", img: "./img/XXX/20201224_120128.jpg"},
    { id: 3, nombre: "Baby Shark", precio: 15000, categoria: "Cumpleaños", img: "./img/XXX/IMG_20210417_134112_340.jpg"},
    { id: 4, nombre: "Viajes", precio: 7500, categoria: "Cumpleaños", img: "./img/XXX/PSX_20210501_121026.jpg"},
    { id: 5, nombre: "Rey Leon", precio: 6000, categoria: "Pasteleria Creativa", img: "./img/XXX/PSX_20210705_094047.jpg"},
    { id: 6, nombre: "Osito", precio: 4000, categoria: "Pasteleria Creativa", img: "./img/XXX/PSX_20211122_203518.jpg"},
    { id: 7, nombre: "Rey de copas", precio: 14000, categoria: "Pasteleria Creativa", img: "./img/XXX/20201225_184445.jpg"},
    { id: 8, nombre: "Cheesecake", precio: 24000, categoria: "Pasteleria Creativa", img: "./img/XXX/PSX_20210526_132947.jpg"},
]

let contenedorCarrito = document.getElementById("contenedorCarro")
let contenedor = document.getElementById("contenedorProductos")
renderizarProductos(productos)
let carro = []
if (localStorage.getItem("carro")) {
    carro = JSON.parse(localStorage.getItem("carro"))
}
renderizarCarro(carro)
let buscador = document.getElementById("buscador")
buscador.addEventListener("input", renderizarProductosFiltrados)

function renderizarProductosFiltrados(e) {
    let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.categoria.toLowerCase().includes(buscador.value.toLowerCase()))
    renderizarProductos(productosFiltrados)
    
}

function renderizarProductos(array) {
    contenedor.innerHTML= ""
    for (const producto of array) {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "col-lg-3"
        tarjetaProducto.id = producto.id
           tarjetaProducto.innerHTML = `
           <div class="row">
                <div class="col-sm">
                    <div class="card" style="width: 16rem;">
                    <img class="card-img-top" src="${producto.img}" alt="Card image cap">
                    <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Cuesta $${producto.precio}</p>
                    <button class="boton" id=${producto.id}>Añadir al carrito</button>
                    </div>
                </div>
            </div>

        `
    
        contenedor.append(tarjetaProducto)
    }

    let botones = document.getElementsByClassName("boton")
    for (const boton of botones) {
        boton.addEventListener ("click", agregarAlCarro)
                
    }
    
}

function agregarAlCarro(e) {
    let productoBuscado = productos.find(producto=> producto.id == e.target.id)
    let posicionDelProductoBuscado = carro.findIndex(producto=> producto.id == productoBuscado.id)
    if (posicionDelProductoBuscado != -1) {
        carro[posicionDelProductoBuscado].unidades++ 
        carro[posicionDelProductoBuscado].subtotal = carro[posicionDelProductoBuscado].unidades * carro[posicionDelProductoBuscado].precioUnitario       
    } else {
    carro.push({id: productoBuscado.id, nombre: productoBuscado.nombre, precioUnitario: productoBuscado.precio, unidades: 1, subtotal: productoBuscado.precio })
    
    }
    localStorage.setItem("carro", JSON.stringify(carro))
    renderizarCarro(carro)
    
}

function renderizarCarro(infoDeProductos) {
    contenedorCarrito.innerHTML=""
    for (const producto of infoDeProductos) {
        contenedorCarrito.innerHTML += `
        <div class="flex">
        <p>${producto.nombre} (nombre torta)</p>
        <p>${producto.precioUnitario} pesos argentinos</p>
        <p>${producto.unidades} unidades</p>
        <p>Subtotal ${producto.subtotal} pesos argentinos </p>
        
        </div>
       
        `
       
        
    }
    
  
    let totalDeLaCompra = carro.reduce((acc, valorActual) =>acc + valorActual.subtotal, 0)
    contenedorCarrito.innerHTML += `
    <h3>TOTAL $${totalDeLaCompra}</h3>

    `
    
}

let finalizarCompra = document.getElementById("comprar")
finalizarCompra.addEventListener ("click", () => {
    localStorage.removeItem("carro")
    carro = []
    renderizarCarro (carro)
        }
    )
