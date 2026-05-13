import { emailSchema, passwordSchema } from './user.schema';

import { z } from 'zod';

const otpSchema = z
  .string('کد تایید باید یک رشته باشد.')
  .min(5, 'کد تایید باید حداقل ۵ کارکتر باشد.')
  .max(5, 'کد تایید می‌تواند حداکثر ۵ کارکتر باشد.');

const emailDataSchema = z.object({ email: emailSchema });
const otpDataSchema = z.object({ otp: otpSchema });
const passwordDataSchema = z
  .object({ password: passwordSchema, confirmPassword: passwordSchema })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: 'تکرار گذواژه نادرست است.',
      path: ['confirmPassword'],
    },
  );

type EmailData = z.infer<typeof emailDataSchema>;
type OtpData = z.infer<typeof otpDataSchema>;
type PasswordData = z.infer<typeof passwordDataSchema>;

export type { EmailData, OtpData, PasswordData };
export { otpSchema, emailDataSchema, otpDataSchema, passwordDataSchema };
