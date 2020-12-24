import { useState } from 'react';
import { mutate } from 'swr';

import Edit from './Edit';
import Button from './Button';

import { formatDate } from '../utils/date-format';

export default function Card({ data }) {
  const [deleting, setDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  async function deleteMember() {
    setDeleting(true);
    let res = await fetch(
      `/api/delete-member?id=${data.id}&member_id=${data.member_id}`,
      {
        method: 'DELETE',
      }
    );
    let json = await res.json();
    if (!res.ok) throw Error(json.message);
    mutate('/api/get-member');
    setDeleting(false);
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="cell">
      <Edit modalOpen={modalOpen} toggleModal={toggleModal} data={data} />
      <div className="card-container card">
        <div className="card-green"></div>
        <div className="card-dots"></div>
        <div className="card-name">{data.name}</div>
        <div className="card-personal-info">
          <p>
            <span>Phone</span>: {data.phone}
          </p>
          <p>
            <span>Address</span>: {data.address}
          </p>
          <p>
            <span>Joined Since</span>: {formatDate(data.created_at)}
          </p>
          <p>
            <span>Last Updated</span>: {formatDate(data.updated_at)}
          </p>
          <div className="button-container">
            <Button onClick={toggleModal} purpose="edit">
              Edit
            </Button>
            <Button onClick={deleteMember} purpose="delete">
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
