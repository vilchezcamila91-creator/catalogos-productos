
/* ==========================================
DATOS DE LOS PRODUCTOS
========================================== */


const productsData = {


Alfajores: {
    title: "Alfajores Ganash 12 unidades",
    price: "$43.000",
    image: "https://d22fxaf9t8d39k.cloudfront.net/61ba67459061a89360721120a4d6a03b0ae222d6f5a5a74a2e9937f46a12114832857.png",
    description: "Alfajor relleno de dulce de leche con corazón de calafate bañado en choco semiamargo",
    ingredients: "dulce de leche repostero,frutos rojos y bañados en chocolate semi amargo",
    content: "70gr",
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
    title: "Aceite de oliva ",
    price: "$3.000",
    image: "https://origenchubut.gob.ar/wp-content/uploads/2024/08/Origen-Chubut-Ketrawe-aceite-de-oliva-5.jpg",
    description: "Aceite de oliva extra virgen ",
    ingredients: "100% Aceite de oliva refinado, Vitamina E.",
    content: "500 centimetros cubicos",
    storage: "Mantener el envase cerrado en un lugar fresco."
},


Alcaparras: {
    title: "Frasco de Alcaparras de 70g",
    price: "$2.000",
    image: "https://scontent.frel1-1.fna.fbcdn.net/v/t1.6435-9/70756861_103021771093933_7275987646705303552_n.jpg?stp=dst-jpg_tt6&cstp=mx360x360&ctp=s360x360&_nc_cat=106&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=aJkay5QuBJsQ7kNvwEma40T&_nc_oc=AdrYDt88QH2yB096hnE_Efa7d3OBLw7eskeSN7nD1GtzTHXdmtXiUXpO3vQg4jMpk-4&_nc_zt=23&_nc_ht=scontent.frel1-1.fna&_nc_gid=ztel4cUuNQ81Nxq7Mwemyw&_nc_ss=7b2a8&oh=00_AQMd2frixJeVFS1RnMBP4_CfYccvCqXsKsVQKHrN5-4AWQ&oe=6AF8D395",
    description: "Alcaparras de muy buena calidad",
    ingredients: "vinagre de alcohol sin tacc",
    content: "70 Gramos",
    storage: "Conservar en un lugar fresco."
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
