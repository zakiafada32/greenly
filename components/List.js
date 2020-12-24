import Card from './Card';

export default function List({ member }) {
  if (member.length > 0) {
    return (
      <div className="list">
        {member.map((data) => (
          <div key={data.id}>
            <Card data={data} />
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
}
