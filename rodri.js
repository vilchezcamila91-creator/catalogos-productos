
// ==========================================
// DATOS DE LOS PRODUCTOS
// ==========================================

const productsData = {

    arroz: {
        title: "Arroz Paquete 1kg",
        price: "$1.800",
        image: "https://imgs.search.brave.com/QSI2VrNGKgbNN3RqdUEfOj9waT6BD9sPKEwOzmQegMc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzc0NTMzMy1NTEE0/ODQ3NTYzNTU3MF8x/MjIwMjEtVi53ZWJw",
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


// ==========================================
// BUSCADOR DE PRODUCTOS
// ==========================================

function filterProducts() {

    const searchInput = document.getElementById("searchInput");

    const textoBuscado = searchInput.value
        .toLowerCase()
        .trim();

    const productos = document.querySelectorAll(".product-card");

    productos.forEach(function(producto) {

        const nombre = producto
            .querySelector("h2")
            .textContent
            .toLowerCase()
            .trim();

        if (nombre.includes(textoBuscado)) {

            producto.style.display = "";

        } else {

            producto.style.display = "none";

        }

    });
}


// ==========================================
// RECONOCIMIENTO DE VOZ
// ==========================================




// Comprobar compatibilidad del navegador

if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    recognition = new SpeechRecognition();

    recognition.lang = "es-AR";

    recognition.continuous = false;

    recognition.interimResults = false;


    // Cuando empieza a escuchar

    recognition.onstart = function() {

        const button = document.getElementById("voiceButton");
        const status = document.getElementById("voiceStatus");

        button.classList.add("listening");

        status.textContent = "Escuchando... Decí el nombre del producto.";

    };


    // Cuando recibe lo que dijo la persona

    recognition.onresult = function(event) {

        const resultado = event.results[0][0].transcript;

        const searchInput = document.getElementById("searchInput");

        // Colocar el texto reconocido en el buscador

        searchInput.value = resultado;

        // Ejecutar la búsqueda

        filterProducts();

        const status = document.getElementById("voiceStatus");

        status.textContent = "Buscando: " + resultado;

    };


    // Cuando termina de escuchar

    recognition.onend = function() {

        const button = document.getElementById("voiceButton");

        button.classList.remove("listening");

    };


    // Si ocurre un error

    recognition.onerror = function(event) {

        const button = document.getElementById("voiceButton");
        const status = document.getElementById("voiceStatus");

        button.classList.remove("listening");

        if (event.error === "not-allowed") {

            status.textContent =
                "El navegador no tiene permiso para utilizar el micrófono.";

        } else if (event.error === "no-speech") {

            status.textContent =
                "No se detectó ninguna voz. Intentá nuevamente.";

        } else {

            status.textContent =
                "No se pudo utilizar el reconocimiento de voz.";

        }

    };

}


// ==========================================
// ACTIVAR BÚSQUEDA POR VOZ
// ==========================================

function startVoiceSearch() {

    const status = document.getElementById("voiceStatus");

    if (!recognition) {

        status.textContent =
            "Tu navegador no admite reconocimiento de voz.";

        return;
    }

    try {

        recognition.start();

    } catch (error) {

        console.log("El reconocimiento ya está activo.");

    }
}

// ==========================================
// BUSQUEDA POR VOZ
// ==========================================

let recognition = null;
let isListening = false;

if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    recognition = new SpeechRecognition();

    recognition.lang = "es-AR";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function () {

        isListening = true;

        document.getElementById("voiceButton")
            .classList.add("listening");

        document.getElementById("voiceStatus").textContent =
            "Escuchando... Decí el nombre del producto.";
    };

    recognition.onresult = function (event) {

        const texto = event.results[0][0].transcript.trim();

        const buscador = document.getElementById("searchInput");

        buscador.value = texto;

        // Ejecutar la búsqueda
        filterProducts();

        document.getElementById("voiceStatus").textContent =
            "Buscando: " + texto;
    };

    recognition.onend = function () {

        isListening = false;

        document.getElementById("voiceButton")
            .classList.remove("listening");
    };

    recognition.onerror = function (event) {

        isListening = false;

        document.getElementById("voiceButton")
            .classList.remove("listening");

        if (event.error === "not-allowed") {

            document.getElementById("voiceStatus").textContent =
                "Se necesita permiso para utilizar el micrófono.";

        } else if (event.error === "no-speech") {

            document.getElementById("voiceStatus").textContent =
                "No se detectó ninguna voz. Intentá nuevamente.";

        } else if (event.error === "aborted") {

            document.getElementById("voiceStatus").textContent =
                "";

        } else {

            document.getElementById("voiceStatus").textContent =
                "No se pudo utilizar el micrófono.";
        }
    };
}


// ==========================================
// INICIAR BUSQUEDA POR VOZ
// ==========================================

function startVoiceSearch() {

    if (!recognition) {

        document.getElementById("voiceStatus").textContent =
            "Tu navegador no admite búsqueda por voz.";

        return;
    }

    // Evita iniciar el micrófono mientras ya está escuchando
    if (isListening) {
        return;
    }

    try {

        recognition.start();

    } catch (error) {

        console.log("Error al iniciar la búsqueda por voz:", error);

    }
}



// ==========================================
// ABRIR MODAL
// ==========================================

function openModal(productId) {

    const data = productsData[productId];

    if (!data) {
        return;
    }

    document.getElementById("modalTitle").textContent = data.title;

    document.getElementById("modalPrice").textContent = data.price;

    document.getElementById("modalImage").src = data.image;

    document.getElementById("modalDescription").textContent = data.description;

    document.getElementById("modalIngredients").textContent = data.ingredients;

    document.getElementById("modalContent").textContent = data.content;

    document.getElementById("modalStorage").textContent = data.storage;

    document.getElementById("productModal").style.display = "flex";
}


// ==========================================
// CERRAR MODAL
// ==========================================

function closeModal() {

    document.getElementById("productModal").style.display = "none";

}


// Cerrar modal haciendo clic afuera

window.onclick = function(event) {

    const modal = document.getElementById("productModal");

    if (event.target === modal) {

        closeModal();

    }

};

