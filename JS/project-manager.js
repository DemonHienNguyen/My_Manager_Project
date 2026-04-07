
// LẤY DOM VÀ BIẾN
window.addEventListener("DOMContentLoaded", () => {

    let productList = document.getElementById("projectList");

    let popAddOrFix = document.querySelector(".popNote");
    let warningPop = document.querySelector(".wanningPop");


    let overlay = document.querySelector(".overlay");

    let overlayWarn = document.querySelector(".overlay--warnning");

    let titleWarning = document.getElementById("title");
    let contentWarning = document.getElementById("content");

    let btnSignOut = document.getElementById("btn--SignOut");

    let btnDeletePop = document.getElementById("sayByePop");
    let btnDel_warning = document.getElementById("sayBye");

    let btnDel = document.getElementById("btn--cancel");
    let btnBye = document.getElementById("callCancel");


    let btnAdd = document.getElementById("btn--addProject");

    let btnDanger = document.getElementById("btn-danger");
    let btnSave = document.getElementById("btn--save");

    let toastList = document.querySelector(".toastSusscess");

    let deleteAndEscape = null;
    let editId = null;


    let project = [];
    let userProject = [];
    let curentUser = {};

    let currentPage = 1;
    let pageSize = 5;
    //

    // lấy dữ liệu người dùng
    function getCurrentUser() {
        return JSON.parse(localStorage.getItem("curentUser")) || null;
    }
    // lấy dự án !
    function getProject() {
        return JSON.parse(localStorage.getItem("Projects")) || [];
    }
    function getCurrentId() {
        return JSON.parse(localStorage.getItem("CurrentId")) || 0;
    }

    // Lưu
    function saveCurrentUser(curentUser) {
        localStorage.setItem("curentUser", JSON.stringify(curentUser));
    }
    function saveCurrentProjectId(projectId) {
        localStorage.setItem("curentProjectId", JSON.stringify(projectId));
    }
    function saveProject(products) {
        localStorage.setItem("Projects", JSON.stringify(products));
    }
    function saveCurrentId(currentId) {
        localStorage.setItem("CurrentId", JSON.stringify(currentId));
    }

    //Hàm xóa
    // function removeCurrentProjectId(){
    //     localStorage.removeItem("curentProjectId");
    // }
    // 
    // Hàm Update
    function updateUserProject() {
        return project.filter(c => c.members.some(member => member.userId === curentUser.id && member.role === "Project owner"));
    }
    //

    // 
    window.addEventListener("storage", () => {
        project = getProject();
    });
    // 
    window.onload = () => {
        curentUser = getCurrentUser();
        if (!curentUser) {
            window.location.replace("../page/login.html");
        }
        project = getProject();
        // removeCurrentProjectId();
        userProject = updateUserProject()
        renderProject(project);
    }


    // Chức năng sửa và xóa dự án
    productList.addEventListener("click", (e) => {
        // Chức năng sửa
        if (e.target.classList.contains("btn--edit")) {
            popAddOrFix.classList.remove("remove");
            popAddOrFix.classList.add("active");
            overlay.classList.add("active");
            editId = +e.target.dataset.id;
            const result = project.find(c => c.id === editId);
            nameNewProjectInput.value = result.projectName;
            newProjectDescription.value = result.projectDecription;
        }
        // Hiện thêm thông tin
        if (e.target.classList.contains("btn--more")) {
            const btn = e.target.closest(".btn--more");
            const curentProjectId = +btn.dataset.id;
            saveCurrentProjectId(curentProjectId);
            setTimeout(() => {
                window.location.href = "../page/category-manager.html";
            }, 2);
        }
        // Chức năng xóa
        if (e.target.classList.contains("btn--delete")) {
            warningPop.classList.remove("remove");
            warningPop.classList.add("active");
            overlayWarn.classList.add("active");
            btnDanger.textContent = "Xóa";
            titleWarning.textContent = "Xác nhận xóa";
            contentWarning.textContent = "Bạn có chắc chắn muốn xóa dự án này ?";
            deleteAndEscape = +e.target.dataset.id;
        }
    });

    // Các nút khi nhấn vào dấu X: góc phải trên cùng
    // Thêm  và sửa nhiệm vụ
    btnDeletePop.addEventListener("click", () => {
        popAddOrFix.classList.add("remove");
        popAddOrFix.classList.remove("active");
        overlay.classList.remove("active");
        editId = null;
        clearFormAdd();
    });
    // Cảnh cáo và xóa
    btnDel_warning.addEventListener("click", () => {
        warningPop.classList.remove("active");
        overlayWarn.classList.remove("active");
        warningPop.classList.add("remove");
    });
    //

    // Các nút khi nhán vào hủy: nút thứ nhất góc dưới
    // Thêm và sửa dự án
    btnDel.addEventListener("click", () => {
        clearFormAdd();
        editId = null;
        btnDeletePop.click();
    });
    // Cảnh cáo và xóa
    btnBye.addEventListener("click", () => {
        btnDel_warning.click();
    });
    //

    // Các nút thực thi: nút thứ 2 góc dưới cùng
    // Thêm và sửa dự án
    // DOM
    let nameNewProjectInput = document.getElementById("addOrEditInput");
    let newProjectDescription = document.getElementById("descriptionInput");

    let errorNameProject = document.getElementById("errorNameProject");
    let errorProjectDescription = document.getElementById("errorDescription");
    btnSave.addEventListener("click", () => {
        if (editId === null) {
            // let result = project.filter(c => c.members.some(member => member.userId === curentUser.id && member.role === "Project owner"));
            const nameProject = nameNewProjectInput.value.trim();
            if (nameProject === "") {
                showError(errorNameProject, nameNewProjectInput, "Tên danh mục không được để trống");
                return
            }
            if (userProject.some(c => c.projectName === nameProject)) {
                showError(errorNameProject, nameNewProjectInput, "Tên danh mục không được trùng");
                return
            }
            if (nameProject.length > 60) {
                showError(errorNameProject, nameNewProjectInput, "Tên danh mục không được dài quá 50 ký tự");
                return
            }
            const decription = newProjectDescription.value.trim();
            if (decription === "") {
                showError(errorProjectDescription, newProjectDescription, "Mô tả không được để trống");
                return
            }
            if (decription.length > 100) {
                showError(errorProjectDescription, newProjectDescription, "Mô tả không quá 100 ký tự");
                return
            }
            project.push({
                id: project.length ? project[project.length - 1].id + 1 : 1,
                projectName: nameProject,
                projectDecription: decription,
                members: [
                    { userId: curentUser.id, role: "Project owner" },
                ],
            });
            createToast("Thêm thành công !", "✓");
        } else {
            const updateProjectName = nameNewProjectInput.value.trim();
            if (updateProjectName === "") {
                showError(errorNameProject, nameNewProjectInput, "Tên dự án cập nhập không được để trống");
                return;
            }
            if (userProject.some(c => c.projectName === updateProjectName && c.id !== editId)) {
                showError(errorNameProject, nameNewProjectInput, "Tên dự án cập nhập không được trùng");
                return;
            }
            const updateProjectDescription = newProjectDescription.value.trim();
            if (updateProjectDescription === "") {
                showError(errorProjectDescription, newProjectDescription, "Mô tả dự án không được để trống");
                return;
            }

            let updateProject = project.find(c => c.id === editId);
            updateProject.projectName = nameNewProjectInput.value.trim();
            updateProject.projectDecription = newProjectDescription.value.trim();
            createToast("Cập nhập thành công", "✓");
            editId = null;
        }
        clearFormAdd();
        saveProject(project);
        window.onload();
        // renderProject(project);
        btnDeletePop.click();

    });
    // Xóa và đăng xuất
    btnDanger.addEventListener("click", () => {
        if (deleteAndEscape === -1) {
            btnDel_warning.click();
            createToast("Đăng xuất thành công", "✓");
            setTimeout(() => {
                localStorage.removeItem("curentUser");
                window.location.href = "../page/login.html";
            }, 3500);
            deleteAndEscape = null;
        }
        if (deleteAndEscape !== null) {
            project = project.filter(c => c.id !== deleteAndEscape);
            saveProject(project);
            renderProject(project);
            createToast("Xóa thành công", "✓");
            userProject = updateUserProject();
            btnDel_warning.click();
        }
    });
    // 

    // Đăng xuất
    btnSignOut.addEventListener("click", (e) => {
        e.preventDefault();
        deleteAndEscape = -1;
        warningPop.classList.remove("remove");
        warningPop.classList.add("active");
        overlayWarn.classList.add("active");
        btnDanger.textContent = "Đăng xuất";
        titleWarning.textContent = "Đăng xuất";
        contentWarning.textContent = "Bạn muốn đăng xuất ?";
    });




    //  Chức năng để thực thi ở bên ngoài (Sự kiện duy nhất)
    // Thêm
    btnAdd.addEventListener("click", () => {
        popAddOrFix.classList.remove("remove");
        popAddOrFix.classList.add("active");
        overlay.classList.add("active");
        clearFormAdd();
    });
    //



    // Các lớp để làm mở background
    // overlay.addEventListener("click", (e) => {
    //     if (e.target.classList.contains("overlay")) {
    //         btnDeletePop.click();
    //     }
    // });
    // overlayWarn.addEventListener("click", (e) => {
    //     if (e.target.classList.contains("overlay--warnning")) {
    //         btnDel_warning.click();
    //     }
    // });

    // Chức năng tìm kiếm san phẩm
    //DOM 
    let findInput = document.getElementById("findInput");
    findInput.addEventListener("input", (e) => {
        const keyFind = e.target.value;
        const result = userProject.filter(c => c.projectName.toLowerCase().trim().includes(keyFind.toLowerCase().trim()));
        renderProject(result);
    });

    // Hàm chức năng //


    // Hàm tạo ra thông báo
    function createToast(message, icon) {
        const div = document.createElement("div");
        div.className = "div--success";

        div.innerHTML = `
        <div class="icon">${icon}</div>
        <div class="content">
            <h4>${message}</h4>
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
        setTimeout(() => {
            div.classList.add("active");

            const process = div.querySelector(".process");
            process.classList.add("active");
            process.style.animationDuration = "3000ms";
        }, 10);

        setTimeout(() => {
            div.classList.remove("active");

            setTimeout(() => {
                div.remove();
            }, 400); 
        }, 3000);
    }
    //

    // Hàm render Dự án


    function renderProject(arr) {
        productList.innerHTML = "";
        let result = arr.filter(c => c.members.some(member => member.userId === curentUser.id && member.role === "Project owner"));

        if (result.length === 0) {
            const tr = document.createElement("tr");
            tr.innerHTML = ` <td colspan="3" style="text-align:center; padding: 20px;">
                Không có dự án
                </td>`;;
            productList.appendChild(tr);
            return;
        }

        let start = (currentPage - 1) * pageSize;
        let end = start + pageSize;
        let displayList = result.slice(start, end);

        displayList.forEach(c => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                        <td>${c.id}</td>
                            <td>${c.projectName}</td>
                            <td class="btn--action">
                            <button class="btn--edit" data-id = "${c.id}">Sửa</button>
                            <button class="btn--delete" data-id = "${c.id}">Xóa</button>
                            <button class="btn--more" data-id = "${c.id}">Chi tiết</button>
                        </td>
                    `;
            productList.appendChild(tr);
        });
        renderPagination();
    }
    //

    // Hàm hiện lỗi
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

    //

    // Hàm làm sạch Input

    // Thêm và sửa
    function clearFormAdd() {
        nameNewProjectInput.value = "";
        newProjectDescription.value = "";
    }
    // Hàm phân trang
    // DOM
    let pagination = document.getElementById("pagination");
    function renderPagination() {
        const result = project.filter(c => c.members.some(member => {
            return member.userId === curentUser.id && member.role === "Project owner";
        }));
        pagination.innerHTML = "";

        const totalPage = Math.ceil(result.length / pageSize);

        if (totalPage <= 1) return;

        // Trang prev
        const btnStart = document.createElement("button");
        btnStart.innerHTML = `<<`;
        btnStart.className = "page-btn";
        if (currentPage === 1) btnStart.disabled = true;
        btnStart.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderProject(project)
            }
        });
        pagination.appendChild(btnStart);

        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPage, startPage + 2);

        if (endPage >= totalPage) {
            startPage = endPage - 2;
        }
        if (startPage <= 0) {
            startPage = 1;
        }


        for (let i = startPage; i <= endPage; i++) {
            const btn = document.createElement("button");
            btn.innerHTML = i;
            btn.className = i === currentPage ? "page-btn active" : "page-btn";
            btn.addEventListener("click", () => {
                currentPage = i;
                renderProject(project);
            });
            pagination.appendChild(btn);
        }

        // Trang next
        const btnEnd = document.createElement("button");
        btnEnd.innerHTML = `>>`;
        btnEnd.className = "page-btn";
        if (currentPage === totalPage) btnEnd.disabled = true;
        btnEnd.addEventListener("click", () => {
            if (currentPage < totalPage) {
                currentPage++;
                renderProject(project);
            }
        });
        pagination.appendChild(btnEnd);
    }
});
function getMaxId(arr) {
    if (arr.length === 0) return 1;
    let max = arr[0].id;
    arr.forEach(c => {
        if (c.id > max) {
            max = c.id;
        }
    });
    return max + 1;
}