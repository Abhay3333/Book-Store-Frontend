import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Spinner from "../Components/Spinner";
import BooksTable from "../Components/home/BooksTable";
import BooksCard from "../Components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/v1/book/get")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4 bg-gradient-to-b from-slate-800 to-slate-500">
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start gap-y-4 md:gap-y-0 md:gap-x-4">
        <button
          className="w-full md:w-auto bg-orange-800 hover:bg-orange-600 px-4 py-2 rounded-lg text-white transition-all duration-300 transform hover:scale-105"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="w-full md:w-auto bg-orange-800 hover:bg-orange-600 px-4 py-2 rounded-lg text-white transition-all duration-300 transform hover:scale-105"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center mt-4 md:mt-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-white">
          Books List
        </h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-slate-50 text-3xl md:text-4xl lg:text-5xl transition-all duration-300 transform hover:scale-105" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
