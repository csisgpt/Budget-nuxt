import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fa';
import 'dayjs/locale/en';

dayjs.extend(relativeTime);

dayjs.locale('fa');

export default defineNuxtPlugin(() => {
  return {
    provide: {
      dayjs
    }
  };
});
