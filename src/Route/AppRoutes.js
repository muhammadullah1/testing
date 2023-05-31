// *******************
// ** Admin Routes **
// *******************
import AdminDashboard from "../Pages/Admin/Dashboard/Index";
import Requests from "../Pages/Admin/Requests/Index";
import ViewRequest from "../Pages/Admin/Requests/View";
import RequestDeliver from "../Pages/Admin/Requests/Deliver";
import Purchases from "../Pages/Admin/Purchases/Index";
import PurchasesDetail from "../Pages/Admin/Purchases/View";
import ManageContent from "../Pages/Admin/ManageContent/Index";
import ViewContent from "../Pages/Admin/ManageContent/View";
import ViewAllContent from "../Pages/Admin/ManageContent/ViewAll";
import CreateContent from "../Pages/Admin/ManageContent/Create";
import UpdateArticle from "../Pages/Admin/ManageContent/Edit";
import Template from "../Pages/Admin/Templates";
import Services from "../Pages/Admin/Services/Index";
import CreateService from "../Pages/Admin/Services/Create";
import ViewService from "../Pages/Admin/Services/View";
import EditService from "../Pages/Admin/Services/Edit";
import TemplateDetail from "../Pages/Admin/Templates/Template/Detail";
import Add_EditCategory from "../Pages/Admin/Templates/Category/Add_EditCategory";
import CategoryDetail from "../Pages/Admin/Templates/Category/Detail";
import Add_EditTemplate from "../Pages/Admin/Templates/Template/Add_EditTemplate";

// *******************
// ** Client Routes **
// *******************
import ClientHome from "../Pages/Client/Home/Home";
import ClientLogin from "../Pages/Client/Auth/Login";
import ClientSignup from "../Pages/Client/Auth/Signup";
import Templatesindex from "../Pages/Client/Templates/Templatesindex";
import BuyNow from "../Pages/Client/Templates/BuyNow";
import AddtoCart from "../Pages/Client/Cart/AddtoCart";
import ClientServices from "../Pages/Client/Services/Index";
import CreateBooking from "../Pages/Client/Services/Create";
import Payment from "../Pages/Client/Services/Payment";
import DetailDashbaord from "../Pages/Client/Templates/DetailDashbaord/DetailDashbaord";
import LoginOtp from "../Pages/Client/Auth/Otp";

const PublicRoutes = [
  {
    path: "/",
    element: ClientHome,
  },
  {
    path: "/login",
    element: ClientLogin,
  },
  {
    path: "/login/loginbyphone",
    element: LoginOtp,
  },
  {
    path: "/signup",
    element: ClientSignup,
  },
  {
    path: "/templates",
    element: Templatesindex,
  },
  {
    path: "/templates/buynow",
    element: BuyNow,
  },
  {
    path: "/templates/addtocart",
    element: AddtoCart,
  },
  {
    path: "/templates/details/:id",
    element: DetailDashbaord,
  },
  {
    path: "/services",
    element: ClientServices,
  },
  {
    path: "/services/request/:id",
    element: CreateBooking,
  },
  {
    path: "/services/request/:id/payment",
    element: Payment,
  },
];


const AdminRoutes = [
  {
    path: "/admin/dashboard",
    element: AdminDashboard,
  },
  {
    path: "/admin/requests",
    element: Requests,
  },
  {
    path: "/admin/requests/:id",
    element: ViewRequest,
  },
  {
    path: "/admin/requests/:id/deliver",
    element: RequestDeliver,
  },
  {
    path: "/admin/purchases",
    element: Purchases,
  },
  {
    path: "/admin/purchases/:id",
    element: PurchasesDetail,
  },
  {
    path: "/admin/ManageContent",
    element: ManageContent,
  },
  {
    path: "/admin/ManageContent/view",
    element: ViewContent,
  },
  {
    path: "/admin/ManageContent/viewall",
    element: ViewAllContent,
  },
  {
    path: "/admin/ManageContent/create",
    element: CreateContent,
  },
  {
    path: "/admin/ManageContent/edit",
    element: UpdateArticle,
  },
  {
    path: "/admin/template",
    element: Template,
  },
  {
    path: "/admin/template/detail/:id",
    element: TemplateDetail,
  },
  {
    path: "/admin/services",
    element: Services,
  },
  {
    path: "/admin/services/create",
    element: CreateService,
  },
  {
    path: "/admin/services/:id/view",
    element: ViewService,
  },
  {
    path: "/admin/services/:id/edit",
    element: EditService,
  },
  {
    path: "/admin/template/:id",
    element: TemplateDetail,
  },
  {
    path: "/admin/category/create",
    element: Add_EditCategory,
  },
  {
    path: "/admin/category/detail/:id",
    element: CategoryDetail,
  },
  {
    path: "/admin/template/create",
    element: Add_EditTemplate,
  },
];

export { AdminRoutes, PublicRoutes };
