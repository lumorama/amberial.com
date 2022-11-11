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

    const containerTop = document.querySelector('#fetch-top');
    const containerBottom = document.querySelector('#fetch-bottom');

    const getData = (offset, limit) => {
        getHttpRequest('GET', `https://api.mod.io/v1/games/2816/mods?_offset=${offset}&_limit=${limit}&tags-in=Featured&api_key=a98e747e59768daf002bcb5aebcfb1fe` 
        ).then( response => {
                displayData(response);
                // Set results total for pagination
                total = response.result_total;
            }
        ).catch ( error => {
                containerTop.textContent = 'ERROR: ' + error.data;
                console.log(error);
            }
        );
    }

    function displayData(response) {
        results = response.data.length;

        for (let i = 0; i < 3; i++) {
            if (i < results) {
                // Create parent element to hold data
                const parent = document.createElement('div');

                getValue('name', response.data[i].name, parent);
                getValue('submitted by', response.data[i].submitted_by.username, parent);
                getThumbnail(response.data[i].logo.thumb_320x180, parent);
                
                containerTop.appendChild(parent);
            }
        }

        // Only execute if there are enough results
        if (results > 3) {
            for (let i = 3; i < results; i++) {
                // Create parent element to hold data
                const parent = document.createElement('div');

                getValue('name', response.data[i].name, parent);
                getValue('submitted by', response.data[i].submitted_by.username, parent);
                getThumbnail(response.data[i].logo.thumb_320x180, parent);
                
                containerBottom.appendChild(parent);
            }
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
    
    // Paginate results: 7 per page
    // ?_offset=30&_limit=5 - Will retrieve 5 results after ignoring the first 30 (31 - 35)
    // result_total - total number of results found
    // to get 7 featured per page,
    // ?_offset=0&_limit=7

    // have a go forward and go back button (for pages)
    // go forward: offset + 7, go back: offset - 7
    // 0 <= offset, offset < results_total

    let currentOffset = 0;
    let limit = 7;
    let total = 0;

    document.querySelector('#previous-page').addEventListener('click', () => {
        clearChildren(containerTop);
        clearChildren(containerBottom);
        //paginate(-1);
        console.log(paginate(-1));
        getData(currentOffset, limit);
    });

    document.querySelector('#next-page').addEventListener('click', () => {
        clearChildren(containerTop);
        clearChildren(containerBottom);
        //paginate(1);
        console.log(paginate(1));
        getData(currentOffset, limit);
    });

    function paginate(multiplier) {
        if (currentOffset + (limit * multiplier) > total) {
            return currentOffset = total - (total % limit);
        } else if (currentOffset + (limit * multiplier) <= 0) {
            return currentOffset = 0;
        } else {
            return currentOffset += (limit * multiplier);
        }
    }

    function clearChildren(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    getData(currentOffset, limit);
})