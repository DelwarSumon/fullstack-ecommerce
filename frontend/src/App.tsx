import "./styles/style.scss";

import {CssBaseline, SpeedDial} from "@mui/material";
import React, {useMemo, useState} from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Tooltip, createTheme } from "@mui/material";

import Cart from "./pages/Cart";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Home from "./pages/Home";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotFound from "./pages/NotFound";
import Product from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { ProtectedRouteAdmin } from "./routes/ProtectedRouteAdmin";
import Root from "./pages/Root";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import { ThemeProvider } from "@mui/material/styles";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "login",
          element: <Signin />,
        },
        {
          path: "register",
          element: <Signup />,
        },
        {
          path: "profile",
          element: <ProtectedRoute><Profile /></ProtectedRoute>,
        },
        {
          path: "products",
          children: [
            {
              path: "",
              element: <Products />,
            },
            {
              path: ":id",
              element: <Product />,
            },
            {
              path: "list",
              element: (
                <ProtectedRouteAdmin>
                  <ProductList />
                </ProtectedRouteAdmin>
              ),
            },
          ],
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Tooltip
          title={`Change theme to ${mode === "dark" ? "light" : "dark"}`}
          placement="left"
        >
          <SpeedDial
            ariaLabel="Change Theme"
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            icon={mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
            onClick={colorMode.toggleColorMode}
          ></SpeedDial>
        </Tooltip>

        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
