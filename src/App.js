import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import SideBar from "./components/Sidebar/index.js";
import VideoModal from "./components/VideoModal/index.js";
import ScrollToTop from "./components/ScrollToTop/index.js";
import { Loader } from "./components/Loader/index.js";

const Catalog = lazy(() => import("./pages/Catalog/index.js"));
const Home = lazy(() => import("./pages/Home/index.js"));
const Detail = lazy(() => import("./pages/Detail/index.js"));
const NotFound = lazy(() => import("./pages/NotFound/index.js"));

const App = () => {
  return (
    <>
      <VideoModal />
      <SideBar />
      <Header />
      <main className="lg:pb-14 md:pb-4 sm:pb-2 xs:pb-1 pb-0">
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog/:category" element={<Catalog />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/:category/:id" element={<Detail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ScrollToTop>
      </main>
      <Footer />
    </>
  );
};

export default App;
