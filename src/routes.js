
import Login from "./views/Login";
import Home from "./views/Home";
import Test from "./views/Test";


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
        component: Home,
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
        path: "/test",
        name: "test",
        icon: "announcement",
        component: Test,
        section: '/admin',
        scope: 'private',
    }
];

export default routes;
