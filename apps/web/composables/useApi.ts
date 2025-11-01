export const useApi = () => {
  const { $apiFetch } = useNuxtApp();

  const get = async <T>(url: string, params?: Record<string, any>) => {
    return $apiFetch<T>(url, { query: params });
  };

  const post = async <T>(url: string, body?: any) => {
    return $apiFetch<T>(url, { method: 'POST', body });
  };

  const put = async <T>(url: string, body?: any) => {
    return $apiFetch<T>(url, { method: 'PUT', body });
  };

  const del = async <T>(url: string) => {
    return $apiFetch<T>(url, { method: 'DELETE' });
  };

  return { get, post, put, del };
};
