document.addEventListener('DOMContentLoaded', () => {
    const getHttpRequest = (method, url) => {
        return fetch(url, {
            method: method,
            data: '?api_key=a98e747e59768daf002bcb5aebcfb1fe',
            //body: JSON.stringify(data)
        }).then(response => {
            // Handle errors
            if (response.status >= 400) {
                return response.json().then(errorResponse => {
                    const error = new Error('Oops!');
                    error.data = response.status; // Storing error data
                    throw error;
                })
            }
            return response.json();
        });
    }

    const container = document.querySelector('#fetch');

    const getData = () => {
        getHttpRequest('GET', 'https://api.mod.io/v1/games/2816/mods?_offset=0&tags-in=Featured&api_key=a98e747e59768daf002bcb5aebcfb1fe' 
        ).then( response => {
                displayData(response);
            }
        ).catch ( error => {
                container.textContent = 'ERROR: ' + error.data;
            }
        );
    }

    function displayData(response) {
        for (let i = 0; i < response.data.length; i++) {
            // Create parent element to hold data
            const parent = document.createElement('div');

            getValue('name', response.data[i].name, parent);
            getValue('submitted by', response.data[i].submitted_by.username, parent);
            getThumbnail(response.data[i].logo.thumb_320x180, parent);
            
            container.appendChild(parent);
        }

        function getValue(name, value, parent) {
            // Display text data
            const para = document.createElement('p');
            para.textContent = name + ' : ' + value;
            parent.appendChild(para);
        }

        function getThumbnail(value, parent) {
            // Display image data
            const thumbnail = document.createElement('img');
            thumbnail.src = value;
            parent.appendChild(thumbnail);
        }
    }
    
    getData();
})