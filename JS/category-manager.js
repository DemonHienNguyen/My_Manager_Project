// Các hàm sử dụng 
/*
    HÀM TẠO TOAST
        createToast();                   tạo ra thông báo khi làm việc gì đó

    HÀM RENDER
        RENDER CHI TIẾT DỰ ÁN BÊN TRONG 

        renderDetailProject           render Tiêu đề dự án và mô tả dự án

        renderTaskSection             render task theo từng phần là To Do, In Progress, Pending và Done
        (renderAllTask Hàm phụ)       render ra hết các task thuộc trong đó


        progressTask                   hàm để trả về một mảng đã được lọc và sắp xếp
        (renderAllTaskFind Hàm phụ )  render task được lọc bởi tên và sắp xếp theo select
        

        RENDER THÀNH VIÊN Ở NGOÀI

        renderMemberProjectOutSide();   render các thành viên ở ngoài (Hiển thị)
        
        RENDER THÀNH VIÊN Ở TRONG

        renderMemberProjectInside    render các thành viên khi bấm vào 3 chấm

    HÀM TÌM

        findNameParticipantsInTaskInThatProject    Tìm tên của người vừa có tài khoản, vừa có trong member của dự án đó

        findNameParticipantsInProject              Hàm tìm tên của người trong Urser

    HÀM LÀM SẠCH VÀ RELOAD

        clearFormAddMember              Hàm làm sạch thêm thành viên

        clearFormAddMission             Hàm làm sạch thêm nhiệm vụ và sửa

        reloadTaskData                  Hàm reload lại và cập nhập lại các giá trị

        init                            Hàm hỗ trợ khi render lúc đâu hay là làm mới trang
*/


/*
    DOM và phần tử (Biến)
*/
// Để load phần tử HTML trước và load được file js data ta dùng
window.addEventListener("DOMContentLoaded", () => {


    let productList = document.querySelector(".missionList");
    // let btnOrtherMember = document.getElementById("orther");

    let popAddOrFix = document.querySelector(".popNote");

    let warningPop = document.querySelector(".wanningPop");
    let titleWarning = document.getElementById("title");
    let contentWarning = document.getElementById("content");

    let addDeverlopPop = document.querySelector(".addDeverlop");
    let memberList = document.querySelector(".Member");

    let overlay = document.querySelector(".overlay");
    let overlayWarn = document.querySelector(".overlay--warnning");
    let overlayAddDev = document.querySelector(".overlayAdd");
    let overlayDisplayMember = document.querySelector(".overlay--devMember");

    let btnDeletePop = document.getElementById("sayByePop");
    let btnDel_warning = document.getElementById("sayBye");
    let btnExit = document.querySelector(".escape");
    let btnDeletePopMember = document.querySelector(".btn--exit");

    let btnDel = document.getElementById("btn--cancel");
    let btnBye = document.getElementById("callCancel");
    let btnAddCancel = document.getElementById("addDeverlop--cancel");
    let btnMemberCancel = document.getElementById("Member--cancel");

    let btnSignOut = document.getElementById("btn--SignOut");

    let btnAdd = document.getElementById("btn--addProject");
    let btnAddDeverloper = document.getElementById("btn--addDever");

    let btnDanger = document.getElementById("btn-danger");
    let btnSave = document.getElementById("btn--save");
    let btnSaveDeverlop = document.getElementById("addDeverlop--save");
    let btnSaveMember = document.getElementById("Member--save");

    let toastList = document.querySelector(".toastSusscess");


    // BIẾN
    let users = []; // biến lưu trữ người dùng

    let projects = []; // biến lưu trữ tất cả dữ liệu project
    let deleteAndEscape = null; // flag để đổi khi  xóa hoặc đăng xuất
    let deleteMember = null; // flag để đổi khi xóa thành viên
    let editId = null; // Biến để lưu thêm hoặc sửa
    let sortOrRender = null; /// Biến đề render được sắp xếp hoặc render thường
    let findFlag = null; // Biến để render ra phần thử để tìm kiếm

    let detailProject = []; // Lấy dữ liệu dự án chi tiết khi mình nhấn vào
    let taskInProject = []; // Lấy các task của dự án đó;

    let detailId; //  lấy key productId  để mò được dự án chi tiết
    let tasks = []; // lấy task từ local strorage

    let toDoTask = []; // Các task Cần phải làm
    let inProgressTask = []; // Các task Đang trong !
    let inPendingTask = []; // Các task Đang sắp hoàn thành
    let doneTask = []; // Các task Hoàn thành

    // Random màu avatar cho thành viên !
    const colors = [
        "#0D6EFD", "#6610f2", "#6f42c1", "#8A2BE2",
        "#d63384", "#DC3545", "#fd7e14", "#FFA500",
        "#ffc107", "#198754", "#20c997", "#0dcaf0",
        "#6c757d", "#343a40", "#ff6b6b", "#f06595",
        "#cc5de8", "#845ef7", "#5c7cfa", "#339af0",
        "#22b8cf", "#20c997", "#51cf66", "#94d82d",
        "#fcc419", "#ff922b", "#ff6b6b", "#f03e3e",
        "#e03131", "#c92a2a", "#a61e4d", "#862e9c",
        "#5f3dc4", "#364fc7", "#1864ab", "#0b7285"
    ];
    // Màu mè
    const garident = [
        "linear-gradient(45deg, #0D6EFD, #6610f2)",
        "linear-gradient(45deg, #ff6b6b, #f06595)",
        "linear-gradient(45deg, #20c997, #0dcaf0)",
        "linear-gradient(45deg, #fab005, #fd7e14)"
    ];
    //
    // Dóng mở trạng thái 
    let sectionState = {
        todo: true,
        inprogress: true,
        pending: true,
        done: true
    };
    // animate 1 lần
    let animateSection = {
        todo: false,
        inprogress: false,
        pending: false,
        done: false
    }


    // Lấy dữ liệu người dùng
    function getUser() {
        return JSON.parse(localStorage.getItem("Users")) || [];
    }
    function getCurrentUser() {
        return JSON.parse(localStorage.getItem("curentUser")) || null;
    }
    function getProject() {
        return JSON.parse(localStorage.getItem("Projects")) || [];
    }
    function getCurrentProjectId() {
        return JSON.parse(localStorage.getItem("curentProjectId"));

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
    window.addEventListener("storage", () => {
        projects = getProject();
    });


    // Hàm reload
    function reloadTaskData() {
        projects = getProject();
        tasks = getTasks();
        detailId = +getCurrentProjectId();
        users = getUser();
        detailProject = projects.find(c => c.id === detailId);
        taskInProject = tasks.filter(c => c.projectId === detailId);
        toDoTask = taskInProject.filter(c => c.status === "To do");
        inProgressTask = taskInProject.filter(c => c.status === "In Progress");
        inPendingTask = taskInProject.filter(c => c.status === "Pending");
        doneTask = taskInProject.filter(c => c.status === "Done");
    }
    // Hàm hỗ trwoxj render
    function init() {
        reloadTaskData();
        renderDetailProject(projects);
        renderMemberProjectOutSide(detailProject.members);
        renderAllTask();
    }
    // chặn khi back lại
    window.onload = () => {
        curentUser = getCurrentUser();
        if (!curentUser) {
            window.location.replace("../page/login.html");
        }
        init();
        // console.log(getDayNow(new Date()));
        // console.log(getMonthNow(new Date()));
        // console.log(getYearNow(new Date()));

    }
    window.addEventListener("storage", (e) => {
        if (e.key === "Tasks") {
            reloadTaskData();
            renderAllTask();
        }
    })

    //  sửa và xóa
    productList.addEventListener("click", (e) => {
        // sửa nhiệm vụ
        if (e.target.classList.contains("btn--edit")) {
            popAddOrFix.classList.remove("remove");
            popAddOrFix.classList.add("active");
            overlay.classList.add("active");
        }
        // xóa nhiệm vụ
        if (e.target.classList.contains("btn--delete")) {
            deleteAndEscape = +e.target.dataset.id;
            warningPop.classList.remove("remove");
            warningPop.classList.add("active");
            overlayWarn.classList.add("active");
            btnDanger.textContent = "Xóa";
            titleWarning.textContent = "Xác nhận xóa";
            contentWarning.textContent = "Bạn có chắc chắn muốn xóa dự án này ?";
        }
    });


    // xóa nhiệm vụ : dấu X bên phải ngoài cùng
    // Cảnh cáo
    btnDel_warning.addEventListener("click", () => {
        warningPop.classList.remove("active");
        overlayWarn.classList.remove("active");
        warningPop.classList.add("remove");
    });
    // Thêm nhiệm vụ
    btnDeletePop.addEventListener("click", () => {
        clearFormAddMission();
        popAddOrFix.classList.add("remove");
        popAddOrFix.classList.remove("active");
        overlay.classList.remove("active");
        editId = null;
    });
    // Thêm thành viên

    btnExit.addEventListener("click", () => {
        clearFormAddMember();
        addDeverlopPop.classList.add("remove");
        addDeverlopPop.classList.remove("active");
        overlayAddDev.classList.remove("active");
    });
    // Xóa thành viên
    btnDeletePopMember.addEventListener("click", () => {
        memberList.classList.add("remove");
        overlayDisplayMember.classList.remove("active");
        memberList.classList.remove("active");
    });
    // 



    /*
        Các phím khi nhấn nút hủy : góc bên phải dưới cùng
    */
    // HỦY thêm nhiệm vụ
    btnDel.addEventListener("click", () => {
        clearFormAddMission();
        editId = null;
        btnDeletePop.click();
    });
    // HỦY Xóa và cảnh cáo đăng xuất
    btnBye.addEventListener("click", () => {
        btnDel_warning.click();
    });
    // HỦY Thêm thành viên  trong nhóm
    btnAddCancel.addEventListener("click", () => {
        clearFormAddMember();
        btnExit.click();
    });
    // HỦY xem danh sách thành viên
    btnMemberCancel.addEventListener("click", () => {
        btnDeletePopMember.click();
    });
    // 



    /*
        Chức năng: Lưu hoặc thêm vào /cập nhập/Xóa/Đăng xuất : nút bên phải ở góc dưới Đỏ/  Xanh
    */
    // Thêm / Sửa nhiệm vụ
    // DOM:
    // Input
    let missionProjectAdd = document.getElementById("addOrEditInput"); // lấy tên nhiệm vụ
    let missionStatus = document.getElementById("missionStatus"); // Lấy trạng thái của nhiệm vụ
    let dayStart = document.getElementById("dayStart"); // ngày bắt đầu
    let dayEnd = document.getElementById("dayEnd"); // Ngày hết
    let acriStatusMision = document.getElementById("acriStatus") // lấy độ ưu tiên
    let missionProgress = document.getElementById("processInput"); // Lấy tiến độ

    // DOM Lấy lỗi
    let errorNameMission = document.getElementById("errorNameProject");
    let errorPersonInChange = document.getElementById("errorPersonInChange");
    let errorMissionStatus = document.getElementById("errorMissionStatus");
    let errorDayStart = document.getElementById("errorDayStart");
    let errorDayEnd = document.getElementById("errorDayEnd");
    let errorAcriStatus = document.getElementById("errorAcriStatus");
    let errorMissionProgress = document.getElementById("errorMissionProgress");


    // Hàm sẽ render và lấy giá trị luôn
    let assigneePerson = document.getElementById("personInChange");
    function renderAssigneeMember(arr) {
        assigneePerson.innerHTML = `
            <option value="">Chọn người phụ trách</option>
        `;
        arr.forEach(c => {
            const option = document.createElement("option");
            option.value = `${c.userId}`;
            option.innerHTML = `
                ${findNameParticipantsInProject(c.userId)}
            `;
            assigneePerson.appendChild(option);
        });
    }
    //

    // Sự kiện khi thêm nhiệm vụ
    btnSave.addEventListener("click", () => {

        const missionName = missionProjectAdd.value.trim();
        if (missionName === "") {
            showError(errorNameMission, missionProjectAdd, "Tên nhiệm vụ không được để trống !");
            return;
        }
        if (missionName.length > 100) {
            showError(errorNameMission, missionProjectAdd, "Tên nhiệm vụ tối đa 100 ký tự !");
            return;
        }
        // if (taskInProject.some(c => c.taskName.toLowerCase() === missionName.toLowerCase())) {
        //     showError(errorNameMission, missionProjectAdd, "Tên nhiệm vụ không được trùng !");
        //     return;
        // }
        const assigneeMember = assigneePerson.value.trim();
        if (assigneeMember === "") {
            showError(errorPersonInChange, assigneePerson, "Vui lòng chọn người phụ trách !");
            return;
        }
        const status = missionStatus.value.trim();
        if (status === "") {
            showError(errorMissionStatus, missionStatus, "Vui lòng chọn trạng thái nhiệm vụ");
            return;
        }
        const date = dayStart.value;
        if (date === "") {
            showError(errorDayStart, dayStart, "Vui lòng chọn ngày bắt đầu !");
            return;
        }
        if (isStartValidate(date)) {
            showError(errorDayStart, dayStart, "Ngày bắt đầu không được kém hơn hôm nay !");
            return;
        }
        const dateEnd = dayEnd.value;
        if (dateEnd === "") {
            showError(errorDayEnd, dayEnd, "Ngày kết thúc không được để trống !");
            return;
        }
        if (!isEndValidate(date, dateEnd)) {
            showError(errorDayEnd, dayEnd, "Ngày kết thúc không được kém hơn ngày bắt đầu !");
            return;
        }
        const acriStatus = acriStatusMision.value;
        if (acriStatus === "") {
            showError(errorAcriStatus, acriStatusMision, "Vui lòng nhập độ ưu tiên !");
            return;
        }
        const progress = missionProgress.value;
        if (progress === "") {
            showError(errorMissionProgress, missionProgress, "Vui lòng nhập tiến độ nhiệm vụ !");
            return;
        }
        if (editId === null) {
            if (taskInProject.some(c => c.taskName.toLowerCase() === missionName.toLowerCase())) {
                showError(errorNameMission, missionProjectAdd, "Tên nhiệm vụ không được trùng !");
                return;
            }
            tasks.push({
                id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
                taskName: missionName,
                assigneeId: +assigneeMember,
                projectId: detailId,
                assignDate: `${getYearNow(date) + "-" + getMonthNow(date) + "-" + getDayNow(date)}`,
                dueDate: `${getYearNow(dateEnd) + "-" + getMonthNow(dateEnd) + "-" + getDayNow(dateEnd)}`,
                priority: acriStatus,
                progress: progress,
                status: status,
            });
            createToast("Thêm thành công");
        } else {
            if (taskInProject.some(c => c.taskName.toLowerCase() === missionName.toLowerCase() && c.id !==editId) ) {
                showError(errorNameMission, missionProjectAdd, "Tên nhiệm vụ không được trùng !");
                return;
            }
            const updateTask = taskInProject.find(c => c.id === editId);
            updateTask.taskName = missionProjectAdd.value;
            updateTask.assigneeId = +assigneePerson.value;
            updateTask.projectId = detailId;
            updateTask.assignDate = dayStart.value;
            updateTask.dueDate = dayEnd.value;
            updateTask.priority = acriStatusMision.value;
            updateTask.progress = missionProgress.value;
            updateTask.status = missionStatus.value;
            createToast("cập nhập thành công");
            editId = null;
        }
        saveTasks(tasks);
        // renderAllTask();
        clearFormAddMission();
        init();
        renderByCurrentSort();
        btnDeletePop.click();


    });
    //


    // Xóa nhiệm vụ, xóa thành viên và đăng xuất !
    btnDanger.addEventListener("click", () => {
        if (deleteAndEscape === -1) {
            // đăng xuất
            createToast("Đăng xuất thành công");
            btnDel_warning.click();
            setTimeout(() => {
                localStorage.removeItem("curentUser");
                window.location.href = "../page/login.html";
            }, 3500);
            deleteAndEscape = null;
            return;
        }
        if (deleteMember !== null) {
            // xóa thành viên
            const role = detailProject.members.find(c => c.userId === deleteMember).role;
            if (role === "Project owner") {
                btnDel_warning.click();
                createToast("Không được xóa Project owner");
                return;
            }
            detailProject.members = detailProject.members.filter(c => c.userId !== deleteMember);
            saveProject(projects);
            btnDel_warning.click();
            // btnDeletePopMember.click();
            createToast("Xóa thành công");
            renderMemberProjectInside(detailProject.members)
            deleteMember = null;
            init();
            return;
        }
        if (deleteAndEscape !== -1) {
            // xóa nhiệm vụ
            tasks = tasks.filter(c => c.id !== deleteAndEscape);
            saveTasks(tasks);
            init();
            createToast("Xóa thành công");
            btnDel_warning.click();
            deleteAndEscape = null;
            return;
        }
    });
    // Lưu khi Thêm thành viên mới
    // DOM
    let devEmailInput = document.getElementById("addDevInput");
    let devRoleInput = document.getElementById("devRoleInput");
    // DOM LỖI
    let errorEmailDevInput = document.getElementById("errorAddEmailDev");
    let errorRoleAddInput = document.getElementById("errorAddRoleDev");

    btnSaveDeverlop.addEventListener("click", () => {
        const emailInput = devEmailInput.value.trim();
        if (emailInput === "") {
            showError(errorEmailDevInput, devEmailInput, "Email không được để trống");
            return;
        }
        if (!validateEmailRegex(emailInput)) {
            showError(errorEmailDevInput, devEmailInput, "Email không đúng định dạng !");
            return;
        }
        const haveExistUser = users.find(c => c.email === emailInput);
        if (!haveExistUser) {
            showError(errorEmailDevInput, devEmailInput, "Email không tồn tại !");
            return;
        }
        if (detailProject.members.some(c => findEmailParticipantsInProject(c.userId) === emailInput)) {
            showError(errorEmailDevInput, devEmailInput, "Email đã ở trong danh sách !");
            return;
        }
        const role = devRoleInput.value.trim();
        if (role === "") {
            showError(errorRoleAddInput, devRoleInput, "Vai trò không được để trống !");
            return;
        }
        if (role.length > 50) {
            showError(errorRoleAddInput, devRoleInput, "Vai trò không được quá 50 ký tự !");
            return;
        }
        detailProject.members.push({
            userId: haveExistUser.id,
            role,
        });
        saveProject(projects);
        detailProject = projects.find(c => c.id === detailId);
        renderMemberProjectOutSide(detailProject.members);
        clearFormAddMember();
        btnExit.click();
    });

    //


    /*
        Sự  Kiện Buton thêm dự án, thêm thành viên và show thành viên (Sự kiện duy nhất);
    */
    // Thêm Nhiệm vụ
    // Láy DOM:

    btnAdd.addEventListener("click", () => {
        popAddOrFix.classList.remove("remove");
        popAddOrFix.classList.add("active");
        overlay.classList.add("active");
        renderAssigneeMember(detailProject.members);
    });

    // thêm Thành viên vào

    btnAddDeverloper.addEventListener("click", () => {
        addDeverlopPop.classList.remove("remove");
        overlayAddDev.classList.add("active");
        addDeverlopPop.classList.add("active");

    });
    // Sắp xếp dữ liệu
    // DOM
    let sortBy = document.getElementById("sortBy");
    //
    sortBy.addEventListener("change", renderByCurrentSort);
    function renderByCurrentSort() {
        reloadTaskData();
        if (sortBy.value === "") {
            sortOrRender = null;
            progressTask();
            return;
        }
        sortOrRender = -1;
        progressTask();
    };
    //
    // Hàm tìm nhiệm vụ
    // DOM
    let missionFind = document.getElementById("findMission");
    // Các biến để thực thi
    let nameMission;
    missionFind.addEventListener("input", (e) => {
        nameMission = e.target.value;
        if (nameMission === "") {
            findFlag = null;
            reloadTaskData();
            progressTask();
            return;
        }
        findFlag = -1;
        progressTask();
    });


    //  Đăng xuất
    btnSignOut.addEventListener("click", (e) => {
        e.preventDefault();
        deleteAndEscape = -1;
        warningPop.classList.remove("remove");
        warningPop.classList.add("active");
        overlayWarn.classList.add("active");
        btnDanger.textContent = "Đăng xuất";
        titleWarning.textContent = "Đăng xuất";
        contentWarning.textContent = "Bạn muốn đăng xuất";
    });
    //




    //click ngoài : Các lớp này dùng  để làm mờ background cho hợp  lý lại
    // Lớp thêm dự án
    // overlay.addEventListener("click", (e) => {
    //     if (e.target.classList.contains("overlay")) {
    //         btnDeletePop.click();
    //     }
    // });
    // // lớp cảnh cáo
    // overlayWarn.addEventListener("click", (e) => {
    //     if (e.target.classList.contains("overlay--warnning")) {
    //         btnDel_warning.click();
    //     }
    // });
    // // lớp thêm thành viên
    // overlayAddDev.addEventListener("click", (e) => {
    //     if (e.target.classList.contains("overlayAdd")) {
    //         btnExit.click();
    //     }
    // });
    // // lớp hiển thị thành viên
    // overlayDisplayMember.addEventListener("click", (e) => {
    //     if (e.target.classList.contains("overlay--devMember")) {
    //         btnDeletePopMember.click();
    //     }
    // });
    //


    /*
        Các hàm thực thi
    */
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
        }, 4500);
    }
    //


    // Hàm Hiện tiêu đề và mo tả của dự án
    // DOM 
    let titleProject = document.getElementById("projectName");
    let descriptionProject = document.getElementById("projectDescription");

    function renderDetailProject(arr) {
        const detailId = +getCurrentProjectId();
        let detailProject = arr.find(c => c.id === detailId);
        titleProject.textContent = `${detailProject.projectName}`;
        descriptionProject.textContent = `${detailProject.projectDecription}`;
    }
    //

    // Hàm hiển thị thành viên trong project đó (Bên ngoài)
    // DOM:
    let participantsList = document.getElementById("participantsList");
    function renderMemberProjectOutSide(member) {
        participantsList.innerHTML = "";
        const members = member.slice(0, 2);
        members.forEach(c => {
            const div = document.createElement("div");
            div.className = "participants";
            div.innerHTML = `
                <div class="name" style = "background-color: ${getColorById(c.userId)}" >${findNameParticipantsInProject(c.userId).slice(0, 2)}</div>
                    <div class="position">
                    <h4>${findNameParticipantsInProject(c.userId)}</h4>
                    <p>${c.role}</p>
                </div>
            `;
            participantsList.appendChild(div);
        });
        if (member.length >= 1) {
            renderOrtherParticipants();
        }
    }
    //


    // HÀM hiển thị thành viên: Bên trong orther !
    // DOM Để render:
    let memberListInside = document.getElementById("memberList");

    function renderMemberProjectInside(memmbers) {
        memberListInside.innerHTML = ``;
        memmbers.forEach(c => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                 <td>
                    <div class = "arvatar" style = "background-color: ${getColorById(c.userId)}">${findNameParticipantsInProject(c.userId).slice(0, 2)}</div>
                    <div class = "information">
                        <h4>${findNameParticipantsInProject(c.userId)}</h4>
                        <p>${findEmailParticipantsInProject(c.userId)}</p>
                    </div>
                </td>
                <td>
                    <select value="${c.role}" class = "memberRole">
                        <option value="${c.role}">${c.role}</option>
                        <option value="Fontend Developer">Fontend Developer</option>
                        <option value="UX / UI Designer">UX / UI Designer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Project owner">Project Owner</option>
                    </select>
                    <button class ="btn--deleteMember" data-id="${c.userId}"><img src="../resoure/image/Trash.png" alt=""></button>
                    </td>
                    `;
            memberListInside.appendChild(tr);
        });
        // <input type="selection" value="${c.role}" class = "memberRole">

    }
    //
    // Sự kiện bên trong danh sách thành viên (Bao gồm xóa)
    memberListInside.addEventListener("click", (e) => {
        const btn = e.target.closest(".btn--deleteMember");
        if (btn) {
            const roleWanadelete = btn.closest("tr").querySelector(".memberRole").value;
            deleteMember = +btn.dataset.id;
            warningPop.classList.remove("remove");
            warningPop.classList.add("active");
            overlayWarn.classList.add("active");
            btnDanger.textContent = "Xóa";
            titleWarning.textContent = "Xóa";
            contentWarning.innerText = `Bạn muốn xóa thành viên này:
                                        ${findNameParticipantsInProject(deleteMember)} vai trò :${roleWanadelete}`;
        }
    });
    // Lưu khi hiển thị danh sách thành viên
    // DOM lấy lỗi 
    let errorMember = document.getElementById("errorMember");
    btnSaveMember.addEventListener("click", () => {
        const valueMember = Array.from(memberListInside.querySelectorAll(".memberRole"));
        const hasNoneRole = valueMember.find(c => c.value === "");
        if (hasNoneRole) {
            showError(errorMember, hasNoneRole, "vai trò không được để trống");
            return;
        }
        if (!valueMember.some(c => c.value === "Project owner")) {
            showError(errorMember, valueMember[0], "Phải có người là Project owner");
            return;
        }
        const ownerCount = valueMember.reduce((count, cur) => {
            return cur.value === "Project owner" ? count + 1 : count
        }, 0);
        if (ownerCount > 1) {
            showError(errorMember, valueMember.find(c => c.value === "Project owner"), "Không thể có 2 người là Project owner");
            return;
        }
        detailProject.members.forEach((c, index) => {
            c.role = valueMember[index].value;
        });
        saveProject(projects);
        btnDeletePopMember.click();
        init();
    });


    //////
    // Hiển thị nhiều người nhiều người
    //DOM: 
    function renderOrtherParticipants() {
        const div = document.createElement("div");
        div.className = "orther";
        div.innerHTML = `
                <button id = "orther">
                <img src="../resoure/image/Orther.png" alt="">
                </button>
        `;
        participantsList.appendChild(div);
    }

    // Sự kiển duy nhất ở màn hình: Do render ra Phần tử nút hiển thị nhiều người nên phải để đây mới có thể lấy được !
    // Hiển thị thành viên trong dự án
    participantsList.addEventListener("click", (e) => {
        if (e.target.closest("#orther")) {
            memberList.classList.remove("remove");
            overlayDisplayMember.classList.add("active");
            memberList.classList.add("active");
            renderMemberProjectInside(detailProject.members);
        }
    });

    /////
    // Hàm render ra danh sách nhiệm vụ
    // DOM: 
    let toDoList = document.getElementById("toDoList");
    function renderAllTask() {
        toDoList.innerHTML = "";
        toDoList.appendChild(renderTaskSection("To do", toDoTask, "todo", sectionState.todo));
        toDoList.appendChild(renderTaskSection("In Progress", inProgressTask, "inprogress", sectionState.inprogress));
        toDoList.appendChild(renderTaskSection("In Pending", inPendingTask, "pending", sectionState.pending));
        toDoList.appendChild(renderTaskSection("Done", doneTask, "done", sectionState.done));
    }


    // Tạo ra danh sách của từng phần 
    function renderTaskSection(title, tasks, key, isOpen = true) {
        const fragment = document.createDocumentFragment(); // Tạo ra một Đối tượng DOM Trống (Tạm thời)để thêm vào phần tử thay vì render từng tr một ta đắp vào thành 1 cục rồi mới đắp vào 
        // Tạo  ra một hàng  để hiện ra nút riêng
        const summaryRow = document.createElement("tr");
        summaryRow.innerHTML = `
                <td colspan="7" class="summary ${isOpen ? "open" : "hide"} task-row" data-id = "${key}">
                    <img src="../resoure/image/toLeft.png" alt="">
                    ${title} (${tasks.length})
                </td>
                `;
        fragment.appendChild(summaryRow);
        // nếu như trạng thái mà mở thì ta sẽ hiện ra danh sách
        if (isOpen) {
            tasks.forEach((c, index) => {
                const tr = document.createElement("tr");
                tr.className = `tr--summary-child ${key}`;
                tr.innerHTML = `
                            <td>${c.taskName}</td>
                            <td>${findNameParticipantsInTaskInThatProject(c.assigneeId)}</td>
                            <td class="${getPriorityClass(c.priority)}"><span>${c.priority}</span></td>
                            <td>${formatMonthAndDay(c.assignDate)}</td>
                            <td>${formatMonthAndDay(c.dueDate)}</td>
                            <td class="${getProgressClass(c.progress)}"><span>${c.progress}</span></td>
                            <td class="btn--action">
                                <button class="btn--edit" data-id="${c.id}">Sửa</button>
                                <button class="btn--delete" data-id="${c.id}">Xóa</button>
                            </td>
                    `;
                if (animateSection[key]) {
                    tr.style.setProperty("--i", index * 300 + "ms");
                }
                fragment.appendChild(tr);
            });
        }
        animateSection[key] = false;
        return fragment;
    }
    //
    // Sự kiện khi clidk vào thì sẽ render ra danh sách
    toDoList.addEventListener("click", (e) => {
        const idRow = e.target.closest(".summary");
        if (idRow) {
            const key = idRow.dataset.id;
            if (!sectionState[key]) {
                animateSection[key] = true;
            }
            sectionState[key] = !sectionState[key];
            if (findFlag !== null) {
                progressTask();
                return;
            }
            if (sortOrRender !== null) {
                renderByCurrentSort();
                return;
            }
            if (sortOrRender === null) {
                renderAllTask();
                return;
            }
        }
        if (e.target.classList.contains("btn--edit")) {
            editId = +e.target.dataset.id;
            renderAssigneeMember(detailProject.members);
            const result = taskInProject.find(c => c.id === editId);
            missionProjectAdd.value = result.taskName;
            assigneePerson.value = result.assigneeId;
            missionStatus.value = result.status;
            dayStart.value = result.assignDate;
            dayEnd.value = result.dueDate;
            acriStatusMision.value = result.priority;
            missionProgress.value = result.progress;
        }
        if (e.target.classList.contains("btn--delete")) {
            deleteAndEscape = +e.target.dataset.id;
        }
    });
    //


    // Tạo ra danh sách đã được sắp xếp và lọc
    function progressTask() {
        reloadTaskData();
        let result = [...taskInProject];
        //  1 Lọc
        if (findFlag !== null) {
            result = result.filter(c => c.taskName.toLowerCase().trim().includes(nameMission.toLowerCase().trim()));
        }
        // 2  Sort
        if (sortBy.value === "Độ ưu tiên") {
            const order = {
                "Cao": 1, "Trung bình": 2, "Thấp": 3
            }
            result.sort((a, b) => order[a.priority] - order[b.priority]);
        }
        if (sortBy.value === "Tiến độ") {
            const order = {
                "Đúng tiến độ": 1, "Có rủi ro": 2, "Trễ hạn": 3
            };
            result.sort((a, b) => order[a.progress] - order[b.progress]);
        }

        const todo = result.filter(c => c.status === "To do");
        const inprogress = result.filter(c => c.status === "In Progress");
        const pending = result.filter(c => c.status === "Pending");
        const done = result.filter(c => c.status === "Done");

        renderAllTaskFind(todo, inprogress, pending, done);
    }
    //


    // Hàm render để vừa lọc vừa tìm
    function renderAllTaskFind(sessionTaskToDo, sessionTaskInProgress, sessionTaskInPending, sessionTaskDone) {
        toDoList.innerHTML = "";
        toDoList.appendChild(renderTaskSection("To do", sessionTaskToDo, "todo", sectionState.todo));
        toDoList.appendChild(renderTaskSection("In Progress", sessionTaskInProgress, "inprogress", sectionState.inprogress));
        toDoList.appendChild(renderTaskSection("In Pending", sessionTaskInPending, "pending", sectionState.pending));
        toDoList.appendChild(renderTaskSection("Done", sessionTaskDone, "done", sectionState.done));
    }
    //


    // hàm tìm TÊN kiếm người Trong Project đó
    function findNameParticipantsInProject(memberUserId) {
        const result = users.find(c => c.id === memberUserId);
        return result ? result.name : "unknow";
    }
    //
    // Hàm tìm EMAIL người trong project đó
    function findEmailParticipantsInProject(memberUserId) {
        const result = users.find(c => c.id === memberUserId);
        return result ? result.email : "unknow";
    }
    //
    function findNameParticipantsInTaskInThatProject(memberUserId) {
        if (!detailProject.members.some(c => c.userId === memberUserId)) {
            return "unknow";
        }
        const user = users.find(u => u.id === memberUserId);
        return user ? user.name : "User không tồn tại";
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


    // Hàm lấy ngày hiện tại của mình
    function getDayNow(date) {
        const now = new Date(date);
        return now.getDate().toString().padStart(2, "0");
    }
    //
    function getMonthNow(date) {
        const now = new Date(date);
        return (now.getMonth() + 1).toString().padStart(2, "0");
    }
    //
    function getYearNow(date) {
        const now = new Date(date);
        return now.getFullYear().toString();
    }
    //
    // Hàm So sánh để validate
    function isStartValidate(startDate) {
        const now = new Date();
        const start = new Date(startDate);

        now.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);

        return now >= start;
    }
    function isEndValidate(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        return end > start;
    }
    //
    // Hàm validate Email
    function validateEmailRegex(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    // Hàm lấy format ngày tháng
    function formatMonthAndDay(date) {
        const d = new Date(date);

        const day = d.getDate().toString().padStart(2, "0");
        const month = (d.getMonth() + 1).toString().padStart(2, "0");

        return `${month + "-" + day}`;
    }
    //

    // HÀM LỖI
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



    // Hàm Lấy màu để làm background cho arvata
    function getColorById(userId) {
        return colors[userId % colors.length];
    }
    //

    // Hàm Cũng để lấy màu nhưng đẹp tí :D
    function getColorGradient(userId) {
        return garident[userId % colors.length];
    }


    // Hàm làm clearForm



    // ClearformThem thành viên
    function clearFormAddMember() {
        devEmailInput.value = "";
        devRoleInput.value = "";
    }
    //
    // Ham clear form Thêm nhiệm vụ

    function clearFormAddMission() {
        missionProjectAdd.value = "";
        missionStatus.value = "";
        dayStart.value = "";
        dayEnd.value = "";
        acriStatusMision.value = "";
        missionProgress.value = "";
        assigneePerson.value = "";
    }
});