import React from "react"
import Modal from 'react-bootstrap/Modal';
import OrderForm from "./OrderForm";


function OrderModal({ orderModalVisible, toggleOrderModal, token, setOrders }) {
  return (
    <Modal show={orderModalVisible} onHide={toggleOrderModal} size="lg">
      <Modal.Body>
        <OrderForm toggleOrderModal={toggleOrderModal} token={token} setOrders={setOrders} />
      </Modal.Body>
    </Modal>
  );
}

export default OrderModal;
