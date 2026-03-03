// get the current page address (url)
const currentUrl = new URL(location.href);

// find the 'postId' number in the address
const postId = currentUrl.searchParams.get("postId");

// find html elements where we will put the data
const postInfoContainer = document.getElementById("post-info");
const commentsContainer = document.getElementById('post-comments');

// check if we have a post id
if (postId) {
    // base address for all requests
    const baseUrl = new URL('https://jsonplaceholder.typicode.com');
    // build full address for the post
    const postApiUrl = new URL(`/posts/${postId}`, baseUrl);

    fetch(postApiUrl)
        .then(value => value.json())
        .then(post => {
            const ul = document.createElement("ul");

            // loop through all keys in the post object (userId, id, title, body)
            for (const key in post) {
                const li = document.createElement("li");

                // create bold text for the key
                const keyElement = document.createElement("strong");
                keyElement.innerText = `${key}: `;

                // create normal text for the value
                const valueElement = document.createElement("span");
                valueElement.innerText = post[key];

                // put key and value inside the list item
                li.appendChild(keyElement);
                li.appendChild(valueElement);

                // add list item to the list
                ul.append(li);
            }

            // show the list on the page
            postInfoContainer.appendChild(ul);

        })
        .catch(error => console.log("Помилка завантаження поста:", error));

// build full address for the comments
    const commentsApiUrl = new URL(`/posts/${postId}/comments`, baseUrl);
    fetch(commentsApiUrl)
        .then(value => value.json())
        .then(comments => {
            // loop through each comment
            comments.forEach((comment) => {
                // create a card for the comment
                const commentCard = document.createElement("div");
                commentCard.classList.add("layout-design");

                // create heading for the author's name
                const nameEl = document.createElement("h4");
                nameEl.innerText = comment.name;

                // create paragraph for the email
                const emailEl = document.createElement("p");
                emailEl.id = "p-email";
                const emailStrong = document.createElement("strong");
                emailStrong.innerText = 'Email: ';
                const emailSpan = document.createElement("span");
                emailSpan.innerText = comment.email;
                emailEl.appendChild(emailStrong);
                emailEl.appendChild(emailSpan);

                // create paragraph for the comment text
                const bodyEl = document.createElement("p");
                bodyEl.innerText = comment.body;

                // put name, email, and text inside the card
                commentCard.appendChild(nameEl);
                commentCard.appendChild(emailEl);
                commentCard.appendChild(bodyEl);

                // add the card to the comments container
                commentsContainer.appendChild(commentCard);
            })
        })
        .catch(error => console.error("Помилка завантаження коментарів:", error));
}else {
    // show error if there is no post id in the url
    postInfoContainer.innerText = "Помилка: Немає ID поста в адресному рядку!";
}
