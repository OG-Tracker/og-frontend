import layout from "./layout";
import todo from "../pages/app/todo/store";
import email from "../pages/app/email/store";
import chat from "../pages/app/chat/store";
// import project from "../pages/app/projects/store";
// import gov1 from "../pages/app/projects/store";
import kanban from "../pages/app/kanban/store";
import auth from "./api/auth/authSlice";
import cart from "./api/shop/cartSlice";
import { appProjectReducer } from "../pages/app/projects/store";
import { appGovReducer } from "../pages/app/projects/store";


const rootReducer = {
  layout,
  todo,
  email,
  chat,
  project: appProjectReducer, 
  gov1: appGovReducer,
  kanban,
  auth,
  cart,
};
export default rootReducer;
