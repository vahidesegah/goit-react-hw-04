import { useState, useRef, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import Loader from "./components/Loader/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import { fetchPicturesWithQuery } from "./image-api.js";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import css from "./App.module.css";

export default function App() {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const lastPictureRef = useRef(null);
  const searchBarRef = useRef(null);

  useEffect(() => {
    if (!loading && lastPictureRef.current) {
      lastPictureRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pictures, loading]);

  const handleSearch = async (newQuery) => {
    try {
      setPictures([]);
      setError("");
      setLoading(true);
      setQuery(newQuery);
      setPage(1);
      const data = await fetchPicturesWithQuery(newQuery, 1);
      if (data.results.length !== 0) {
        setPictures(data.results);
        setTotalPages(data.total_pages);
      } else {
        throw new Error("noimage");
      }
    } catch (e) {
      console.log(e);
      e.message === "noimage" ? setError("noimage") : setError("wrong");
    } finally {
      setLoading(false);
    }
  };

  const loadMorePictures = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const data = await fetchPicturesWithQuery(query, nextPage);
      setPictures((prevPictures) => [...prevPictures, ...data.results]);
      setPage(nextPage);
    } catch (e) {
      setError("wrong");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (imageData) => {
    setSelectedImage(imageData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const scrollToTop = () => {
    if (searchBarRef.current) {
      searchBarRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const shouldShowLoadMore =
    pictures.length > 0 && page < totalPages && !loading;

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} ref={searchBarRef} />
      {pictures.length > 0 && (
        <ImageGallery
          items={pictures}
          onImageClick={openModal}
          lastPictureRef={lastPictureRef}
        />
      )}
      {shouldShowLoadMore && <LoadMoreBtn onClick={loadMorePictures} />}
      {loading && <Loader />}
      {error !== "" ? <ErrorMessage error={error} /> : null}
      <button onClick={scrollToTop} className={css.scrollBtn}>
        <IoArrowUpCircleSharp className={css.reactIcons} />
      </button>
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        imageData={selectedImage}
      />
    </div>
  );
}
