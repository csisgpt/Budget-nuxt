import { toTypedSchema } from '@vee-validate/zod';
import { useForm as useVeeForm } from 'vee-validate';
import type { z } from 'zod';

export const useForm = <Schema extends z.ZodTypeAny>(schema: Schema) => {
  const form = useVeeForm({
    validationSchema: toTypedSchema(schema),
    validateOnMount: false,
    initialValues: {} as z.infer<Schema>
  });

  const submit = (handler: (values: z.infer<Schema>) => Promise<void> | void) => {
    return form.handleSubmit(async (values) => {
      await handler(values as z.infer<Schema>);
    });
  };

  return { ...form, submit };
};
