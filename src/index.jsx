import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { ChatProviderWrapper } from "./context/chat.context";
import { SearchProviderWrapper } from "./context/search.context";
import { ShoppinCartProviderWrapper } from "./context/shoppingCart.context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <AuthProviderWrapper>
      <ChatProviderWrapper>
       
        <SearchProviderWrapper>
        <ShoppinCartProviderWrapper>
          <App />
          </ShoppinCartProviderWrapper>
        </SearchProviderWrapper>
     
      </ChatProviderWrapper>
    </AuthProviderWrapper>
  </Router>
);
