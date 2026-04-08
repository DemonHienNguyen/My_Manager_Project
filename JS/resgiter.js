window.addEventListener("DOMContentLoaded", () => {

  let btnResgiter = document.getElementById("btn--regiter");
  
  let nameInput = document.getElementById("nameInput");
  let emailInput = document.getElementById("emailInput");
  let passInput = document.getElementById("passInput");
  let passAgainInput = document.getElementById("passAgain");
  
  let errorName = document.getElementById("errorName");
  let errorEmail = document.getElementById("errorEmail");
  let errorPass = document.getElementById("errorPass");
  let errorPassAgain = document.getElementById('errorPassAgain');
  
  let curentUser = {};
  let user = [];
  
  let toastList = document.querySelector(".toastSusscess");
  
  
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
          window.location.replace('./page/product-manager.html');
      }
  }
  
  btnResgiter.addEventListener("click", (e) => {
    e.preventDefault();
    user = getUser();
    curentUser = getCurrentUser();
    const name = nameInput.value.trim();
    if (name === "") {
      showError(errorName, nameInput, "Tên tài khoản không để trống !");
      return;
    }
    // byeError(errorName);
    const email = emailInput.value.trim();
    if (email === "") {
      showError(errorEmail, emailInput, "Email không để trống");
      return;
    }
    if (user.some(c => c.email === email)) {
      showError(errorEmail, emailInput, "Email đã được sử dụng");
      return;
    }
    if (!valiEmail(email)) {
      showError(errorEmail, emailInput, "Email không hợp lệ");
      return;
    }
    const password = passInput.value.trim();
    if (password === "" ) {
      showError(errorPass, passInput, "Vui lòng nhập mật khẩu");
      return;
    }
    if(password.length < 8){
      showError(errorPass, passInput, "Mật khẩu tối thiểu 8 ký tự");
      return;
    }
    const passAgain = passAgainInput.value.trim();
    if (passAgain !== password) {
      showError(errorPassAgain, passAgainInput, "Mật khẩu Không khớp với mật khẩu trước đó");
      return;
    }
    user.push({id: user.length ? user[user.length -1].id + 1: 1,
              name, email, password });
    curentUser = {id: user[user.length -1].id,
                  name, email, password};
  
    saveUser(user);
    saveCurrentUser(curentUser);
  
    createToast("Đăng ký thành công");
    setTimeout(() => {
      window.location.href = "./page/loading.html";
    }, 4000);
  });
  
  function valiEmail(ele) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(ele);
  }
  
  function createToast(message) {
    const div = document.createElement("div");
    div.className = "div--success";
    div.innerHTML = `
      <h4>${message}</h4>
      <div class = "process">
                  
      </div>
    `;
    toastList.appendChild(div);
    if (toastList.childElementCount > 1) {
      toastList.firstElementChild.remove();
    }
    setTimeout(() => {
      div.classList.add("active");
      div.querySelector(".process").classList.add("active");
      div.querySelector(".process").style.animationDuration = 3000 + "ms";
    }, 10);
  
    setTimeout(() => {
      div.remove();
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
    input.style.borderColor = "#c1bfdc44";
    input.focus();
  }
});