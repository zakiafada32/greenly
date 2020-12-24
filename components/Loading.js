import Skeleton from 'react-loading-skeleton';

export default function Loading() {
  return (
    <div className="loading">
      <Skeleton count={9} height={300} width={'33%'} />
    </div>
  );
}
