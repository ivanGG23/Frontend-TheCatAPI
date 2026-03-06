const gatoGrid = document.getElementById('gatoGrid');
const btnCargar = document.getElementById('btnCargar');
const limitSelect = document.getElementById('limitSelect');
const mensaje = document.getElementById('mensaje');

const mostrarMensaje = (texto) => {
    mensaje.textContent = texto;
    mensaje.classList.remove('hidden');
};

const ocultarMensaje = () => {
    mensaje.classList.add('hidden');
};

const crearTarjetaGato = (gato) => {
    const div = document.createElement('div');
    div.className = 'bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition';
    div.innerHTML = `
        <img 
            src="${gato.url}" 
            alt="Gato random"
            class="w-full h-48 object-cover"
        />
        ${gato.breeds?.length > 0 ? `
            <div class="p-3">
                <p class="text-sm font-semibold text-gray-700">${gato.breeds[0].name}</p>
                <p class="text-xs text-gray-400">${gato.breeds[0].origin}</p>
            </div>
        ` : ''}
    `;
    return div;
};

const cargarGatos = async () => {
    const limit = limitSelect.value;
    btnCargar.disabled = true;
    btnCargar.textContent = 'Cargando...';
    gatoGrid.innerHTML = '';
    ocultarMensaje();

    try {
        const gatos = await getGatosRandom(limit);
        if (gatos.length === 0) {
            mostrarMensaje('No se encontraron gatos');
            return;
        }
        gatos.forEach(gato => {
            gatoGrid.appendChild(crearTarjetaGato(gato));
        });
    } catch (error) {
        mostrarMensaje('Error al cargar los gatos. ¿Está corriendo el backend?');
    } finally {
        btnCargar.disabled = false;
        btnCargar.textContent = 'Cargar gatos';
    }
};

document.addEventListener('DOMContentLoaded', cargarGatos);
btnCargar.addEventListener('click', cargarGatos);