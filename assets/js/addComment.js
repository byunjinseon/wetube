import axios from "axios";
import { fakeDelBtn } from "../../controllers/videoController";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");


const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
}

const addComment = (comment) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("a");
    delBtn.innerHTML = "&#10006;"
    delBtn.addEventListener("click",() => {
        alert('지금은 삭제할 수 없습니다.');
    });
    span.innerHTML = comment;
    li.appendChild(span);
    li.appendChild(delBtn)
    commentList.prepend(li);
    increaseNumber();
}

const sendComment = async (comment) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method:"POST",
        data: {
            comment
        }
    });
    if(response.status === 200) {
        addComment(comment);
    }
}



const handleSubmit = (e) => {
    e.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";
};

function init() {
    addCommentForm.addEventListener("submit", handleSubmit);
}

if(addCommentForm) {
    init();
}