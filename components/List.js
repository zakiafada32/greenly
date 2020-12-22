import Card from './Card';

export default function List({ member }) {
  if (member.length > 0) {
    return (
      <>
        {member.map((data) => (
          <div key={data.id}>
            <Card data={data} />
          </div>
        ))}
      </>
    );
  } else {
    return null;
  }
}
