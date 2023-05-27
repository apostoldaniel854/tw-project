

window.onload = function() {
    let field = document.querySelector('textarea');
    let backUp = field.getAttribute('placeholder');
    let commentButton = document.querySelector(".comment-btn");
    /// add an event listener for click for submit button
    
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
        let comment = documment.getElementById("comment").value;
        if (!name || !comment) {
            alert("please fill all available boxes");
            return;
        }

    }
    let btnClear = document.getElementById("submit-comment");
    btnClear.addEventListener('click', () => {
        inputs.forEach(textarea => textarea.value='');
    })
}