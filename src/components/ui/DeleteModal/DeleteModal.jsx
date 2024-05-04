import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DeleteModal.scss";

const DeleteModal = ({ name, id, onDelete, mainRoute }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-content")) {
        navigate(-1);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [navigate]);

  const handleDelete = () => {
    onDelete(id);
    navigate(-1);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h2>حذف</h2>
          <p>هل أنت متأكد من حذف {name} ؟</p>
          <div className="modal-buttons">
            <button onClick={handleDelete}>حذف</button>
            <button onClick={() => navigate(-1)}>رجوع</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
