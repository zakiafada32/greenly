import { useState } from 'react';
import { mutate } from 'swr';

import { formatDate } from '../utils/date-format';

export default function Card({ data }) {
  const [deleting, setDeleting] = useState(false);

  async function deleteMember() {
    setDeleting(true);
    let res = await fetch(
      `/api/delete-member?id=${data.id}&memberId=${data.member_id}`,
      {
        method: 'DELETE',
      }
    );
    let json = await res.json();
    if (!res.ok) throw Error(json.message);
    mutate('/api/get-member');
    setDeleting(false);
  }

  return (
    <>
      <div>name: {data.name}</div>
      <div>phone: {data.phone}</div>
      <div>address: {data.address}</div>
      <div>joined since: {formatDate(data.created_at)}</div>
      <div>last updated:{formatDate(data.updated_at)}</div>
      <button>edit member</button>
      <button onClick={deleteMember}>
        {deleting ? 'Deleting Member...' : 'Delete Member'}
      </button>
    </>
  );
}
