
/* ==========================================
DATOS DE LOS PRODUCTOS
========================================== */


const productsData = {


arroz: {
    title: "Arroz Paquete 1kg",
    price: "$1.800",
    image: "https://imgs.search.brave.com/GpII6oqa16OJ-X9y1WUeiD6xn2L6FwlMT6LRYW5HTpw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzYyOTMyMC1NTEE3/Njc2MzI2NTU4Ml8w/NjIwMjQtVi53ZWJw",
    description: "Arroz largo fino tipo 00000. Seleccionado granos de alta calidad, libre de gluten y con el punto justo de almidón para garantizar cocción uniforme.",
    ingredients: "100% Granos de arroz pulido libre de TACC.",
    content: "1000g (1 kg)",
    storage: "Conservar en un lugar fresco, seco y al resguardo de la luz solar directa."
},


fideos: {
    title: "Fideos Tallarines 500g",
    price: "$1.200",
    image: "https://imgs.search.brave.com/yB-1zYSGswSBsEk1l1FB3_1okNHoyGwqU78W_6KHbKY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF85/NDc4MDctTUxBNDY4/OTgxNjA4ODBfMDcy/MDIxLVYud2VicA",
    description: "Fideos secos elaborados a base de sémola de trigo candeal de grano duro.",
    ingredients: "Sémola de trigo candeal, agua, huevo en polvo.",
    content: "500g",
    storage: "Mantener en su paquete original en ambiente seco."
},


mermelada: {
    title: "Mermelada casera de cereza",
    price: "$3.000",
    image: "https://imgs.search.brave.com/u8r8pGV75OJ8zPbgot7bNhqcktStXBbeB-ZcIS2HDMs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bGF2aWVqYWZhYnJp/Y2EuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy9DZXJlemEtQ1Mt/ZnJvbnRhbF9SVF8u/anBnLndlYnA",
    description: "Mermelada casera de cerezas seleccionadas específicamente.",
    ingredients: "Cerezas cosechadas, azúcar y zumo de limón.",
    content: "1kg",
    storage: "Mantener en su frasco en un ambiente fresco."
},


aceite: {
    title: "Aceite de Girasol 1.5L",
    price: "$3.000",
    image: "https://imgs.search.brave.com/V1gupAqOKJS6BrdELaIOIexUj1b1USMQmKL4L4Qcegg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdXBl/cnRvcGFyLnZ0ZXhh/c3NldHMuY29tL2Fy/cXVpdm9zL2lkcy8x/NTkzMjQtMjI2LTIy/Nj92PTYzODkwNTA5/NDM5MjQ3MDAwMCZ3/aWR0aD0yMjYmaGVp/Z2h0PTIyNiZhc3Bl/Y3Q9dHJ1ZQ",
    description: "Aceite 100% puro de girasol refinado.",
    ingredients: "100% Aceite de girasol refinado, Vitamina E.",
    content: "1.5 Litros",
    storage: "Mantener el envase cerrado en un lugar fresco."
},


azucar: {
    title: "Azúcar Paquete 1kg",
    price: "$2.000",
    image: "https://imgs.search.brave.com/Dmw1EZLkNTwZVVb_eZV74i1iQbNY28n_W94x4j-HC3Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vU19RX05QXzJY/Xzc3ODYwMC1NTFU3/MjU2NjI0MjAyMl8x/MTIwMjMtVi53ZWJw",
    description: "Azúcar blanca de primera calidad.",
    ingredients: "100% Azúcar de caña.",
    content: "1000g (1 kg)",
    storage: "Conservar en un lugar fresco, seco y alejado de la humedad."
},


almendra: {
    title: "Almendras Paquete 500g",
    price: "$2.500",
    image: "https://imgs.search.brave.com/sR5N-lsiFKY2rqE6GGw0QJ6xjLVX44MIXRifbuFvR2o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFBcnpnak5UMkwu/anBn",
    description: "Almendras seleccionadas de primera calidad.",
    ingredients: "100% Almendras.",
    content: "500g",
    storage: "Conservar en un lugar fresco y seco."
}


};


/* ==========================================
ELEMENTOS DEL DOM
========================================== */


const searchInput = document.getElementById("searchInput");
const voiceButton = document.getElementById("voiceButton");
const voiceStatus = document.getElementById("voiceStatus");
const searchResults = document.getElementById("searchResults");
const noResults = document.getElementById("noResults");


const modal = document.getElementById("productModal");
const closeModalButton = document.getElementById("closeModalButton");


const productCards = document.querySelectorAll(".product-card");


let recognition = null;
let isListening = false;
let lastFocusedElement = null;


/* ==========================================
BUSCADOR
========================================== */


function normalizeText(text) {
return text
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g, "");
}


function filterProducts() {


const textoBuscado = normalizeText(searchInput.value.trim());


let cantidadVisible = 0;


productCards.forEach(function(producto) {


    const nombre = producto.querySelector("h2").textContent;
    const descripcion = producto.querySelector(".description").textContent;


    const textoProducto = normalizeText(
        nombre + " " + descripcion
    );


    const coincide = textoProducto.includes(textoBuscado);


    producto.hidden = !coincide;


    if (coincide) {
        cantidadVisible++;
    }
});


if (textoBuscado === "") {


    searchResults.textContent =
        `Se muestran ${productCards.length} productos.`;


} else if (cantidadVisible === 0) {


    searchResults.textContent =
        "No se encontraron productos.";


} else {


    searchResults.textContent =
        `Se encontraron ${cantidadVisible} productos.`;
}


noResults.hidden = cantidadVisible !== 0;


}


/* ==========================================
RECONOCIMIENTO DE VOZ
========================================== */


function setupVoiceRecognition() {


if (
    !("SpeechRecognition" in window) &&
    !("webkitSpeechRecognition" in window)
) {
    voiceButton.disabled = true;
    voiceButton.setAttribute(
        "aria-label",
        "La búsqueda por voz no está disponible"
    );


    voiceStatus.textContent =
        "La búsqueda por voz no está disponible en este navegador.";


    return;
}


const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


recognition = new SpeechRecognition();


recognition.lang = "es-AR";
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;


recognition.onstart = function() {


    isListening = true;


    voiceButton.classList.add("listening");


    voiceButton.setAttribute(
        "aria-label",
        "Escuchando. Decí el nombre del producto."
    );


    voiceStatus.textContent =
        "Escuchando... Decí el nombre del producto.";
};


recognition.onresult = function(event) {


    const resultado =
        event.results[0][0].transcript.trim();


    searchInput.value = resultado;


    filterProducts();


    voiceStatus.textContent =
        `Buscando: ${resultado}`;


    searchInput.focus();
};


recognition.onend = function() {


    isListening = false;


    voiceButton.classList.remove("listening");


    voiceButton.setAttribute(
        "aria-label",
        "Buscar producto por voz"
    );
};


recognition.onerror = function(event) {


    isListening = false;


    voiceButton.classList.remove("listening");


    voiceButton.setAttribute(
        "aria-label",
        "Buscar producto por voz"
    );


    if (event.error === "not-allowed") {


        voiceStatus.textContent =
            "Se necesita permiso para utilizar el micrófono.";


    } else if (event.error === "no-speech") {


        voiceStatus.textContent =
            "No se detectó ninguna voz. Intentá nuevamente.";


    } else if (event.error === "aborted") {


        voiceStatus.textContent = "";


    } else {


        voiceStatus.textContent =
            "No se pudo utilizar el reconocimiento de voz.";
    }
};


}


function startVoiceSearch() {


if (!recognition) {
    return;
}


if (isListening) {
    return;
}


try {


    recognition.start();


} catch (error) {


    console.error(
        "Error al iniciar el reconocimiento de voz:",
        error
    );
}


}


/* ==========================================
MODAL
========================================== */


function openModal(productId) {


const data = productsData[productId];


if (!data) {
    return;
}


lastFocusedElement = document.activeElement;


document.getElementById("modalTitle").textContent =
    data.title;


document.getElementById("modalPrice").textContent =
    data.price;


const modalImage =
    document.getElementById("modalImage");


modalImage.src = data.image;
modalImage.alt = `Imagen de ${data.title}`;


document.getElementById("modalDescription").textContent =
    data.description;


document.getElementById("modalIngredients").textContent =
    data.ingredients;


document.getElementById("modalContent").textContent =
    data.content;


document.getElementById("modalStorage").textContent =
    data.storage;


modal.hidden = false;


document.body.style.overflow = "hidden";


closeModalButton.focus();


}


function closeModal() {


modal.hidden = true;


document.body.style.overflow = "";


if (lastFocusedElement) {
    lastFocusedElement.focus();
}


}


/* ==========================================
EVENTOS DE LOS PRODUCTOS
========================================== */


productCards.forEach(function(producto) {


producto.addEventListener("click", function() {


    openModal(producto.dataset.product);


});


producto.addEventListener("keydown", function(event) {


    if (
        event.key === "Enter" ||
        event.key === " "
    ) {


        event.preventDefault();


        openModal(producto.dataset.product);
    }
});


});


/* ==========================================
EVENTOS DEL BUSCADOR
========================================== */


searchInput.addEventListener(
"input",
filterProducts
);


voiceButton.addEventListener(
"click",
startVoiceSearch
);


/* ==========================================
EVENTOS DEL MODAL
========================================== */


closeModalButton.addEventListener(
"click",
closeModal
);


modal.addEventListener("click", function(event) {


if (event.target === modal) {
    closeModal();
}


});


document.addEventListener("keydown", function(event) {


if (event.key === "Escape" && !modal.hidden) {


    closeModal();


}


});


/* ==========================================
INICIALIZACIÓN
========================================== */


setupVoiceRecognition();


filterProducts();


/* ==========================================
   MENÚ DE PRODUCTOS
========================================== */


const productMenuButton =
    document.getElementById("productMenuButton");


const productMenuList =
    document.getElementById("productMenuList");


const productMenuItems =
    document.querySelectorAll("[data-product-link]");




productMenuButton.addEventListener("click", function() {


    const estaAbierto =
        productMenuButton.getAttribute("aria-expanded") === "true";


    productMenuButton.setAttribute(
        "aria-expanded",
        String(!estaAbierto)
    );


    productMenuList.hidden = estaAbierto;


});




/* Abrir producto desde el menú */


productMenuItems.forEach(function(item) {


    item.addEventListener("click", function() {


        const productId =
            item.getAttribute("data-product-link");


        openModal(productId);


        productMenuList.hidden = true;


        productMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );


    });


});




/* Cerrar el menú al hacer clic fuera */


document.addEventListener("click", function(event) {


    const hizoClickDentro =
        productMenuButton.contains(event.target) ||
        productMenuList.contains(event.target);


    if (!hizoClickDentro) {


        productMenuList.hidden = true;


        productMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );
    }


});
