const razaSelect = document.getElementById('razaSelect');
const btnBuscar = document.getElementById('btnBuscar');
const gatoGrid = document.getElementById('gatoGrid');
const mensaje = document.getElementById('mensaje');
const infoRaza = document.getElementById('infoRaza');

const mostrarMensaje = (texto) => {
    mensaje.textContent = texto;
    mensaje.classList.remove('hidden');
};

const ocultarMensaje = () => mensaje.classList.add('hidden');

const cargarRazas = async () => {
    try {
        const razas = await getRazas();
        razaSelect.innerHTML = '<option value="">Selecciona una raza</option>';
        razas.forEach(raza => {
            const option = document.createElement('option');
            option.value = raza.id;
            option.textContent = raza.name;
            option.dataset.origen = raza.origin || '';
            option.dataset.desc = raza.description || '';
            razaSelect.appendChild(option);
        });
    } catch (error) {
        mostrarMensaje('Error al cargar las razas.');
    }
};

const mostrarInfoRaza = () => {
    const opcion = razaSelect.selectedOptions[0];
    if (!opcion.value) {
        infoRaza.classList.add('hidden');
        return;
    }
    document.getElementById('nombreRaza').textContent = opcion.textContent;
    document.getElementById('origenRaza').textContent = `📍 ${opcion.dataset.origen}`;
    document.getElementById('descRaza').textContent = opcion.dataset.desc;
    infoRaza.classList.remove('hidden');
};

const crearTarjetaGato = (gato) => {
    const div = document.createElement('div');
    div.className = 'bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition';
    div.innerHTML = `
        <img 
            src="${gato.url}" 
            alt="Gato"
            class="w-full h-48 object-cover"
        />
    `;
    return div;
};

const buscarPorRaza = async () => {
    const breedId = razaSelect.value;
    if (!breedId) {
        mostrarMensaje('Selecciona una raza primero.');
        return;
    }

    gatoGrid.innerHTML = '';
    ocultarMensaje();
    btnBuscar.disabled = true;
    btnBuscar.textContent = 'Buscando...';
    mostrarInfoRaza();

    try {
        const gatos = await getGatosPorRaza(breedId);
        if (gatos.length === 0) {
            mostrarMensaje('No hay imágenes para esta raza');
            return;
        }
        gatos.forEach(gato => gatoGrid.appendChild(crearTarjetaGato(gato)));
    } catch (error) {
        mostrarMensaje('Error al buscar gatos.');
    } finally {
        btnBuscar.disabled = false;
        btnBuscar.textContent = 'Buscar';
    }
};

document.addEventListener('DOMContentLoaded', cargarRazas);
btnBuscar.addEventListener('click', buscarPorRaza);