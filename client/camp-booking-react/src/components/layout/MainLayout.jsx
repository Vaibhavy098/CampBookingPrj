import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
// outlet used here is actually a placeholder for the child routes that will be rendered inside this layout.
// It allows us to nest routes and render their components within the MainLayout component, providing a consistent layout structure across different pages of the application.
function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
