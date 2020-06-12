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
import Document from "./views/Document";
import Images from "./views/Images";
import Calendar from "./views/Calendar";

const routes = [
  {
    path: "/home",
    name: "home",
    icon: "home",
    component: Home,
    section: "/admin",
    hide: false,
    nestedList: false
  },
  {
    path: "/calendar",
    name: "calendar",
    icon: "event",
    component: Calendar,
    section: "/admin",
    hide: false,
    nestedList: false
  },
  {
    path: "/create-exam",
    name: "create-exam",
    icon: "note_add",
    component: CreateExam,
    section: "/admin",
    hide: true,
    nestedList: false
  },
  {
    path: "/folders/:id",
    name: "folders",
    icon: "folder",
    component: Folder,
    section: "/admin",
    hide: true,
    nestedList: false
  },
  {
    path: "/folders",
    name: "folders",
    icon: "folder",
    component: Folders,
    section: "/admin",
    hide: false,
    nestedList: true
  },
  {
    path: "/edit-exam/:id",
    name: "edit-exam",
    icon: "edit",
    component: CreateExam,
    section: "/admin",
    hide: true,
    nestedList: false
  },
  {
    path: "/clone-exam/:id",
    name: "clone-exam",
    icon: "edit",
    component: CreateExam,
    section: "/admin",
    hide: true,
    nestedList: false
  },
  {
    path: "/login",
    name: "login",
    icon: "lock_open",
    component: Login,
    section: "",
    hide: true,
    nestedList: false

  },
  {
    path: "/register",
    name: "register",
    icon: "lock_open",
    component: Register,
    section: "",
    hide: true,
    nestedList: false

  },
  {
    path: "/quiz/:id",
    name: "quiz",
    icon: "ac_unit",
    component: Quiz,
    section: "",
    hide: true,
    nestedList: false

  },
  {
    path: "/quiz/:id",
    name: "quiz",
    icon: "ac_unit",
    component: Quiz,
    section: "/public",
    hide: true,
    nestedList: false

  },
  {
    path: "/test",
    name: "test",
    icon: "announcement",
    component: Test,
    section: "/root",
    scope: "/private",
    hide: true,
    nestedList: false
  },
  {
    path: "/stats/:id",
    name: "stats",
    icon: "stats",
    component: ExamStats,
    section: "/admin",
    scope: "private",
    hide: true,
    nestedList: false
  },
  {
    path: "/users",
    name: "users",
    icon: "people",
    component: Users,
    section: "/admin",
    scope: "root",
    hide: false,
    nestedList: false
  },
  {
    path: "/document",
    name: "document",
    icon: "insert_drive_file",
    component: Document,
    section: "/admin",
    scope: "root",
    hide: false,
    nestedList: false
  },
  {
    path: "/image",
    name: "image",
    icon: "image",
    component: Images,
    section: "/admin",
    scope: "root",
    hide: false,
    nestedList: false
  },
];

export default routes;
