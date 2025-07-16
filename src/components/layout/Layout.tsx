import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ChatbotWidget from "../chatbot/ChatbotWidget";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-800">
      <Header />
      <main className="flex-grow container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Layout;
