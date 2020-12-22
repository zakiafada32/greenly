import useSWR from 'swr';

function fetcher(url) {
  return window.fetch(url).then((res) => res.json());
}

export function useMember() {
  const { data, error } = useSWR(`/api/get-member`, fetcher);

  return {
    member: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useEntry(id, member_id) {
  return useSWR(`/api/get-entry?id=${id}$member_id=${member_id}`, fetcher);
}
