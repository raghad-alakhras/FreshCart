import zod from "zod";

export const changePassSchema = zod.object({
    currentPassword:zod.string().nonempty('this field is required').regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
        'Must be at least 8 characters with numbers and symbols'  ), 
    password:zod.string().nonempty('this field is required').regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
        'Must be at least 8 characters with numbers and symbols'  ), 
    rePassword: zod.string().nonempty('this field is required')
      
}).refine((data)=> data.password===data.rePassword,{
        error:'password and repassword dont match',
        path:['rePassword']
 
})
export type changePassSchemaType = zod.infer<typeof changePassSchema>