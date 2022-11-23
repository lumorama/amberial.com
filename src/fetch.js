// Manages everything related to mod.io API calls

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const containerTop = document.querySelector('#fetch-top');
    const containerBottom = document.querySelector('#fetch-bottom');
    const previousButton = document.querySelector('#previous-page');
    const nextButton = document.querySelector('#next-page');
    let truncatedArray = [];
    let timeOut;

    setUpButton(previousButton, -1);
    setUpButton(nextButton, 1);

    window.addEventListener('resize', setTooltip);

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

    function toggleLoader(isToggled) {
        isToggled
            ? loader.classList.remove('hidden')
            : loader.classList.add('hidden')
    }


    const getData = (offset, limit) => {
        // First, enable the loader
        toggleLoader(true);
        getHttpRequest('GET', `https://api.mod.io/v1/games/2816/mods?_sort=-date_live&_offset=${offset}&_limit=${limit}&tags-in=Featured&api_key=a98e747e59768daf002bcb5aebcfb1fe` 
        ).then( response => {
                // Disable loader
                toggleLoader(false);
                displayData(response);
                // Set results total for pagination
                total = response.result_total;
                // After total is set, THEN set page values
                setText(currentOffset, total);
                // Hide loading spiral
                // Activate page buttons
                previousButton.enabled = true;
                nextButton.enabled = true;
            }
        ).catch ( error => {
                // Use the top row to display the error info.
                containerTop.textContent = 'ERROR: ' + error.data + ' | ' + error;
                console.log('ERROR: ' + error);
            }
        );
    }

    function displayData(response) {
        // Clear truncatedArray to make room for new set of data
        truncatedArray = [];

        // Current set of results
        results = response.data.length;

        for (let i = 0; i < 3; i++) {
            // To avoid errors while filling first row
            if (i < results) {
                createFeaturedLevelDisplay(response.data[i], containerTop);
            }
        }

        // Only fill the second row if there are enough results
        if (results > 3) {
            for (let i = 3; i < results; i++) {
                createFeaturedLevelDisplay(response.data[i], containerBottom);
            }
        }

        function createFeaturedLevelDisplay(element, parentContainer) {
            // Create parent container for data
            const parent = document.createElement('article');
            parent.classList.add('featured-level-wrapper');
            // Create level name, author name, and thumbnail from response
            createTextElement(
                'h3',
                element.name,
                parent,
                'featured-header'
            );
            createTextElement(
                'div',
                element.submitted_by.username,
                parent,
                'featured-user'
            );
            createImageElement(
                element.logo.thumb_320x180,
                parent,
                'mt-4'
            );
            parentContainer.appendChild(parent);
        }

        function createTextElement(element, value, parent, ...classes) {
            // Display text data
            const textElement = document.createElement(element);
            textElement.textContent = value;
            // Set attribute in case of overflow
            textElement.setAttribute('data-text', value);
            // Assign classes for styling (using Tailwind)
            classes.forEach(element => {
                textElement.classList.add(element);
            });
            // Append this element to parent container
            parent.appendChild(textElement);
            // Add to array to check if a tooltip needs to be added
            truncatedArray.push(textElement);
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
        setTooltip();
    }

    function setTooltip () {
        // If text is truncated, add a tooltip that displays the full text.
        clearTimeout(timeOut);  
        const isTruncated = element => {
            // Check if the element is long enough to be truncated by the browser.
            return element.scrollWidth - element.offsetWidth > 7;
        }
        // A delay of 1 second is set, so that the DOM has time to update
        // the values of the element before assigning tooltips.
        timeOut = setTimeout(() => {
            truncatedArray.forEach(
                element => {
                    if ( isTruncated(element) && !element.classList.contains('truncated') ) {
                        element.classList.add('truncated');
                    } else if ( !isTruncated(element) && element.classList.contains('truncated') ) {
                        element.classList.remove('truncated');
                    }
                }
            )},
            1000
        )
    }

    let currentOffset = 0;
    let limit = 7;
    let total = 0;

    function setUpButton (button, multiplier) {
        button.addEventListener('click', () => {
            clearChildren(containerTop);
            clearChildren(containerBottom);
            paginate(multiplier);
            getData(currentOffset, limit);
            // Disable button to prevent duplicate GET
            button.enabled = false;
        });
    }

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