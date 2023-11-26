import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
const EditBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    console.log(id);
    axios.get(`http://localhost:5000/api/v1/book/get/${id}`).then((res) => {
      setAuthor(res.data.author);
      setTitle(res.data.title);

      setPublishYear(res.data.publishYear);
      setLoading(false);
    });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    try {
      axios
        .put(`http://localhost:5000/api/v1/book/update/${id}`, data)
        .then(() => {
          setLoading(false);
          alert("Edited Successfully");
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);
          alert(err);
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-b from-slate-800 to-slate-500">
      <BackButton />
      <h1 className="text-3xl my-4 text-white">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <form
        className="flex flex-col justify-center items-center md:items-start border-2 border-sky-400 rounded-xl w-full md:w-[600px] p-4 mx-auto"
        onSubmit={handleEditBook}
      >
        <div className="my-4 w-full">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full bg-white"
          />
        </div>
        <div className="my-4 w-full">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full bg-white"
          />
        </div>
        <div className="my-4 w-full">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full bg-white"
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-sky-300 m-8 text-white w-full md:w-auto transition-all duration-300 transform hover:scale-105"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditBooks;
