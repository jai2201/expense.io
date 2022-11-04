import React, { Fragment } from 'react';
import { Modal } from 'react-bootstrap';

import '../static/css/addModal.css';

export default function AddModal({
  addModalShow,
  setAddModalShow,
  title,
  ...props
}) {
  return (
    <Fragment>
      <Modal
        show={addModalShow}
        backdrop="static"
        onHide={() => setAddModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="addModal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="title">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">{props.children}</Modal.Body>
      </Modal>
    </Fragment>
  );
}
