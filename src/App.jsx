import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import MobileBlocker from "./mobile";


// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Dashboard = lazy(() => import("./pages/dashboard"));
const Ecommerce = lazy(() => import("./pages/dashboard/ecommerce"));
const CrmPage = lazy(() => import("./pages/dashboard/crm"));
const ProjectPage = lazy(() => import("./pages/dashboard/project"));
const BankingPage = lazy(() => import("./pages/dashboard/banking"));
const Upcoming = lazy(() => import("./pages/upcoming"));
const Error = lazy(() => import("./pages/404"));

import Layout from "./layout/Layout";



import Loading from "@/components/Loading";
import { ProductDetails } from "./pages/ecommerce/productDetails";
import { ProfileDetails } from "./pages/ecommerce/profileDetails"
import Cart from "./pages/ecommerce/cart";
import Wishlist from "./pages/ecommerce/wish-list";
import Orders from "./pages/ecommerce/orders";
import OrderDetails from "./pages/ecommerce/orderDetails";
import Checkout from "./pages/ecommerce/checkout";
import EditProduct from "./pages/ecommerce/edit-product";
import Customers from "./pages/ecommerce/customers";
import Sellers from "./pages/ecommerce/sellers";
import AddProduct from "./pages/ecommerce/add-product";
import InvoiceEPage from "./pages/ecommerce/invoice-ecompage";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    // <MobileBlocker>
    <main className="App relative">
      <DynamicBackground>
        <Routes>
    
          <Route path="/" element={<Layout />}>


            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            
            <Route path="overview" element={<ProjectPage />} />
            <Route path="b-analytics" element={<BankingPage />} />
      
            <Route path="bounties" element={<ProjectPostPage />} />
            <Route path="gov1" element={<GovPostPage />} />

            <Route path={"bounties/:id"} element={<ProjectDetailsPage />} />
            <Route path={"gov1/:id"} element={<GovDetailsPage />} />

        
       

            <Route path="all" element={<EcommercePage />} />
            <Route path="all/:id" element={<ProductDetails />} />

            <Route path="bigSpender" element={<EcommercePage />} />
            <Route path="bigSpender/:id" element={<ProductDetails />} />

            <Route path="mediumSpender" element={<EcommercePage />} />
            <Route path="mediumSpender/:id" element={<ProductDetails />} />

            <Route path="smallSpender" element={<EcommercePage />} />
            <Route path="smallSpender/:id" element={<ProductDetails />} />

            <Route path="bigTipper" element={<EcommercePage />} />
            <Route path="bigTipper/:id" element={<ProductDetails />} />

            <Route path="smallTipper" element={<EcommercePage />} />
            <Route path="smallTipper/:id" element={<ProductDetails />} />

            <Route path="root" element={<EcommercePage />} />
            <Route path="root/:id" element={<ProductDetails />} />

            <Route path="root" element={<EcommercePage />} />
            <Route path="root/:id" element={<ProductDetails />} />

            <Route path="referendumCanceller" element={<EcommercePage />} />
            <Route path="referendumCanceller/:id" element={<ProductDetails />} />

            <Route path="referendumKiller" element={<EcommercePage />} />
            <Route path="referendumKiller/:id" element={<ProductDetails />} />

            <Route path="auctionAdmin" element={<EcommercePage />} />
            <Route path="auctionAdmin/:id" element={<ProductDetails />} />

            <Route path="generalAdmin" element={<EcommercePage />} />
            <Route path="generalAdmin/:id" element={<ProductDetails />} />



            <Route path="fellowshipAdmin" element={<EcommercePage />} />
            <Route path="fellowshipAdmin/:id" element={<ProductDetails />} />

            <Route path="leaseAdmin" element={<EcommercePage />} />
            <Route path="leaseAdmin/:id" element={<ProductDetails />} />

            <Route path="stakingAdmin" element={<EcommercePage />} />
            <Route path="stakingAdmin/:id" element={<ProductDetails />} />

            <Route path="whitelistedCaller" element={<EcommercePage />} />
            <Route path="whitelistedCaller/:id" element={<ProductDetails />} />

            <Route path="treasurer" element={<EcommercePage />} />
            <Route path="treasurer/:id" element={<ProductDetails />} />

            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
          <Route
            path="/404"
            element={
              <Suspense fallback={<Loading />}>
                <Error />
              </Suspense>
            }
          />
          <Route
            path="/coming-soon"
            element={
              <Suspense fallback={<Loading />}>
                <ComingSoonPage />
              </Suspense>
            }
          />
          <Route
            path="/under-construction"
            element={
              <Suspense fallback={<Loading />}>
                <UnderConstructionPage />
              </Suspense>
            }
          />
        </Routes>
      </DynamicBackground>
    </main>
    // </MobileBlocker>
  );
}

const DynamicBackground = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    let styleEl = document.getElementById("gov1-scrollbar-styles");

    if (location.pathname.startsWith("/gov1")) {
      document.body.style.background = `
        radial-gradient(circle at 20% 30%, rgba(65,78,96, 0.5), transparent 40%),
        radial-gradient(circle at 70% 80%, rgba(65,78,96, 0.5), transparent 50%),
        radial-gradient(circle at 50% 20%, rgba(65,78,96, 0.5), transparent 30%),
        black
      `;
      document.body.style.backgroundAttachment = "fixed";
      document.body.style.backgroundSize = "cover";

      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = "gov1-scrollbar-styles";
        document.head.appendChild(styleEl);
      }

      // Add scrollbar styling specific for /gov1 pages
      styleEl.innerHTML = `
        * {
    scrollbar-width: thin;
    scrollbar-color: #222F3D rgba(0, 0, 0, 0.3);
    
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 16px;
    border-radius: 10px;
  }

  *::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 40px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #222F3D rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    border: 3px solid #222F3D rgba(0, 0, 0, 0.3);
  }
      `;
    } else {
      // Revert to default styling when leaving /gov1 pages
      document.body.style.background = "";
      document.body.style.backgroundAttachment = "";
      document.body.style.backgroundSize = "";

      if (styleEl) {
        styleEl.innerHTML = "";
      }
    }

    return () => {
 
    };
  }, [location.pathname]);

  return <>{children}</>;
};


export default App;
