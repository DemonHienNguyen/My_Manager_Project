let btnLogin = document.getElementById("btn--login");

let emailInput = document.getElementById("emailInput");
let passInput = document.getElementById("passInput");

let errorEmail = document.getElementById("errorEmail");
let errorPass = document.getElementById("errorPassword");

let toastList= document.querySelector(".toastSusscess");

errorEmail.style.display = "none";
errorPass.style.display = "none";

let user = [];
// let curentUser = {};

function saveUser(users) {
  localStorage.setItem("Users", JSON.stringify(users));
}
function saveCurrentUser(curentUser) {
  localStorage.setItem("curentUser", JSON.stringify(curentUser));
}
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("curentUser")) || null;
}
function getUser() {
  return JSON.parse(localStorage.getItem("Users")) || [];
}

window.onload = () =>{
    curentUser = getCurrentUser();
    if(curentUser){
        window.location.replace("./product-manager.html");
    }
}


btnLogin.addEventListener("click", () => {
    user = getUser();
    const email = emailInput.value.trim();
    if (email === "") {
        showError(errorEmail, emailInput, "Email không hợp lệ");
        return;
    }
    const foundUser = user.find(c => c.email  === email);
    if (!foundUser) {
        showError(errorEmail, emailInput, "Email chưa đăng ký");
        return;
    }
    const pass = passInput.value.trim();
    if (pass === "") {
        showError(errorPass, passInput, "Mật khẩu không hợp lệ");
        return;
    }
    if (foundUser.password !== pass) {
        showError(errorPass, passInput, "Mật khẩu không đúng");
        return;
    }
    createToast("Đăng nhập thành công");
    saveCurrentUser(foundUser);
    setTimeout(() => {
        window.location.href = "../page/loading.html";
    }, 4000);
});

function createToast(message) {
    const div = document.createElement("div");
    div.className = "div--success";

    div.innerHTML = `
        <div class="icon">✔</div>
        <div class="content">
            <h4>${message}</h4>
            <p>Thao tác đã hoàn tất</p>
        </div>
        <div class="process"></div>
    `;

    toastList.appendChild(div);

    // giới hạn số lượng toast (đỡ spam màn hình)
    const MAX_TOAST = 3;
    if (toastList.childElementCount > MAX_TOAST) {
        toastList.firstElementChild.remove();
    }

    // delay nhỏ để trigger animation
    requestAnimationFrame(() => {
        div.classList.add("active");

        const process = div.querySelector(".process");
        process.classList.add("active");
        process.style.animationDuration = "3000ms";
    });

    // auto remove (có fade out nhẹ cho đỡ “biến mất như chưa từng tồn tại”)
    setTimeout(() => {
        div.classList.remove("active");

        setTimeout(() => {
            div.remove();
        }, 400); // chờ animation out
    }, 3000);
}

function showError(error, input, message) {
    error.style.display = "block";
    error.style.color = "red";
    error.textContent = message;
    input.style.borderColor = "red";
    setTimeout(() => {
        byeError(error, input);
    }, 2000);
}

function byeError(error, input) {
    error.style.display = "none";
    input.style.borderColor = "rgba(0, 0, 0, 0.11)";
    input.focus();
}

// function login(){
//     document.location.href = "../page/loading.html";
// }