// find the html element where we will put all users
const userContainer = document.getElementById('users-container');

// set the address to get the list of users from the server
const apiUrl = new URL('https://jsonplaceholder.typicode.com/users');

// send a request to the server to get the data
fetch(apiUrl)
    // convert the server response into a javascript format (json)
    .then(value => value.json())
    // work with the array of users we received
    .then(users => {
        // loop through each user one by one
        users.forEach(user => {

            // create a main block (card) for the user
            const card = document.createElement("div");
            // add a css class to make the card look good
            card.classList.add("layout-design");

            // create a heading to show the user's id and name
            const info = document.createElement("h3");
            // add text inside the heading
            info.innerText = `ID: ${user.id} - ${user.name}`;

            // create a button (link) to go to the user details page
            const link = document.createElement("a");
            // add a css class for the button style
            link.classList.add("layout-design-link");
            // add text inside the button
            link.innerText = 'User Details'

            // save the user's id in the url so the next page knows who to show
            link.href = `user-details.html?id=${user.id}`

            // put the heading and the button inside the user card
            card.appendChild(info);
            card.appendChild(link);

            // show the finished card on the web page
            userContainer.appendChild(card);
        })
    });





