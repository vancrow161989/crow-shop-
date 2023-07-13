import { useState } from "react";
import Modal from "../components/common/Modal";
import {
  setStickytoBodyAndHTML,
  removeStickytoBodyAndHTML
} from "../utils/sticky";

function useModal() {
  const [isModalShow, setIsModalShow] = useState(false);

  const handleOpenModal = () => {
    setIsModalShow(true);
    setStickytoBodyAndHTML();
  };

  const handleCloseModal = () => {
    setIsModalShow(false);
    removeStickytoBodyAndHTML();
  };

  return { isModalShow, Modal, handleCloseModal, handleOpenModal };
}

export default useModal;
