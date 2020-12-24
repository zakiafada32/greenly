import { useState, useEffect } from 'react';
import { mutate } from 'swr';

export default function Form({ data, toggleModal }) {
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
        toggleModal();
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
    <form onSubmit={submitHandler} className="form">
      <h1>{!data ? "Let's Join" : 'Edit Member Data'}</h1>
      <div className={data ? 'form-div' : ''}>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          className="form-input"
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={data ? 'form-div' : ''}>
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          className="form-input"
          id="phone"
          type="tel"
          pattern="\d*"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className={data ? 'form-div' : ''}>
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          className="form-input"
          id="address"
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <button
        className={`button ${data ? 'edit' : 'add'}`}
        disabled={submitting}
        type="submit"
        style={
          data ? { fontSize: '20px', width: '150px', marginTop: '20px' } : {}
        }
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
