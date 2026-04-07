const users = [
    {
        id: 1,
        name: "An Nguyễn",
        email: "an@gmail.com",
        password: "123123123",
    },
    {
        id: 2,
        name: "Bình Trần",
        email: "binh@gmail.com",
        password: "123123123",
    },
    {
        id: 3,
        name: "Chi Lê",
        email: "chi@gmail.com",
        password: "123123123",
    },
    {
        id: 4,
        name: "Dũng Phạm",
        email: "dung@gmail.com",
        password: "123123123",
    },
    {
        id: 5,
        name: "Hoa Hoàng",
        email: "hoa@gmail.com",
        password: "123123123",
    },
    {
        id: 6,
        name: "Nam Vũ",
        email: "nam@gmail.com",
        password: "123123123",
    }
];

const tasks = [
    {
        id: 1,
        taskName: "Soạn thảo đề cương dự án",
        assigneeId: 1,
        projectId: 1,
        assignDate: "2025-03-24",
        dueDate: "2025-03-26",
        priority: "Thấp",
        progress: "Đúng tiến độ",
        status: "To do",
    },
    {
        id: 2,
        taskName: "Không biết nên là nhiệm vụ gì",
        assigneeId: 2,
        projectId: 1,
        assignDate: "2025-03-24",
        dueDate: "2025-04-26",
        priority: "Thấp",
        progress: "Đúng tiến độ",
        status: "To do",
    },
    {
        id: 3,
        taskName: "Nhiệm vụ sikibidi",
        assigneeId: 2,
        projectId: 3,
        assignDate: "2025-03-24",
        dueDate: "2025-03-28",
        priority: "cao",
        progress: "Trễ hạn",
        status: "To do",
    },
    {
        id: 4,
        taskName: "Thiết kế Database ERD",
        assigneeId: 1,
        projectId: 1,
        assignDate: "2025-03-25",
        dueDate: "2025-03-30",
        priority: "Cao",
        progress: "Đúng tiến độ",
        status: "In Progress",
    },
    {
        id: 5,
        taskName: "Viết API Authentication",
        assigneeId: 2,
        projectId: 1,
        assignDate: "2025-03-26",
        dueDate: "2025-04-05",
        priority: "Trung bình",
        progress: "Đúng tiến độ",
        status: "To do",
    },
    {
        id: 6,
        taskName: "Fix bug hiển thị giỏ hàng",
        assigneeId: 2,
        projectId: 1,
        assignDate: "2025-03-27",
        dueDate: "2025-03-27",
        priority: "Cao",
        progress: "Đúng tiến độ",
        status: "Done",
    },
    {
        id: 7,
        taskName: "Họp triển khai giai đoạn 2",
        assigneeId: 1,
        projectId: 2,
        assignDate: "2025-03-28",
        dueDate: "2025-03-28",
        priority: "Trung bình",
        progress: "Đúng tiến độ",
        status: "Done",
    },
    {
        id: 8,
        taskName: "Tối ưu hóa tốc độ load trang",
        assigneeId: 4,
        projectId: 3,
        assignDate: "2025-03-29",
        dueDate: "2025-04-10",
        priority: "Thấp",
        progress: "Chậm tiến độ",
        status: "In Progress",
    },
    {
        id: 9,
        taskName: "Viết tài liệu hướng dẫn sử dụng",
        assigneeId: 3,
        projectId: 2,
        assignDate: "2025-04-01",
        dueDate: "2025-04-15",
        priority: "Thấp",
        progress: "Đúng tiến độ",
        status: "To do",
    },
    {
        id: 10,
        taskName: "Deploy hệ thống lên Server",
        assigneeId: 1,
        projectId: 1,
        assignDate: "2025-04-20",
        dueDate: "2025-04-22",
        priority: "Cao",
        progress: "Đúng tiến độ",
        status: "To do",
    },
    {
        id: 11,
        taskName: "Thiết kế UI trang đăng nhập",
        assigneeId: 1,
        projectId: 2,
        assignDate: "2025-04-02",
        dueDate: "2025-04-05",
        priority: "Trung bình",
        progress: "Đúng tiến độ",
        status: "To do",
    },
    {
        id: 12,
        taskName: "Code chức năng chat trong game",
        assigneeId: 2,
        projectId: 2,
        assignDate: "2025-04-02",
        dueDate: "2025-04-08",
        priority: "Cao",
        progress: "Có rủi ro",
        status: "In Progress",
    },
    {
        id: 13,
        taskName: "Fix bug login fail 50% người dùng",
        assigneeId: 1,
        projectId: 3,
        assignDate: "2025-04-03",
        dueDate: "2025-04-06",
        priority: "Cao",
        progress: "Trễ hạn",
        status: "Pending",
    },
    {
        id: 14,
        taskName: "Refactor code cho đỡ xấu hổ",
        assigneeId: 2,
        projectId: 3,
        assignDate: "2025-04-03",
        dueDate: "2025-04-10",
        priority: "Trung bình",
        progress: "Đúng tiến độ",
        status: "In Progress",
    },
    {
        id: 15,
        taskName: "Tối ưu animation đỡ lag",
        assigneeId: 1,
        projectId: 4,
        assignDate: "2025-04-04",
        dueDate: "2025-04-09",
        priority: "Thấp",
        progress: "Chậm tiến độ",
        status: "In Progress",
    },
    {
        id: 16,
        taskName: "Fix CSS lệch 2px (nỗi đau đời dev)",
        assigneeId: 1,
        projectId: 4,
        assignDate: "2025-04-04",
        dueDate: "2025-04-04",
        priority: "Khẩn cấp",
        progress: "Đúng tiến độ",
        status: "Done",
    },
    {
        id: 17,
        taskName: "Clone giao diện Facebook",
        assigneeId: 2,
        projectId: 5,
        assignDate: "2025-04-04",
        dueDate: "2025-04-18",
        priority: "Cao",
        progress: "Có rủi ro",
        status: "In Progress",
    },
    {
        id: 18,
        taskName: "Viết backend (chưa biết viết)",
        assigneeId: 1,
        projectId: 5,
        assignDate: "2025-04-04",
        dueDate: "2025-04-25",
        priority: "Cao",
        progress: "Trễ hạn",
        status: "To do",
    },
    {
        id: 19,
        taskName: "Thêm hiệu ứng mèo kêu meow 🐱",
        assigneeId: 2,
        projectId: 6,
        assignDate: "2025-04-04",
        dueDate: "2025-04-06",
        priority: "Thấp",
        progress: "Đúng tiến độ",
        status: "Done",
    },
    {
        id: 20,
        taskName: "Debug lý do không ai dùng app",
        assigneeId: 1,
        projectId: 7,
        assignDate: "2025-04-04",
        dueDate: "2025-04-10",
        priority: "Trung bình",
        progress: "Có rủi ro",
        status: "Pending",
    }

];
const projectData = [
    {
        id: 1,
        projectName: "Xây dựng website thương mại điện tử",
        projectDecription: "Dự án nhằm phát triển một nền tảng thương mại điện tử với các tính năng nhưu giỏ hàng, thanh toán và quản lý sản phẩm",
        members: [
            {
                userId: 1,
                role: "Project owner",
            },
            {
                userId: 2,
                role: "Fontend developer",
            }
        ],
    },

    {
        id: 2,
        projectName: "Xây dựng Game Tai Ương",
        projectDecription: "Dự án nhằm phát triển một con game gọi là oách",
        members: [
            {
                userId: 1,
                role: "Project owner",
            },
            {
                userId: 2,
                role: "Fontend developer",
            }
        ],
    },
    {
        id: 3,
        projectName: "Fix bug nhưng bug fix lại mình",
        projectDecription: "Dự án nhằm sửa 1 bug nhỏ nhưng sau 3 ngày tạo thêm 17 bug mới và mất niềm tin vào cuộc sống",
        members: [
            { userId: 1, role: "Project owner" },
            { userId: 2, role: "Debugger bất lực" }
        ],
    },
    {
        id: 4,
        projectName: "App đếm số lần hít thở khi stress",
        projectDecription: "Người dùng mở app lên và nhận ra mình stress hơn vì app lag",
        members: [
            { userId: 1, role: "Frontend developer nhưng CSS lệch 2px" },
            { userId: 2, role: "Project owner" }
        ],
    },
    {
        id: 5,
        projectName: "Clone Facebook trong 2 tuần (vì sao không?)",
        projectDecription: "Bắt đầu với HTML, kết thúc bằng existential crisis",
        members: [
            { userId: 1, role: "Intern nhưng gánh team" },
            { userId: 2, role: "Project owner" }
        ],
    },
    {
        id: 6,
        projectName: "Website bán mèo ảo nhưng cảm xúc thật",
        projectDecription: "Người dùng không mua gì nhưng gắn bó vì mèo dễ thương",
        members: [
            { userId: 1, role: "Project owner" },
            { userId: 2, role: "Cat specialist 🐱" }
        ],
    },
    {
        id: 7,
        projectName: "Hệ thống quản lý task nhưng không ai dùng",
        projectDecription: "Tạo ra để quản lý công việc, nhưng team vẫn nhắn Messenger",
        members: [
            { userId: 1, role: "Người tạo task nhưng không làm task" },
            { userId: 2, role: "Project owner" }
        ],
    }
];

if (!localStorage.getItem("Projects")) {
    localStorage.setItem("Projects", JSON.stringify(projectData));
}
if (!localStorage.getItem("Users")) {
    localStorage.setItem("Users", JSON.stringify(users));
}
if (!localStorage.getItem("Tasks")) {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
}