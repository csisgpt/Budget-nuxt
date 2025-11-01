interface ToastOptions {
  id?: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

const toasts = useState<ToastOptions[]>('toasts', () => []);

export const useToasts = () => {
  const add = (toast: ToastOptions) => {
    const entry = {
      duration: 5000,
      type: 'info',
      id: crypto.randomUUID(),
      ...toast
    };
    toasts.value.push(entry);
    if (entry.duration) {
      setTimeout(() => remove(entry.id!), entry.duration);
    }
  };

  const remove = (id: string) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  return {
    toasts: readonly(toasts),
    add,
    remove
  };
};
