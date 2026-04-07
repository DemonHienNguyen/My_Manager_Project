// DOM
window.addEventListener("DOMContentLoaded", () => {

    let overlayWarnning = document.querySelector(".overlay--warnning");
    let warnningPopup = document.querySelector(".wanningPop");

    // Nút đăng xuất
    let btnSignOut = document.getElementById("btn--SignOut");

    let warnningTitle = document.getElementById("title");
    let warnningContent = document.getElementById("content");
    // nút X ở popup
    let sayBye = document.getElementById("sayBye");
    //Nút Xác nhận cập nhập
    let btnDanger = document.getElementById("btn-danger");
    //Nút hủy
    let cancel = document.getElementById("callCancel");

    // Lấy danh sách
    let toDoList = document.getElementById("toDoList");

    let toastList = document.querySelector(".toastSusscess");

    let users = [];
    let tasks = [];
    let projects = [];
    let taskBelongUser = [];
    let curentUser = {};
    let sectionState = {}; // Trạng thái đóng mwor của nhiệm vụ dự án
    let animateSection = {} // Để trạng thái animation của nhiệm vụ
    let updateStatusId = null; // tìm task có id để cập nhập

    // Các biến cở và biến lưu trữ tạm !
    let findFlag = null; // biến để xem có input trong ô tìm kiếm hay không ?
    let sortOrRender = null // Biến để render là render thường hay là sort;
    let nameMission; // Biến lưu trữ key để tìm các nhiệm vụ
    let updateOrSignOut = false; // Biến này để xác định cập nhập và thoát

    function getUser() {
        return JSON.parse(localStorage.getItem("Users")) || [];
    }
    function getCurrentUser() {
        return JSON.parse(localStorage.getItem("curentUser")) || null;
    }
    function getProject() {
        return JSON.parse(localStorage.getItem("Projects")) || [];
    }
    function getTasks() {
        return JSON.parse(localStorage.getItem("Tasks")) || [];
    }

    function saveProject(products) {
        localStorage.setItem("Projects", JSON.stringify(products));
    }
    function saveTasks(tasks) {
        localStorage.setItem("Tasks", JSON.stringify(tasks));
    }


    function reloadTaskData() {
        projects = getProject();
        tasks = getTasks();
        users = getUser();
        curentUser = getCurrentUser();
        taskBelongUser = tasks.filter(c => c.assigneeId === curentUser.id);
    }
    // Hàm hỗ trwoxj render
    function init() {
        reloadTaskData();
        renderAllTask();
    }


    window.onload = () => {
        curentUser = getCurrentUser();
        if (!curentUser) {
            window.location.replace("../page/login.html");
        }
        init();
    }

    window.addEventListener("storage", (e) => {
        if (e.key === "Tasks") {
            reloadTaskData();
            renderAllTask();
            tasks = getTasks();
        }
    });


    // Dấu X
    sayBye.addEventListener("click", () => {
        overlayWarnning.classList.remove("active");
        warnningPopup.classList.remove("active");
        warnningPopup.classList.add("remove");
    });

    // Nút hủy
    cancel.addEventListener("click", () => {
        sayBye.click();
    });
    // Nút sẽ xóa và cập nhập
    btnDanger.addEventListener("click", () => {
        if (!updateOrSignOut) {
            let updateTask = tasks.find(c => c.id === updateStatusId);
            if (!updateTask) return;
            if (updateTask.status === "In Progress") {
                updateTask.status = "Pending"
            } else {
                updateTask.status = "In Progress";
            }
            sayBye.click();
            saveTasks(tasks);
            reloadTaskData();
            renderAllTask();
            createToast("Cập nhập thành công");
            return;
        }
        createToast("Đăng xuất thành công");
        sayBye.click();
        setTimeout(() => {
            localStorage.removeItem("curentUser");
            window.location.href = "../page/login.html";
        }, 3500);
        updateOrSignOut = false;
    });


    // Nút đăng xuất
    btnSignOut.addEventListener("click", (e) => {
        e.preventDefault();
        updateOrSignOut = true;
        warnningPopup.classList.remove("remove");
        warnningPopup.classList.add("active");
        overlayWarnning.classList.add("active");
        btnDanger.textContent = "Đăng xuất";
        btnDanger.style.backgroundColor = "red"
        warnningTitle.textContent = "Đăng xuất";
        warnningContent.textContent = "Bạn muốn đăng xuất ?";
    });

    function renderAllTask() {
        toDoList.innerHTML = "";
        const processTask = getProgressTask();
        toDoList.appendChild(renderMissionSection(processTask));
    }

    // Tạo ra danh sách của từng phần 
    function renderMissionSection(taskList) {
        const fragment = document.createDocumentFragment(); // Tạo ra một Đối tượng DOM Trống (Tạm thời)để thêm vào phần tử thay vì render từng tr một ta đắp vào thành 1 cục rồi mới đắp vào 
        const group = {};
        if (taskBelongUser.length === 0) {
            const summaryRow = document.createElement("tr");
            summaryRow.innerHTML = `
                        <td colspan="7" class="empty ">Chưa có nhiệm vụ nào</td>
                        `;
            fragment.appendChild(summaryRow);
            return fragment;
        }
        taskList.forEach(task => {
            if (!group[task.projectId]) {
                group[task.projectId] = [];
                if (sectionState[task.projectId] === undefined) {
                    sectionState[task.projectId] = true;
                }
                if (animateSection[task.projectId] === undefined) {
                    animateSection[task.projectId] = false;
                }
            }
            group[task.projectId].push(task);

        });
        Object.keys(group).forEach(projectId => {
            const projectName = findNameProject(+projectId);
            const summaryRow = document.createElement("tr");
            // Tạo  ra một hàng  để hiện ra nút riêng
            const valiTask = group[projectId].filter(task => {
                return task.status === "In Progress" || task.status === "Pending";
            });
            if (valiTask.length === 0) return;

            summaryRow.innerHTML = `
                        <td colspan="7" class="summary ${sectionState[projectId] ? "open" : "hide"} task-row"
                            data-id = "${projectId}">
                            <img src="../resoure/image/toLeft.png" alt="">
                            ${projectName}
                            (${valiTask.length})
                        </td>
                        `;
            fragment.appendChild(summaryRow);

            if (sectionState[projectId]) {
                valiTask.forEach((task, index) => {
                    const tr = document.createElement("tr");
                    tr.className = `tr--summary-child `;
                    tr.innerHTML = `
                                                <td>${task.taskName}</td>
                                                <td class="${getPriorityClass(task.priority)}"><span>${task.priority}</span></td>
                                                <td>${task.status} <button class="btn--change" data-id = "${task.id}"><img src="../resoure/image/ButChiTrenGiay.svg"
                                                        alt=""></button></td>
                                                <td>${formatMonthAndDay(task.assignDate)}</td>
                                                <td>${formatMonthAndDay(task.dueDate)}</td>
                                                <td class="${getProgressClass(task.progress)}"><span>${task.progress}</span></td>
                                        `;
                    if (animateSection[projectId]) {
                        tr.style.setProperty("--i", index * 300 + "ms");
                    }
                    fragment.appendChild(tr);
                });
            }
            animateSection[projectId] = false;
        });

        return fragment;
    }
    toDoList.addEventListener("click", (e) => {
        const row = e.target.closest(".summary");
        if (row) {
            const id = row.dataset.id;
            sectionState[id] = !sectionState[id];
            animateSection[id] = true;
            renderAllTask();
        }
        const btn = e.target.closest(".btn--change");
        if (btn) {
            updateStatusId = +btn.dataset.id;
            overlayWarnning.classList.add("active");
            warnningPopup.classList.add("active");
            warnningPopup.classList.remove("remove");
            btnDanger.textContent = "Xác nhận";
            btnDanger.style.backgroundColor = "#0D6EFD"
            warnningTitle.textContent = "Cập nhập trạng thái";
            warnningContent.textContent = "Xác nhận cập nhập trạng thái nhiệm vụ ?";
        }
    });
    // Render vừa lọc vừa tìm kiếm
    // DOM
    let sortBy = document.getElementById("sortBy");
    let findInput = document.getElementById("findInput");
    function getProgressTask() {
        let result = [...taskBelongUser];
        //  1 Lọc
        if (findFlag !== null) {
            result = result.filter(c => c.taskName.toLowerCase().trim().includes(nameMission.toLowerCase().trim()));
        }
        // 2  Sort
        if (sortOrRender !== null) {
            if (sortBy.value === "Độ ưu tiên") {
                const order = {
                    "Cao": 1, "Trung bình": 2, "Thấp": 3
                }
                result.sort((a, b) => order[a.priority] - order[b.priority]);
            }
            if (sortBy.value === "Hạn chót") {
                result.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            }
        }
        return result;
    }
    // Sự kiện khi tìm kiếm
    findInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            nameMission = e.target.value;
            if (nameMission === "") {
                findFlag = null;
                renderAllTask();
                return;
            }
            findFlag = -1;
            renderAllTask();
        }
    });
    sortBy.addEventListener("change", renderByCurrentSort);
    function renderByCurrentSort() {
        reloadTaskData();
        if (sortBy.value === "") {
            sortOrRender = null;
            renderAllTask();
            return;
        }
        sortOrRender = -1;
        renderAllTask();
    };


    // Hàm tạo ra thống báo khi đăng xuất thành công  !
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
    // Hàm chức năng
    function findNameProject(projectId) {
        let result = projects.find(c => c.id === projectId);
        return result.projectName;
    }

    // Hàm lấy render ra hiệu xuất và tiến độ
    function getPriorityClass(priority) {
        if (priority === "Thấp") return "low";
        if (priority === "Trung bình") return "medium";
        return "high";
    }
    function getProgressClass(progress) {
        if (progress === "Đúng tiến độ") return "onProgress";
        if (progress === "Có rủi ro") return "thereAreRisks";
        return "repayment";
    }
    //
    // Hàm lấy format ngày tháng
    function formatMonthAndDay(date) {
        const d = new Date(date);

        const day = d.getDate().toString().padStart(2, "0");
        const month = (d.getMonth() + 1).toString().padStart(2, "0");

        return `${month + "-" + day}`;
    }
    //
});