import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { labels, toastMessages } from '../containers/ConstantManager';

function ConfirmModal({show, header=toastMessages.ARE_YOU_SURE_MSG, body=toastMessages.CANNOT_UNDO_MSG, theme='danger', onClose, onSubmit}) {
  const props = {show, onClose, onSubmit}
  const headerTheme = {
    "danger": {
      backgroundColor: 'var(--danger)'
    },
    "default": {
      backgroundColor: 'var(--white)'
    }
  }

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton={false} style={headerTheme[theme || 'default']}>
        <Modal.Title style={{color: (theme !== 'default') ? 'white' : 'black' }} id="contained-modal-title-vcenter">
          {header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
        {body}
        </p>
      </Modal.Body>
      <Modal.Footer>
      <button className="btn btn-secondary mb-4" type="button" onClick={onClose}>{toastMessages.CONFIRM_DIALOG_BUTTON_NO}</button>
      <button className={`btn btn-${theme} mb-4`} type="button" onClick={onSubmit}>{toastMessages.CONFIRM_DIALOG_BUTTON_YES}</button>      
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal