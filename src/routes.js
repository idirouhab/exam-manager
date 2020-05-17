import Login from "./views/Login";
import Home from "./views/Home";
import Test from "./views/Test";
import CreateExam from "./views/CreateExam";
import Quiz from "./views/Quiz";
import ExamStats from "./views/ExamStats";
import Register from "./views/Register";


const routes = [
    {
        path: "/home",
        name: "home",
        icon: "home",
        component: Home,
        section: '/admin',
        scope: 'private',
    },
    {
        path: "/create-exam",
        name: "create_exam",
        icon: "note_add",
        component: CreateExam,
        section: '/admin',
        scope: 'private',
    },
    {
        path: "/login",
        name: "login",
        icon: "lock_open",
        component: Login,
        section: '/public',
        scope: 'public',
    },
    {
        path: "/register",
        name: "register",
        icon: "lock_open",
        component: Register,
        section: '/public',
        scope: 'public',
    },
    {
        path: "/quiz/:id",
        name: "quiz",
        icon: "ac_unit",
        component: Quiz,
        section: "/public",
        scope: 'public'
    },
    {
        path: "/test",
        name: "test",
        icon: "announcement",
        component: Test,
        section: '/admin',
        scope: 'private',
    },
    {
        path: "/stats/:id",
        name: "stats",
        icon: "stats",
        component: ExamStats,
        section: '/admin',
        scope: 'private',
    },

];

export default routes;
