import { z } from 'zod';

const USERNAME_REGEX = /^[a-z][a-z0-9_]{3,25}$/;

const usernameSchema = z
  .string('نام کاربری الزامی است.')
  .trim()
  .toLowerCase()
  .regex(
    USERNAME_REGEX,
    'نام کاربری باید با حرف انگلیسی شروع شود و شامل حروف، اعداد و زیرخط (_) باشد.',
  );

const emailSchema = z.email('ایمیل وارد شده معتبر نیست.').toLowerCase();

const passwordSchema = z
  .string('گذرواژه الزامی است.')
  .min(8, 'گذرواژه باید حداقل ۸ کاراکتر باشد.')
  .max(32, 'گذرواژه نمی‌تواند بیشتر از ۳۲ کاراکتر باشد.');

const userSchema = z.object({
  first_name: z
    .string('نام الزامی است.')
    .min(2, 'نام باید حداقل ۲ کاراکتر باشد.')
    .max(30, 'نام نمی‌تواند بیشتر از ۳۰ کاراکتر باشد.'),
  last_name: z
    .string('نام خانوادگی الزامی است.')
    .min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد.')
    .max(30, 'نام خانوادگی نمی‌تواند بیشتر از ۳۰ کاراکتر باشد.'),
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
  birthday: z.iso.date('تاریخ تولد باید یک تاریخ معتبر باشد.'),
  avatar: z.file().nullable(),
});

type UserData = z.infer<typeof userSchema>;

export type { UserData };
export { usernameSchema, emailSchema, passwordSchema };
export default userSchema;
