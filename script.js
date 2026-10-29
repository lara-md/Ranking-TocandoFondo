const supabaseUrl = "https://mamimvvxdstykucejwiw.supabase.co";
const supabaseKey = "sb_publishable_LWLSwF7E80Nfx7yXuICO0A_AMUCgFHD";

async function obtenerPartidas() {
    const respuesta = await fetch(
        supabaseUrl + "/rest/v1/partidas?select=*&order=tiempo.desc",
        {
            headers: {
                "apikey": supabaseKey,
                "Authorization": "Bearer " + supabaseKey
            }
        }
    );

    const partidas = await respuesta.json();

    console.log(partidas);
}

async function obtenerPartidas() {
    const respuesta = await fetch(
        supabaseUrl + "/rest/v1/partidas?select=*&order=tiempo.desc",
        {
            headers: {
                "apikey": supabaseKey,
                "Authorization": "Bearer " + supabaseKey
            }
        }
    );

    const partidas = await respuesta.json();

    const top6 = document.getElementById("ranking-top6");
    const damas = document.getElementById("ranking-damas");
    const plebeyas = document.getElementById("ranking-plebeyas");

    partidas.forEach((partida, indice) => {

        const posicion = indice + 1;

        const tarjeta = document.createElement("div");

        if (posicion <= 3) {
            tarjeta.className = "card1";
        } else if (posicion <= 6) {
            tarjeta.className = "card456";
        } else if (posicion <= 15) {
            tarjeta.className = "card-damas";
        } else {
            tarjeta.className = "card-plebe";
        }

        tarjeta.innerHTML = `
            <h1>${posicion}</h1>
            <h2>${partida.tiempo} segundos</h2>
        `;

        if (posicion <= 6) {
            top6.appendChild(tarjeta);
        } else if (posicion <= 15) {
            damas.appendChild(tarjeta);
        } else {
            plebeyas.appendChild(tarjeta);
        }
    });
}

async function obtenerPartidas() {
    const respuesta = await fetch(
        supabaseUrl + "/rest/v1/partidas?select=*&order=tiempo.desc",
        {
            headers: {
                "apikey": supabaseKey,
                "Authorization": "Bearer " + supabaseKey
            }
        }
    );

    const partidas = await respuesta.json();

    const top6 = document.getElementById("ranking-top6");
    const damas = document.getElementById("ranking-damas");
    const plebeyas = document.getElementById("ranking-plebeyas");

    for (let indice = 0; indice < partidas.length; indice++) {

        const partida = partidas[indice];
        const posicion = indice + 1;

        const tarjeta = document.createElement("div");

        if (posicion <= 3) {
            tarjeta.className = "card1";
        } else if (posicion <= 6) {
            tarjeta.className = "card456";
        } else if (posicion <= 15) {
            tarjeta.className = "card-damas";
        } else {
            tarjeta.className = "card-plebe";
        }

        const titulosTop6 = [
            "Emperatriz de los océanos",
            "Reina del mar",
            "Princesa de la bahía",
            "Duquesa del arrecife",
            "Condesa de las profundidades",
            "Vizcondesa de las algas"
        ];

        let titulo = "";

        if (posicion <= 6) {
            titulo = titulosTop6[posicion - 1];
        }

        tarjeta.innerHTML = `
            <h1>${posicion}</h1>
            <h2>${titulo}</h2>
            <p>${partida.tiempo} seg</p>
        `;

        if (partida.captura) {

            const urlImagen = await obtenerUrlImagen(partida.captura);

            if (urlImagen) {
                const imagen = document.createElement("img");

                imagen.src = urlImagen;
                imagen.alt = "Captura del jugador";

                tarjeta.appendChild(imagen);
            }
        }

        if (posicion <= 6) {
            top6.appendChild(tarjeta);
        } else if (posicion <= 15) {
            damas.appendChild(tarjeta);
        } else {
            plebeyas.appendChild(tarjeta);
        }
    }
}

obtenerPartidas();

async function obtenerUrlImagen(nombreArchivo) {
    const respuesta = await fetch(
        supabaseUrl + "/storage/v1/object/sign/capturas",
        {
            method: "POST",
            headers: {
                "apikey": supabaseKey,
                "Authorization": "Bearer " + supabaseKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                paths: [nombreArchivo],
                expiresIn: 3600
            })
        }
    );

    const datos = await respuesta.json();

    console.log("Respuesta de Supabase:", datos);

    if (!respuesta.ok) {
        console.error("Error generando URL:", respuesta.status, datos);
        return null;
    }

    return datos[0].signedURL.startsWith("http")
    ? datos[0].signedURL
    : supabaseUrl + "/storage/v1" + datos[0].signedURL;
}

