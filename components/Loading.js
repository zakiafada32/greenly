import Skeleton from 'react-loading-skeleton';

export default function Loading() {
  return (
    <div className="loading">
      <Skeleton count={8} height={300} width={350} />
    </div>
  );
}
