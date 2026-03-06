const getGatosRandom = async (limit = 10) => {
    const response = await fetch(`${BASE_URL}/cats/random?limit=${limit}`);
    const json = await response.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
};

const getRazas = async () => {
    const response = await fetch(`${BASE_URL}/cats/breeds`);
    const json = await response.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
};

const getGatosPorRaza = async (breedId, limit = 10) => {
    const response = await fetch(`${BASE_URL}/cats/breed/${breedId}?limit=${limit}`);
    const json = await response.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
};
