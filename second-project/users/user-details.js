// base address for the api
const baseUrl = new URL('https://jsonplaceholder.typicode.com');

// get the current page address
const currentUrl = new URL(location.href);

// find the 'id' number in the url
const userId = currentUrl.searchParams.get("id");

// find the html element where we will put the users data
const userInfoContainer = document.getElementById('user-info');

// function to create a list from an object (works for nested objects too)
function buildUserInfo(obj, parentElement){
    // create an unordered list
    const ul = document.createElement("ul");
    ul.style.listStyleType = "none";
    ul.style.paddingLeft = "20px";

    // loop through all keys in the object
    for (const key in obj) {
        // create a list item for each key
        const li = document.createElement("li");

        // check if the value is another object (like 'address' or 'company')
        if (typeof obj[key] === "object" && obj[key] !== null) {

            // create a bold heading for the nested object
            const objectName = document.createElement("p");
            objectName.innerText = `${key}:`;
            objectName.style.fontWeight = "bold";
            li.appendChild(objectName);

            // call the same function again to unpack the nested object (recursion)
            buildUserInfo(obj[key], li);
        } else {
            // if it is a normal text value
            const objectElement = document.createElement("p");

            // create bold text for the key
            const keyElement = document.createElement("strong");
            keyElement.innerText = `${key}: `;

            // create normal text for the value
            const valueElement = document.createElement("span");
            valueElement.innerText = `${obj[key]}`;

            // put the key and value inside the paragraph
            objectElement.appendChild(keyElement);
            objectElement.appendChild(valueElement);

            // put the paragraph inside the list item
            li.appendChild(objectElement);
        }
        // add the list item to the main list
        ul.appendChild(li);
    }
    // show the finished list on the page
    parentElement.appendChild(ul);
}

// check if we have a users id from the first page
if (userId) {
    // build full address for the specific users
    const userApiUrl = new URL(`/users/${userId}`,baseUrl);

    // load users data from the server
    fetch(userApiUrl)
        .then(value => value.json())
        .then(user => {
            // run our function to draw the users information
            buildUserInfo(user, userInfoContainer);
        })
        .catch(error => console.error("Помилка завантаження:", error));
} else {
    // show error if the page was opened without an id
    userInfoContainer.innerText = 'Помилка: Немає ID в адресі! Відкрий index.html і клікни на юзера.';
}

// find the button and the container for posts
const postsBtn = document.getElementById('post-of-current-user-btn');
const postsContainer = document.getElementById('post-container');

// add click event to the button
postsBtn.addEventListener('click', () => {
    // build full address for the users's posts
    const postsUrl = new URL(`/users/${userId}/posts`, baseUrl);

    // load posts from the server
    fetch(postsUrl)
        .then(value => value.json())
        .then(posts => {
            // clear the container before adding new posts
            postsContainer.innerText = '';

            // loop through each post
            posts.forEach(post => {
                // create a card for the post
                const postBlock = document.createElement("div");
                postBlock.classList.add("layout-design");

                // create a heading for the post title
                const postTitle = document.createElement("h4");
                postTitle.innerText = post.title;

                // create a link to the third page (post details)
                const postLink = document.createElement("a");
                postLink.classList.add("layout-design-link");
                postLink.innerText = 'Post Details';

                // save the post id in the url for the next page
                postLink.href = `../posts/post-details.html?postId=${post.id}`;

                // put the title and link inside the card
                postBlock.appendChild(postTitle);
                postBlock.appendChild(postLink);

                // show the card on the page
                postsContainer.appendChild(postBlock);

            })
            // disable the button so the users cannot click it again
            postsBtn.disabled = true;
        })
})
