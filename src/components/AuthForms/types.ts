import { z } from "zod";
import { LogInSchema, SignUpSchema } from "./validation";


export type ModalType = 'LOGIN' | 'SIGNUP' | null;

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export type LogInSchemaType = z.infer<typeof LogInSchema>;
