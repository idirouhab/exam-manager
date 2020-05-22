import Login from "./views/Login";
import Home from "./views/Home";
import Test from "./views/Test";
import CreateExam from "./views/CreateExam";
import Quiz from "./views/Quiz";
import ExamStats from "./views/ExamStats";
import Register from "./views/Register";
import Folders from "./views/Folders";
import Folder from "./views/Folder";
import Users from "./views/Users";

const routes = [
    {
        path: "/home",
        name: "home",
        icon: "home",
        component: Home,
        section: '/admin',
        scope: 'private',
        hide: false,
    },
    {
        path: "/create-exam",
        name: "create-exam",
        icon: "note_add",
        component: CreateExam,
        section: '/admin',
        scope: 'private',
        hide: false,

    },
    {
        path: "/folders/:id",
        name: "folders",
        icon: "folder",
        component: Folder,
        section: '/admin',
        scope: 'private',
        hide: true,
    },
    {
        path: "/folders",
        name: "folders",
        icon: "folder",
        component: Folders,
        section: '/admin',
        scope: 'private',
        hide: false,
    },

    {
        path: "/edit-exam/:id",
        name: "edit-exam",
        icon: "edit",
        component: CreateExam,
        section: '/admin',
        scope: 'private',
        hide: true,
    },
    {
        path: "/clone-exam/:id",
        name: "clone-exam",
        icon: "edit",
        component: CreateExam,
        section: '/admin',
        scope: 'private',
        hide: true,
    },
    {
        path: "/login",
        name: "login",
        icon: "lock_open",
        component: Login,
        section: '/public',
        scope: 'public',
        hide: true,

    },
    {
        path: "/register",
        name: "register",
        icon: "lock_open",
        component: Register,
        section: '/public',
        scope: 'public',
        hide: true,

    },
    {
        path: "/quiz/:id",
        name: "quiz",
        icon: "ac_unit",
        component: Quiz,
        section: "/public",
        scope: 'public',
        hide: true,

    },
    {
        path: "/test",
        name: "test",
        icon: "announcement",
        component: Test,
        section: '/public',
        scope: 'public',
        hide: true,

    },
    {
        path: "/stats/:id",
        name: "stats",
        icon: "stats",
        component: ExamStats,
        section: '/admin',
        scope: 'private',
        hide: true,
    },
    {
        path: "/users",
        name: "users",
        icon: "stats",
        component: Users,
        section: '/root',
        scope: 'private',
        hide: true,
    },

];

export default routes;
