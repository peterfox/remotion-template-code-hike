import {z} from 'zod';
import {themeSchema} from './theme';

export const schema = z.object({
	theme: themeSchema,
	codeWidth: z.number().positive().nullable()
});
