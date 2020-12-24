import { Modal } from 'react-responsive-modal';
import Form from './Forms';

export default function EditModal({ modalOpen, toggleModal, data }) {
  return (
    <>
      <Modal open={modalOpen} onClose={() => toggleModal()}>
        <Form data={data} toggleModal={toggleModal} />
      </Modal>
    </>
  );
}
