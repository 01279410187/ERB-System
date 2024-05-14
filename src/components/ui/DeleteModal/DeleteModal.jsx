import { useEffect } from "react";
import "./DeleteModal.scss";

const DeleteModal = ({ name, id, onDelete, handleModalVisible }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-content")) {
        handleModalVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleDelete = async () => {
    console.log(id);
    await onDelete(id);
    handleModalVisible(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h2>حذف</h2>
          <p>هل أنت متأكد من حذف {name} ؟</p>
          <div className="modal-buttons">
            <button className="btn-return" onClick={() => handleModalVisible(false)}>رجوع</button>
            <button className="btn-delete" onClick={handleDelete}>حذف</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
