const BASE_URL = CONFIG.API_BASE_URL;

const getGatosRandom = async (limit = 10) => {
    const response = await fetch(`${BASE_URL}/random?limit=${limit}`);
    const json = await response.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
};

const getRazas = async () => {
    const response = await fetch(`${BASE_URL}/breeds`);
    const json = await response.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
};

const getGatosPorRaza = async (breedId, limit = 10) => {
    const response = await fetch(`${BASE_URL}/breed/${breedId}?limit=${limit}`);
    const json = await response.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
};
