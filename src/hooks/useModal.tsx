import { useState, ReactNode, useEffect } from "react";

export default function useModal({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const modalElement = document.getElementById(id) as HTMLFormElement | null;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [id, isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
    (document.getElementById(id) as HTMLFormElement)?.showModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    (document.getElementById(id) as HTMLFormElement)?.close();
  };

  const Modal = ({ children }: { children: ReactNode }) => {
    return (
      isModalOpen && (
        <dialog id={id} className="modal">
          <div className="modal-box">{children}</div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      )
    );
  };

  return {
    Modal,
    openModal,
    closeModal,
  };
}
