import React from "react";
import { Routes, Route } from "react-router-dom";
import AddBook from "./AddBook";
import UpdateBook from "./UpdateBook";
import DeleteBook from "./DeleteBook";
import Dashboard from "./Dashboard";
import ViewBooks from "./ViewAuthorBooks";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Cookies from 'js-cookie';


const AuthorHandling = () => {
    function checkCookies()
    {
        console.log(Cookies.get('authorId'))
    }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} /> {/* Default route */}
          <Route path="add-book" element={<AddBook />} />
          <Route path="view-books" element={<ViewBooks />} />
          <Route path="update-book" element={<UpdateBook />} />
          <Route path="delete-book" element={<DeleteBook />} />
        </Routes>
       
      </main>
      <button onClick={checkCookies}>Click</button>
      <Footer />
    </div>
  );
};

export default AuthorHandling;
