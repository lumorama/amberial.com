document.addEventListener('DOMContentLoaded', () => {
    const getHttpRequest = (method, url) => {
        return fetch(url, {
            method: method,
            data: '?api_key=a98e747e59768daf002bcb5aebcfb1fe',
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
    
    const containerTop = document.querySelector('#featured-grid-top');
    const containerBottom = document.querySelector('#featured-grid-bottom');

    const getData = (offset, limit) => {
        getHttpRequest('GET', `https://api.mod.io/v1/games/2816/mods?_offset=${offset}&_limit=${limit}&tags-in=Featured&api_key=a98e747e59768daf002bcb5aebcfb1fe` 
        ).then( response => {
                displayData(response);
                // Set results total for pagination
                total = response.result_total;
                // After total is set, THEN set page values
                setText(currentOffset, total);
            }
        ).catch ( error => {
                // Use the top row to display the error info.
                containerTop.textContent = 'ERROR: ' + error.data;
                console.log('ERROR: ' + error);
            }
        );
    }

    function displayData(response) {
        // Current set of results
        results = response.data.length;

        for (let i = 0; i < 3; i++) {
            // To avoid errors while filling first row
            if (i < results) {
                // Create level name, author name, and thumbnail from response
                createTextElement(
                    'h3',
                    response.data[i].name,
                    containerTop,
                    'cinzel-deco','text-center'
                );
                createTextElement(
                    'p',
                    response.data[i].submitted_by.username,
                    containerTop,
                    'text-center'
                );
                createImageElement(
                    response.data[i].logo.thumb_320x180,
                    containerTop
                );
            }
        }

        // Only fill the second row if there are enough results
        if (results > 3) {
            for (let i = 3; i < results; i++) {
                createTextElement(
                    'h3',
                    response.data[i].name,
                    containerBottom,
                    'cinzel-deco','text-center', 
                );
                createTextElement(
                    response.data[i].submitted_by.username,
                    containerBottom,
                    'text-center'
                );
                createImageElement(response.data[i].logo.thumb_320x180,
                    containerBottom
                );
            }
        }

        function createTextElement(element, value, parent, ...classes) {
            // Display text data
            const textElement = document.createElement(element);
            textElement.textContent = value;
            // Assign classes for styling (using Tailwind)
            classes.forEach(element => {
                textElement.classList.add(element);
            });
            // Append this element to parent container
            parent.appendChild(textElement);
        }

        function createImageElement(value, parent, ...classes) {
            // Display image data
            const thumbnail = document.createElement('img');
            thumbnail.src = value;
            // Assign classes for styling (using Tailwind)
            classes.forEach(element => {
                thumbnail.classList.add(element);
            });
            // Append this element to parent container
            parent.appendChild(thumbnail);
        }
    }

    // ?_offset=30&_limit=5 - this will retrieve 5 results after ignoring the first 30 (31 - 35)
    let currentOffset = 0;
    let limit = 7;
    let total = 0;

    document.querySelector('#previous-page').addEventListener('click', () => {
        clearChildren(containerTop);
        clearChildren(containerBottom);
        paginate(-1);
        getData(currentOffset, limit);
    });

    document.querySelector('#next-page').addEventListener('click', () => {
        clearChildren(containerTop);
        clearChildren(containerBottom);
        paginate(1);
        getData(currentOffset, limit);
    });

    function paginate(multiplier) {
        // Determines which position we should start from when getting results
        if (currentOffset + (limit * multiplier) > total) {
            // If we try to go above the total, set it back to the last page
            return currentOffset = total - (total % limit);
        } else if (currentOffset + (limit * multiplier) <= 0) {
            // If we try to go negative, show first page results
            return currentOffset = 0;
        } else {
            // Either go forward or go backwards a page.
            return currentOffset += (limit * multiplier);
        }
    }

    function clearChildren(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function setText(currentOffset, totalResults) {
        const currentPage = document.querySelector('#current-page');
        const totalPage = document.querySelector('#total-page');
        // Current page = How many times limit divides into offset + limit (to get current total results)
        currentPage.textContent = ( currentOffset + limit ) / limit;
        // Total pages = how many times limit divides into total results. 
        // + 1 extra if the last page won't be full (needs additional partial page).
        totalPage.textContent =
            totalResults % limit
            ? Math.floor(totalResults / limit + 1)
            : totalResults / limit;
    }

    getData(currentOffset, limit);
})