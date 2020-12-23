import { useState, useEffect } from 'react';
import { mutate } from 'swr';

export default function Form({ data }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setPhone(data.phone);
      setAddress(data.address);
    }
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (!data) {
        // add member
        const res = await fetch('/api/create-member', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
            address,
          }),
        });
        const json = await res.json();
        if (!res.ok) throw Error(json.message);
      } else {
        // edit member
        console.log('edit');
        const res = await fetch('/api/edit-member', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: data.id,
            member_id: data.member_id,
            name: name,
            phone: phone,
            address: address,
          }),
        });
        const json = await res.json();
        if (!res.ok) throw Error(json.message);
      }

      setSubmitting(false);
      mutate('/api/get-member');
      setName('');
      setPhone('');
      setAddress('');
    } catch (e) {
      throw Error(e.message);
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="name">Phone</label>
        <input
          id="phone"
          type="number"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="name">Address</label>
        <input
          id="address"
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <button disabled={submitting} type="submit">
        {submitting ? 'Adding member ...' : 'Add member'}
      </button>
    </form>
  );
}
