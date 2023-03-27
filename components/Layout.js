import Navbar from "./navbar";
import Footer from "./footer"
import styled, {createGlobalStyle } from "styled-components";
import { useState, createContext } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = createContext();

const Layout = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const changeTheme = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };

  return (
    <App.Provider>
        <ToastContainer />
        <LayoutWrapper>
          <GlobalStyle />
          <Navbar />
          {children}
          <Footer />
        </LayoutWrapper>
    </App.Provider>
  );
}

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
    }
`;

const LayoutWrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  background-image: ${(props) => props.theme.bgImage};
  color: ${(props) => props.theme.color};
`;

export default Layout;
export { App };