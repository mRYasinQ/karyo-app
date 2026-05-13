import { z } from 'zod';

const emailSchema = z.email('ایمیل معتبر نمی‌باشد.').toLowerCase();

const passwordSchema = z
  .string('گذرواژه باید رشته باشد.')
  .min(8, 'گذرواژه باید حداقل ۸ کارکتر باشد.')
  .max(32, 'گذرواژه می‌تواند حداکثر ۳۲ کاراکتر باشد.');

const userSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type UserData = z.infer<typeof userSchema>;

export type { UserData };
export { emailSchema, passwordSchema };
export default userSchema;
