import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import useModal from "../../../hooks/useModal";
import SearchForm from "./SearchForm";

function SearchBox() {
  const [searchKey, setSearchKey] = useState("");
  const { isModalShow, Modal, handleCloseModal, handleOpenModal } = useModal();
  const searchInputRef = useRef();
  const searchFormRef = useRef();
  const location = useLocation();

  useEffect(() => {
    setSearchKey("");
    searchFormRef?.current?.reset();
    handleCloseModal();
  }, [location]);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    searchInputRef.current.value && setSearchKey(searchInputRef.current.value);
  }, []);

  const handleCloseSearch = useCallback(() => {
    setSearchKey("");
    searchFormRef?.current?.reset();
    handleCloseModal();
  }, []);

  const handleClearSearch = useCallback(() => {
    searchFormRef.current.reset();
    if (searchKey) {
      setSearchKey("");
    }
  }, []);

  const renderSearchForm = () => {
    return (
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleClearSearch={handleClearSearch}
        searchKey={searchKey}
        ref={{
          searchFormRef,
          searchInputRef
        }}
      />
    );
  };

  return (
    <>
      <div onClick={handleOpenModal} className="field-group relative">
        <div className="hidden md:block">
          <label htmlFor="search" className="field-label hidden">
            Search
          </label>
          <div className="control">
            <input
              autoComplete="off"
              className="h-7 w-full pl-3 pr-8 text-sm text-gray-600"
              type="search"
              name="search"
              placeholder="Search products..."
            />
          </div>
        </div>
        <button
          className="md:absolute md:top-[5px] md:right-[6px]"
          type="button">
          <MagnifyingGlassIcon className="ml-auto mt-2  w-6 cursor-pointer stroke-none  md:mt-0 md:w-5 md:text-primary-900" />
        </button>
      </div>

      {isModalShow && (
        <Modal
          cloeModalLabel="Close"
          confirmedActionLabel="Search"
          confirmedAction={handleSearchSubmit}
          closeModal={handleCloseSearch}>
          {renderSearchForm()}
        </Modal>
      )}
    </>
  );
}

export default SearchBox;
