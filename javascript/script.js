window.onload = function() {
    /// clear local storage for testing purposes
    // localStorage.clear();

    // we suffix the url to make sure that the comments are unique for each page (when they are stored in local storage)
    const COMMENTS = "comments" + window.location.href;
    const COUNT_COMMENTS = "countComments" + window.location.href;


    retrieveComments();
    /// add countComments to local storage
    let countComments = 0;
    localStorage.setItem(COUNT_COMMENTS, JSON.stringify(countComments));

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
    function validateComment() { /// validate comment before adding it to page
        let name = document.getElementById("username").value;
        let comment = document.getElementById("comment").value;
        if (!name || !comment) {
            alert("please fill all available boxes");
            return;
        }
        /// validate name using regex
        if (!name.match(/^[a-zA-Z0-9_.-]*$/)) {
            alert("please enter a valid username: only letters, numbers, underscores, dots and dashes are allowed");
            return;
        }
        alert("Thank you for your comment");
        setTimeout(500 ,addComment(name, comment));
    }
    function retrieveComments() { /// add past comments to page
        let comments = JSON.parse(localStorage.getItem(COMMENTS));
        if (comments) {
            let commentList = document.getElementById("comment-section");
            comments.forEach(comment => {
                let newComment = document.createElement("li");
                newComment.innerHTML = `
                <h3>${comment.name}</h3>
                <p>${comment.comment}</p>
                <p id="comment-date">${comment.date}</p>
                <button class="like-btn">
                    Like
                    <span class="like-count">${comment.likes}</span>
                </button>
                `;
                newComment.id = comment.id;
                /// add event listener for like button
                newComment.querySelector(".like-btn").addEventListener("click", likeComment);
                commentList.appendChild(newComment);
            });
        }
    }
      
    function addComment(name, comment) {
        let commentList = document.getElementById("comment-section");
        let newComment = document.createElement("li");
        let currentDate = new Date();
        /// date = month + day of the month + hour and minute
        let date = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes();
        /// get commentCount from local storage
        let countComments = JSON.parse(localStorage.getItem(COUNT_COMMENTS));
        newComment.innerHTML = `
            <h3>${name}</h3>
            <p>${comment}</p>
            <p id="comment-date">${date}</p>
            <button class="like-btn">
            Like
            <span class="like-count">0</span>
            </button>
        `;
        commentList.style.fontFamily = window.getComputedStyle(document.querySelector('.container')).getPropertyValue('fontFamily');
        /// add event listener for like button
        newComment.querySelector(".like-btn").addEventListener("click", likeComment);
        commentList.appendChild(newComment);
        
        let comments = JSON.parse(localStorage.getItem(COMMENTS));
        if (!comments) {
            comments = [];
        }
        comments.push({id: countComments, name: name, comment: comment, date: date, likes: 0 });
        localStorage.setItem(COMMENTS, JSON.stringify(comments));
        countComments++;
        localStorage.setItem(COUNT_COMMENTS, JSON.stringify(countComments));
    }
    
    function likeComment(event) {
        /// stopPropagation to prevent event bubbling
        event.stopPropagation();
        let likeCount = event.target.querySelector(".like-count");
        if (!likeCount) {
            likeCount = 0;
        }
        let likeNum = parseInt(likeCount.innerText);
        likeCount.innerText = likeNum + 1;
        let comments = JSON.parse(localStorage.getItem(COMMENTS));
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].id == event.target.parentNode.id) {
                comments[i].likes++;
                break;
            }
        }
        localStorage.setItem(COMMENTS, JSON.stringify(comments));
    }
    

    let btnClear = document.getElementById("submit-comment");
    let inputs = document.querySelectorAll('textarea');
    btnClear.addEventListener('click', () => {
        inputs.forEach(textarea => textarea.value='');
    })

    /// every 10 seconds a different image will be displayed
    setInterval(changeImage, 10000);
    function changeImage() {
        let images = ["images/1.png", "images/2.png", "images/3.png", "https://avatars.githubusercontent.com/u/47429017?s=400&u=97e70ab3b685add9cf2ef360c2b623945db24fd7&v=4"];
        let randomNum = Math.floor(Math.random() * images.length);
        let logoImage = document.getElementById("logo-image");
        logoImage.src = images[randomNum];
    }
    
}