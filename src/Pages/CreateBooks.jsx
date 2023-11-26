import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../Components/BackButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Components/Spinner";
const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = async () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/v1/book/add`, data);
      setLoading(false);
      toast.success("Book created successfully");
      navigate("/");
    } catch (err) {
      setLoading(false);
      toast.error("Error");
      console.log(err);
    }
  };

  return (
    <form className="p-4 bg-gradient-to-b from-slate-800 to-slate-500">
      <BackButton />
      <h1 className="text-3xl my-4 text-slate-100">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col md:flex-col md:justify-center items-center md:items-center border-2 border-sky-400 rounded-xl w-full md:w-[600px] p-4 mx-auto">
        <div className="my-4 w-full md:w-full">
          <label className="text-xl mr-4 text-slate-50">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-800 px-4 py-2 w-full bg-slate-200"
          />
        </div>
        <div className="my-4 w-full md:w-full">
          <label className="text-xl mr-4 text-slate-50">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-800 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4 w-full md:w-full">
          <label className="text-xl mr-4 text-slate-50">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-800 px-4 py-2 w-full"
          />
        </div>
        <button
          className="p-2 bg-orange-700 mt-4 md:mt-8 text-white transition-all duration-300 transform hover:scale-105 w-full md:w-auto"
          onClick={handleSaveBook}
        >
          Save
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default CreateBooks;
