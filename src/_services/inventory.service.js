import appConfig from '../_appConfig/_appConfig';

export const inventoryService = {
    createWarehouse,
    createInventory,
    listWarehouse,
    updateWarehouse,
};

function createWarehouse(formData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };

    return fetch(`${appConfig.inventoryService.apiDomain}/inventory/warehouses/create`, requestOptions).then(handleResponse);
}

function listWarehouse(formData) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${appConfig.inventoryService.apiDomain}/inventory/warehouses/list${formData || ''}`, requestOptions).then(handleResponse);
}

function updateWarehouse(formData) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    };

    return  fetch(`${appConfig.inventoryService.apiDomain}/inventory/warehouses/update/${formData.id}`, requestOptions).then(handleResponse);

}

function createInventory(formData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };

    return fetch(`${appConfig.inventoryService.apiDomain}/inventory/create`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.description) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}