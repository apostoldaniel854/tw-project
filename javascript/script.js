

window.onload = function() {
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
    }
    let btnClear = document.getElementById("submit-comment");
    let inputs = document.querySelectorAll('textarea');
    btnClear.addEventListener('click', () => {
        inputs.forEach(textarea => textarea.value='');
    })
}