

window.onload = function() {
    /// clear local storage
    // localStorage.clear();

    retrieveComments();

    let field = document.querySelector('textarea');
    let backUp = field.getAttribute('placeholder');
    let commentButton = document.getElementById("submit-comment");
    
    /// add an event listener for click for submit button
    commentButton.addEventListener('click', validateComment);

    /// add an event listener for click for clear button
    let clearButton = document.getElementById("clear-comment");
    clearButton.addEventListener('click', () => {
        field.value = '';
    });
    
    
    field.onfocus = function() {
        this.setAttribute('placeholder', '');
        this.style.borderColor = 'red'; /// subject to change
        commentButton.style.display = 'block';
    }
    field.onblur = function() {
        this.setAttribute('placeholder', backUp);
        this.style.borderColor = 'blue'; /// subject to change
    }
    function validateComment() {
        let name = document.getElementById("username").value;
        let comment = document.getElementById("comment").value;
        if (!name || !comment) {
            alert("please fill all available boxes");
            return;
        }
        alert("Thank you for your comment");
        addComment(name, comment);
    }
    function retrieveComments() {
        let comments = JSON.parse(localStorage.getItem("comments"));
        if (comments) {
            let commentList = document.getElementById("comment-section");
            comments.forEach(comment => {
                let newComment = document.createElement("li");
                newComment.innerHTML = `
                <h3>${comment.name}</h3>
                <p>${comment.comment}</p>
                <p>${comment.date}</p>
                <button class="like-btn">
                    Like
                    <span class="like-count">${comment.likes}</span>
                </button>
                `;
                newComment.querySelector(".like-btn").addEventListener("click", likeComment);
                commentList.appendChild(newComment);
            });
        }
    }
      
    function addComment(name, comment) {
        let commentList = document.getElementById("comment-section");
        let newComment = document.createElement("li");
        let date = new Date();
        newComment.innerHTML = `
            <h3>${name}</h3>
            <p>${comment}</p>
            <p>${date}</p>
            <button class="like-btn">
            Like
            <span class="like-count">0</span>
            </button>
        `;
        /// add event listener for like button
        newComment.querySelector(".like-btn").addEventListener("click", likeComment);
        commentList.appendChild(newComment);
        
        let comments = JSON.parse(localStorage.getItem("comments"));
        if (!comments) {
            comments = [];
        }
        comments.push({ id: count, name: name, comment: comment, date: date, likes: 0 });
        localStorage.setItem("comments", JSON.stringify(comments));
    }
    
    function likeComment(event) {
        let likeCount = event.target.querySelector(".like-count");
        let likeNum = parseInt(likeCount.innerText);
        likeCount.innerText = likeNum + 1;
        let comments = JSON.parse(localStorage.getItem("comments"));
        let comment = comments.find(comment => comment.id === parseInt(event.target.parentElement.id));
        comment.likes = likeNum + 1;
        localStorage.setItem("comments", JSON.stringify(comments));
    }
    

    let btnClear = document.getElementById("submit-comment");
    let inputs = document.querySelectorAll('textarea');
    btnClear.addEventListener('click', () => {
        inputs.forEach(textarea => textarea.value='');
    })
}