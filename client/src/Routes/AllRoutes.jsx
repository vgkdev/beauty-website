import { Route, Routes } from "react-router-dom";
import PagenotFound from "../Pages/PagenotFound";
import Home from "../Pages/Home/Home";
import Admin from "../Pages/Admin/Admin";
import Login from "../Components/Login/Login";
import SingUp from "../Components/SignUp/SingUp";
import { Profile } from "../Pages/Admin/Profile";
import { Products } from "../Components/Products/Products";
import Cart from "../Pages/Home/Cart";
import Skin from "../Pages/Home/Skin";
import PaymentPage from "../Pages/Home/PaymentPage";
import Serum from "../Pages/Home/Serum";
import Clean from "../Pages/Home/Clean";
import PersonalCare from "../Pages/Home/PersonalCare";
import ProductDetail from "../Pages/Home/ProductDetail";
import FavoriteList from "../Pages/Home/FavoriteList";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="*" element={<PagenotFound />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SingUp />}></Route>
      <Route path="/admin" element={<Profile />}></Route>
      <Route path="/products" element={<Products />}></Route>
      <Route path="/product/:id" element={<ProductDetail />}></Route>
      <Route path="/test" element={<Admin />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/favorite-list" element={<FavoriteList />}></Route>
      <Route path="/skin" element={<Skin />}></Route>
      <Route path="/serum" element={<Serum />}></Route>
      <Route path="/clean" element={<Clean />}></Route>
      <Route path="/personal-care" element={<PersonalCare />}></Route>
      <Route path="/payment" element={<PaymentPage />}></Route>
    </Routes>
  );
};

export default AllRoutes;
