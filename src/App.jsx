import { useEffect, lazy } from "react";
import { useDispatch } from "react-redux";
import { SkeletonTheme } from "react-loading-skeleton";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { storeCredentials } from "./store/authSlice";
import { addToLocalStorage, calculateCartTotals } from "./store/cart";
import { getCartItemsFromLocalStorage as getCartItemsFromLocalStorage } from "./services/cartService";
import { getTokenLocalStorage } from "./services/authService";
import { useGetMyUserDataQuery } from "./store/users";
import SharedLayout from "./scenes/global/SharedLayout";
import About from "./scenes/About/About";
import Contact from "./scenes/Contact/Contact";
import Checkout from "./scenes/Checkout";
import Registration from "./scenes/Registration/Registration";
import Login from "./scenes/Login/Login";
import RequiredAuth from "./scenes/global/RequiredAuth";
import AuthNoAccess from "./scenes/global/AuthNoAccess";
import Logout from "./components/common/Logout";
const Index = lazy(() => import("./scenes/home/Index"));
const Products = lazy(() => import("./scenes/products/Products"));
const ProductDetails = lazy(() => import("./scenes/ProductDetails"));
const Profile = lazy(() => import("./scenes/Profile/Profile"));
const BlogHome = lazy(() => import("./blog/BlogHome"));
const Confirmation = lazy(() => import("./scenes/Confirmation/Confirmation"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));

function App() {
  const dispatch = useDispatch();
  const accessToken = getTokenLocalStorage();
  const { data, isLoading } = useGetMyUserDataQuery(undefined, {
    skip: !Boolean(accessToken)
  });

  useEffect(() => {
    data &&
      dispatch(
        storeCredentials({
          user: data,
          jwt: accessToken
        })
      );
  }, [data, accessToken]);

  useEffect(() => {
    const cartItems = getCartItemsFromLocalStorage();
    if (cartItems) {
      dispatch(addToLocalStorage(cartItems));
      dispatch(calculateCartTotals());
    }
  }, []);

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, [location.pathname]);

  return (
    <div className="App font-body">
      <SkeletonTheme baseColor="#c6cde7" highlightColor="#7681a9">
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="/" exact element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/product-list" element={<Products />} />
            <Route
              path="/product-list/category/:catId?"
              element={<Products />}
            />
            <Route
              exact
              path="/product-list/:productId"
              element={<ProductDetails />}
            />
            <Route path="/checkout/success" element={<Confirmation />} />
            <Route path="/blog" element={<BlogHome />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/"
              element={<RequiredAuth data={data} isLoading={isLoading} />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
            <Route
              path="/"
              element={<AuthNoAccess data={data} isLoading={isLoading} />}>
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </SkeletonTheme>
      <ToastContainer />
    </div>
  );
}

export default App;
