export interface PaginationOptions {
  page?: number;
  pageSize?: number;
  total?: number;
}

export const usePagination = (initial: PaginationOptions = {}) => {
  const page = useState('page', () => initial.page ?? 1);
  const pageSize = useState('pageSize', () => initial.pageSize ?? 10);
  const total = useState('total', () => initial.total ?? 0);

  const pageCount = computed(() => Math.ceil(total.value / pageSize.value) || 1);

  const setPage = (value: number) => {
    page.value = Math.max(1, Math.min(value, pageCount.value));
  };

  const setTotal = (value: number) => {
    total.value = value;
  };

  return {
    page,
    pageSize,
    total,
    pageCount,
    setPage,
    setTotal
  };
};
