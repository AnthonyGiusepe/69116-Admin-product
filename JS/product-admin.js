const products = [
    {
        createdAt: -172800000,
        name: "Nike Juniper Trail 2 GORE-TEX PRO",
        image: "https://nikearprod.vtexassets.com/arquivos/ids/877894-1200-1200?width=1200&height=1200&aspect=true",
        price: 199999,
        description: "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
        category: "mountain",
        id: "38"
    },
    {
        createdAt: 1717113600000,
        name: "Clifton 9",
        image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1660043072-hoka-bondi-8-zapatillas-running-1660043036.png?crop=1.00xw:0.823xh;0,0.0783xh&resize=980:*",
        price: 100000,
        description: "La novena versión de nuestra galardonada gama Clifton ofrece una versión más ligera y con más amortiguación que nunca. Las nuevas Clifton 9 reducen el peso al tiempo que añaden 3 mm de altura; además, ofrecen una experiencia revitalizada bajo los pies con una nueva espuma con capacidad de respuesta y un diseño de suela mejorado",
        category: "running",
        id: "43"
    },
    {
        createdAt: 1716076800000,
        name: "Nike Invencible 3 Pro",
        image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/28810afe-6b6a-4f6a-beb4-701a3539bb02/invincible-3-zapatillas-de-running-asfalto-9lqlcK.png",
        price: 365100,
        description: "Test de imagenmmmmmm",
        category: "running",
        id: "44"
    },
    {
        createdAt: -27076636800000,
        name: "Nike Air Force 1 07",
        image: "https://nikearprod.vtexassets.com/arquivos/ids/659742-1200-1200?width=1200&height=1200&aspect=true",
        price: 209999,
        description: "La luminosidad sigue viva con este calzado de básquetbol original. La fusión de la comodidad de la duela y un estilo externo a la cancha le da un giro fresco a lo que mejor conoces: una confección inspirada en los años 80, detalles audaces y un estilo basquetbolero puro.",
        category: "moda",
        id: "46"
    },
    {
        createdAt: 1719276313261,
        name: "Nike Pegasus 39 Shield",
        image: "https://static.nike.com/a/images/t_default/c7cee966-efba-4fc4-99ce-ab2ccacf9f81/infinityrn-4-gore-tex-zapatillas-de-running-asfalto-impermeables-BcdT0P.png",
        price: 167999,
        description: "Tu caballo alado regresa para ayudarte a avanzar bajo la lluvia. El acabado repelente al agua te ayuda a mantener los pies secos, mientras que una sensación cómoda, similar al tejido Fleece, en el interior mantiene los pies abrigados para carreras en climas",
        category: "running",
        id: "47"
    },
    {
        createdAt: 1648598400000,
        name: "Nike SB Dunk Low Pro",
        image: "https://nikearprod.vtexassets.com/arquivos/ids/914361-1200-1200?width=1200&height=1200&aspect=true",
        price: 209000,
        description: "El Nike SB Dunk Low Pro ofrece el aspecto icónico del Dunk con un estilo de perfil bajo. La unidad Zoom Air en el talón y la lengüeta acolchada proporcionan un nivel de comodidad ideal para practicar skate.",
        category: "moda",
        id: "48"
    }
]

let isEditing = false

const tableBodyHTML = document.getElementById("table-body")
const formAdminHTML = document.getElementById("form-admin")
const btnSubmitHTML = document.querySelector("button[type='submit']")
const btnsSortHTML = document.querySelectorAll("button[data-sort]")

btnsSortHTML.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        products.sort((a, b) => {
            if(a.name > b.name) return 1;
            if(a.name < b.name) return -1;
            return 0;
        })

        renderProducts(products)
    })
})

//Pintar todos los productos inicialmente

renderProducts(products)

function renderProducts(ARRAY_TO_RENDER) {

    tableBodyHTML.innerHTML = '';

    let total = 0;


    ARRAY_TO_RENDER.forEach((prod) => {

        total += prod.price
        tableBodyHTML.innerHTML += `<tr>
    <td class="product-img"><img src="${prod.image}" alt="${prod.name}"></td>
    <td class="product-name">${prod.name}</td>
    <td class="product-description">
        <div class="description" title="${prod.description}">
            ${prod.description}
        </div>
    </td>
    <td class="product-date">${formatTimestampToDate(prod.createdAt)}</td>
    <td class="product-price">S/. ${prod.price}.00</td>
    <td class="product-actions">
        <button class="btn btn-primary btn-sm" onclick="editProduct('${prod.id}')">
        <i class="fa-solid fa-pen">
        </i></button>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct('${prod.id}')">
        <i class="fa-solid fa-trash">
        </i></button>
    </td>
    </tr>`

    }) // Fin del forEach

    tableBodyHTML.innerHTML += `<tr>
    <td colspan ="4" class="text-end">TOTAL</td>
    <td colspan ="2" class="fw-bold">S/. ${total}.00</td>
    </tr>`
}

// Recorrer el array y hacer un console.log de cada producto


//llamar una funcion especifica para borrar productos

function deleteProduct(identificador) {

    //obtener el id del producto a eliminar

    console.log("Id recibido", identificador)

    const resultado = confirm("Realmente desea borrar el producto")

    if (!resultado){
        return
    }

    //Porder identificar el indice de producto a eliminar a traves de un metodo.

    const index = products.findIndex(producto => {

        if (identificador === producto.id) {
            return true
        } else {
            false
        }
    })

    //Eliminar el producto del array con splice en base a su ubicacion // Array.splice (indice, 1) -> Elimina un elemento array
    products.splice(index, 1)

    renderProducts(products)

}

// #Search PRODUCT


function searchProduct(evt) {
    console.log(evt.target.value)

    let text = evt.target.value.toLowerCase();


    const filterProduct = products.filter((productito) => {

        const name = productito.name.toLowerCase();
        const descripcion = productito.description.toLowerCase();

        if (name.includes(text) || descripcion.includes(text)) {
            return true
        }

    })

    renderProducts(filterProduct)

}


formAdminHTML.addEventListener('submit', (evt) => {
    //prevenir su comportamiento por defecto del formulario
    evt.preventDefault();

    const elem = evt.target.elements;

    console.log(elem.date.value)

    const idInput = elem.id.value;

    // const ID = id ? id : crypto.randomUUID()

    const nuevoProducto = {
        name: elem.name.value,

        // price: +elem.price.value,
        price: elem.price.valueAsNumber || 0,

        category: elem.category.vale,
        description: elem.description.value,
        image: elem.image.value,
        // createdAt: elem.date.valueAsNumber,
        createdAt: new Date(elem.date.value).getTime(),
        id: idInput ? id : crypto.randomUUID()
    }

    console.log(nuevoProducto)

    if (idInput) {
        // const index = products.findIndex(prod => prod.id === id);

        const indice = products.findIndex(prod => {
            if (id === prod.id) {
                return true
            }
        });

        products[indice] = nuevoProducto

    } else {
        products.push(nuevoProducto)
    }

    elem.id.value = ''

    renderProducts(products)

    formAdminHTML.reset();
    elem.name.focus()

    btnSubmitHTML.innerText = "Agregar";
    btnSubmitHTML.classList.remove("btn-success")

})

formAdminHTML.addEventListener('change', () => {
    console.log(formAdminHTML.checkVisibility())
})

function editProduct(idUpdate) {

    console.log("Id para actualizar", idUpdate)

    const productoEdit = products.find(producto => {
        if (idUpdate === producto.id) {
            return true
        }
    })

    //Pintar y modificar btn

    btnSubmitHTML.innerHTML = "Editar Producto"
    btnSubmitHTML.classList.add('btn-success')



    const elem = formAdminHTML.elements;
    //rellenar el formulario con esos datos

    elem.id.value = productoEdit.id

    elem.name.value = productoEdit.name;

    elem.price.value = productoEdit.price;

    elem.description.value = productoEdit.description;

    elem.category.value = productoEdit.category;

    elem.image.value = productoEdit.image;

    //transformamos el formato timestamp milisegundos a un formato createdAt.
    elem.createdAt.value = formatTimestampToInputDate(productoEdit.createdAt)

}



