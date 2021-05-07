import { isArray } from "lodash";

export const apiHandler = (url, method, data) => {
    console.log("data", data);

    let params = {
        method,
        /* headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        } */
    };

    if (method === "POST") {
        let formData = new FormData();
        Object.keys(data).forEach((key, index) => {
            //console.log(key, data[key])
            if (isArray(data[key]) && data[key].length > 0)
                formData.append(`${key}[]`, data[key]);
            else formData.append(key, data[key]);
        });

        params = {
            ...params,
            body: formData
        };
    }

    return new Promise((resolve, reject) => {
        fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            resolve(result);
        })
        .catch(err => {
            reject(err);
        });
    });
};
