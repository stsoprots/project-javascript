// 1) Get elements from the HTML page
const form = document.getElementById("pair-form");
const input = document.getElementById("name-value");
const select = document.getElementById("pair-listbox");
const errorBox = document.getElementById("error-box");

// 2) Add or update a pair when the users submits the form
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear old error messages
    errorBox.innerText = '';

    const userInput = input.value;

    // Check if the users typed the '=' sign
    if (!userInput.includes('=')) {
        errorBox.innerText = 'Error: You forgot the equals sign (=)'
        return;
    }

    // Split the text into Name and Value, and remove extra spaces
    const pair = userInput.split('=');
    const name = pair[0].trim();
    const value = pair[1].trim();

    // Check if Name and Value have only letters and numbers
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(name) || !regex.test(value)) {
        errorBox.innerText = 'Error: Names and Values can contain only alpha-numeric characters';
        return;
    }


    let isFound = false;

    // Go through the list to find if the Name already exists
    for (let i = 0; i < select.options.length; i++) {
        let currentOption = select.options[i];
        let currentName = currentOption.innerText.split('=')[0].trim();

        // If we find the same name, just update its value
        if (currentName === name) {
            currentOption.innerText = `${name}=${value}`;
            isFound = true;
            break;
        }
    }
    // If the name is new, create a new item in the list
    if (!isFound) {
        const newOption = document.createElement("option");
        newOption.innerText = `${name}=${value}`;
        select.appendChild(newOption);
    }

    // Clear the input field for the next time
    input.value = '';
})

// 3) Delete selected items
const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", () => {
    errorBox.innerText = '';

    // Go from the end of the list to the start to safely remove items
    for (let i = select.options.length - 1; i >= 0; i--) {
        if (select.options[i].selected) {
            select.options[i].remove();
        }
    }
})

// ------------- corrections ---------------

// 4) reusable function to sort the list (fixes code duplication)
function sortListBy(type) {
    // create an array from the list to sort it
    let pairsArray = Array.from(select.options);

    pairsArray.sort((a, b) => {
        // choose index: 0 for name (left side), 1 for value (right side)
        let index = type === 'name' ? 0 : 1;

        // get the correct part and make it lowercase
        let textA = a.innerText.split('=')[index].trim().toLowerCase();
        let textB = b.innerText.split('=')[index].trim().toLowerCase();

        // use natural sorting so "2" comes before "10"
        return textA.localeCompare(textB, undefined, { numeric: true, sensitivity: 'base' });
    });

    // update the list on the screen
    pairsArray.forEach(opt => select.appendChild(opt));
}

// 5) connect the sorting function to the buttons
const sortNameBtn = document.getElementById("sortNameBtn");
sortNameBtn.addEventListener("click", () => {
    // call the function and tell it to sort by 'name'
    sortListBy('name');
});

const sortValueBtn = document.getElementById('sortValueBtn');
sortValueBtn.addEventListener('click', () => {
    // call the function and tell it to sort by 'value'
    sortListBy('value');
});

