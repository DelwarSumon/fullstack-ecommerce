import Container from "@mui/material/Container";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <div>
      <div>
        <Toaster />
      </div>
      <Header />
      <Container
        maxWidth="xl"
        sx={{ pt: 1, pb: 6, mt: 9, minHeight: "calc(100vh - 275px)" }}
      >
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};
export default Root;
