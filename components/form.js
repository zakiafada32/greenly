import { useState } from 'react';
import { mutate } from 'swr';

export default function EntryForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submitHandler(e) {
    setSubmitting(true);
    e.preventDefault();
    try {
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

      setSubmitting(false);
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
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
