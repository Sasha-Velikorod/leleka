"use client";

import { useState } from "react";
import styles from "./page.module.css";
import AddTaskModal from "@/components/AddTaskModal/AddTaskmodal";
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={styles.page}>
      <button onClick={() => setModalIsOpen(true)}>Create note +</button>
      {modalIsOpen && (
        <AddTaskModal onClose={handleCloseModal}>
          <AddTaskForm onCloseModal={handleCloseModal} />
        </AddTaskModal>
      )}
    </div>
  );
}
