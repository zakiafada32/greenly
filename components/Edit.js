import Modal from 'react-modal';
import Form from './Form';
import { formatDate } from '../utils/date-format';

Modal.setAppElement('#__next');

export default function EditModal({ modalOpen, toggleModal, data }) {
  return (
    <>
      <Modal
        isOpen={modalOpen}
        contentLabel="Edit modal"
        onRequestClose={toggleModal}
      >
        <Form data={data}>Edit Member</Form>
        <div>name: {data.name}</div>
        <div>phone: {data.phone}</div>
        <div>address: {data.address}</div>
        <div>joined since: {formatDate(data.created_at)}</div>
        <div>last updated:{formatDate(data.updated_at)}</div>
        <button onClick={() => toggleModal()}>CLose modal</button>
      </Modal>
    </>
  );
}
