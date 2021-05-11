import axios from "axios";
const commentNumber = document.getElementById("jsCommentNumber");
const addCommentForm = document.getElementById("jsAddComment");
const commentDelBtn = document.querySelectorAll('.delBtn');

const decreaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
}

const removeComment = (target) => {
    target.parentNode.remove();
    decreaseNumber();
}

const handleDelete = async (e) => {
    console.log("e.target.classList:", e.target.classList);
    const commentId = e.target.nextSibling.value;
    console.log(commentId);
    const response = await axios({
        url: `/api/${commentId}/delete`,
        method:"GET"
    });
    if(response.status === 200) {
        removeComment(e.target);
    }
}


function init() {
    commentDelBtn.forEach(btn => btn.addEventListener('click', handleDelete));
}

if(addCommentForm) {
    init();
}