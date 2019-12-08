import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ModalComponent(props) {
  return (
    <Modal
      isOpen={props.open}
      onRequestClose={props.closeModal}
      shouldCloseOnOverlayClick={true}
      className="Modal"
      overlayClassName="Overlay"
    >
      {props.children}
    </Modal>
  );
}
