import { createPortal } from "react-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";
function Modal({
  message = "",
  cloeModalLabel = "",
  closeModal,
  confirmedActionLabel = "",
  confirmedAction = null,
  buttonConfirmedColor = "primary",
  children
}) {
  return createPortal(
    <>
      <div className="modal-outer"></div>
      <div className="modal rounded-md">
        <div className="modal-header relative text-right">
          <XCircleIcon
            className="inline-block w-6 cursor-pointer rounded-full bg-white align-middle text-gray-500 shadow-xl hover:text-primary-500"
            onClick={closeModal}
          />
        </div>
        <div className="modal-body">
          {message && <p className="modal-message">{message}</p>}
          {children && children}
        </div>
        <div className="modal-footer">
          <div className="modal-actions">
            {confirmedAction && (
              <button
                className={`btn btn-${buttonConfirmedColor} btn-wide`}
                onClick={confirmedAction}>
                {confirmedActionLabel && confirmedActionLabel}
              </button>
            )}
            {cloeModalLabel && (
              <button
                className="btn btn-secondary btn-wide"
                onClick={closeModal}>
                {cloeModalLabel && cloeModalLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("outer")
  );
}

export default Modal;
