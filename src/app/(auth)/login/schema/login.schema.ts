
import * as zod from 'zod'
export const loginSchema = zod.object({
 
    email:zod.string().nonempty('this field is required').email('invalid email'),
    password:zod.string().nonempty('this field is required').regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
        'Must be at least 8 characters with numbers and symbols'  ), 
     
})
export type loginSchemaType = zod.infer<typeof loginSchema>