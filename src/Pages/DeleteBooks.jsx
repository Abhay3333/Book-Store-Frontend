import axios from "axios";
import React, { useState } from "react";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/api/v1/book/delete/${id}`)
      .then(() => {
        setLoading(true);
        toast.success("Book deleted successfully !");
        navigate("/");
      })
      .catch(
        (error) => {
          setLoading(false);
          toast.error("Error occured");
          console.log(error);
        },
        [id]
      );
  };

  return (
    <div className="p-4 bg-gradient-to-b from-slate-800 to-slate-500">
      <BackButton />
      <h1 className="text-3xl my-4 text-white">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <form
        className="flex flex-col items-center justify-center md:justify-start border-2 border-sky-400 rounded-xl w-full md:w-[600px] p-8 mx-auto"
        onSubmit={handleDeleteBook}
      >
        <h3 className="text-2xl text-white mb-6 md:mb-8">Are you sure?</h3>
        <button
          type="submit"
          className="p-4 bg-red-600 text-white w-full md:w-auto transition-all duration-300 transform hover:scale-105"
        >
          Yes
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default DeleteBooks;
