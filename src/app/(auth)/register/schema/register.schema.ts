import { error } from 'console'
import path from 'path'
import * as zod from 'zod'
export const registerSchema = zod.object({
    name: zod.string().nonempty('this field is required').min(2,'min 2 chars').max(10,'max 10 chars'),
    email:zod.string().nonempty('this field is required').email('invalid email'),
    password:zod.string().nonempty('this field is required').regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
        'Must be at least 8 characters with numbers and symbols'  ), 
        rePassword: zod.string().nonempty('this field is required'),
        phone:zod.string().nonempty('this field is required').regex(/^01[0125]\d{8}$/, 'invalid phone number')
}).refine((data)=> data.password===data.rePassword,{
        error:'password and repassword dont match',
        path:['rePassword']

    
})
export type registerSchemaType = zod.infer<typeof registerSchema>