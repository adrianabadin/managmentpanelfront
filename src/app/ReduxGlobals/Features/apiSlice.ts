import {FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {z} from "zod"
import { AuthResponseType } from "./authSlice"
import { DepartmentAddType } from "@/app/departments/config/components/AddDepartment"
import { DemografyCreateType } from "@/app/departments/config/components/AddState"
import { CloseTaskType, TaskType } from "@/app/components/Agenda"
import { AddKOI } from "@/app/departments/config/components/AddKindOfIssue"
import { FilesDescriptor, UserIssue } from "@/app/GCiudadana/components/IssueForm"


const dotenvSchema = z.object({
    NEXT_PUBLIC_BACKURL:z.string().url()
})
declare global{
    namespace NodeJS{
        interface ProcessEnv extends z.infer<typeof dotenvSchema>{} 
    }
}
/*************************
 * SCHEMAS
 *************************/
/**
 * {
  "id": "a3f141ba-a0dc-4706-850b-663c6ff9d921",
  "createdAt": "2024-04-07T17:03:04.456Z",
  "updatedAt": "2024-04-07T17:03:04.456Z",
  "name": "Practica",
  "text": "Estudio o practica para diagnostico o tratamiento"
}
 */
export const interventionSchema=z.object({
    id:z.string({required_error:"Debes proveer el id de la gestion"}),
      description:z.string({required_error:"Debes proveer una descripcion"}).min(10,{message:"La descripcion de tu intervencion debe tener al menos 10 letras"}),
      files:z.array(FilesDescriptor).optional()
    })
    
export const mailSchema = z.object({
    to:z.string().email({message:"Debes proveer un mail de destino valido"}),
     autor:z.string({required_error:"Debes proveer un nombre de remitente"}),
     nombre:z.string({required_error:"Debes proveer un nombre de destinatario"}),
     body:z.string({required_error:"Debes proveer el cuerpo del mensaje"})
 
 })
export const createdKOISchema = z.object({
    id:z.string(),
    createdAt:z.date(),
    updatedAt:z.date(),
    name:z.string(),
    text:z.string(),
})
export type CreatedKOI=z.infer<typeof createdKOISchema>
/**
 * {
  "id": "00276d37-53db-4feb-92ed-81b5967ad695",
  "createdAt": "2024-03-20T20:57:18.655Z",
  "updatedAt": "2024-03-21T13:57:51.708Z",
  "isActive": false,
  "title": "Locura",
  "description": "Absoluta",
  "fODAId": "2b522f37-8a4c-4601-a831-8052998e8121"
}
 */
export const deleteSchema = z.object({
    id:z.string().uuid(),
    isActive:z.boolean(),
    title:z.string(),
    description:z.string(),
    fODAId:z.string().uuid(),
    createdAt:z.date(),
    updatedAt:z.date()
})

export const fodaItem =  z.object({
    id:z.string().uuid(),
    title:z.string().min(3,{message:"Title must have at least 3 leters"}),
    description:z.string().min(3,{message:"Description must have at least 3 leters"})
})
export const fodaResponseSchema=z.object({
    id:z.string().uuid(),
    createdAt:z.date(),
    updatedAt:z.date(),
    demographyId:z.string().uuid(),
    Menace:z.array(fodaItem,{description:"A FODA item array is espected"}).optional(),
    Strength:z.array(fodaItem,{description:"A FODA item array is espected"}).optional(),
    Weakness:z.array(fodaItem,{description:"A FODA item array is espected"}).optional(),
    Oportunity:z.array(fodaItem,{description:"A FODA item array is espected"}).optional(),
    StrategySO:z.array(fodaItem,{description:"A FODA item array is espected"}).optional(),
    StrategySM:z.array(fodaItem,{description:"A FODA item array is espected"}).optional(),
    StrategyWO:z.array(fodaItem,{description:"A FODA item array is espected"}).optional(),
    StrategyWM:z.array(fodaItem,{description:"A FODA item array is espected"}).optional()
})

export const SignUpSchema = z.object({
    
     username:z.string().email({message:"Debes proveer un email valido"}),
     password:z.string().min(6,{message:"La contraseña debe contener al menos 6 caracteres"}),
     password2:z.string().min(6,{message:"La contraseña debe contener al menos 6 caracteres"}),
     name:z.string().min(3,{message:"El nombre debe contener al menos 3 caracteres"}),
     lastname:z.string().min(3,{message:"El apellido debe contener al menos 3 caracteres"}),
     isAdmin:z.boolean({invalid_type_error:"isAdmin debe ser un boolean"}).optional(),
     Departments:z.array(z.object({
        id:z.string(),
        name:z.string()
     })).optional(),

    }).refine((value)=>{
        if (value.password===value.password2) return true
        else return false
    },{message:"Ambas contraseñas deben coincidir",path:["password2"]})

export const statesSchema =z.object({
    id:z.string().uuid(),
    createdAt:z.date(),
    updatedAt:z.date(),
    state:z.string().min(3,{message:"El partido debe tener al menos 3 caracteres"}),
    population:z.number(),
    description:z.string().min(3,{message:"La descripcion debe tener al menos 3 caracteres"}),
    politics:z.string().min(3,{message:"El partido politico debe tener al menos 3 letras"})
})
export type StatesType = z.infer<typeof statesSchema>
    export const TasksResponseSchema =z.object({
    id:z.string().uuid({message:"debe ser un UUID valido"}),
    createdAt:z.string().min(3,{message:"debe contener al menos 3 caracteres"}),
    title:z.string().min(1,{message:"debe tener al menos 3 caracteres"}),
    date:z.string().transform((stringValue)=>new Date(stringValue)),
    flag:z.enum(["red", "green", "yellow"],{invalid_type_error:"el valor debe ser (red,yellow,green)"}),
    Departments:z.object({
        name:z.string().min(3,{message:"debe tener al menos 3 caracteres"}),

    }),
    Demography:z.object({
        state:z.string().min(3,{message:"debe tener al menos 3 caracteres"}),
    }),
    Users:z.object({
        username:z.string().min(3,{message:"debe tener al menos 3 caracteres"}),
    }),
    brief:z.string().min(3,{message:"El informe debe tener al menos 3 caracteres"}).optional(),
    file:z.string().url({message:"File debe ser un link Valido"}).optional()

})
export type TasksResponseType = z.infer<typeof TasksResponseSchema>
 export const LoginSchema = z.object({
          username:z.string().email({message:"debes proveer un email valido"}),
         password:z.string().min(6,{message:"La contraseña debe contener al menos 6 caracteres"})
         
     })
export const DepartmentCreateSchema= z.object({
    id:z.string().uuid({message:"ID debe ser un UUID"}),
    name:z.string().min(3,{message:"El nombre debe tener 3 caracteres"}),
    description:z.string().min(3,{message:"La desripcion debe tener 3 caracteres"})

}) 
export const  ItemResponseFoda=z.object({
    title:z.string().min(3,{message:"El titulo debe tener 3 caracteres"}),
    description:z.string().min(3,{message:"La desripcion debe tener 3 caracteres"})
})
export const FodaUpdateResponse = z.object({
    menaces:z.array(ItemResponseFoda),
    oportunities:z.array(ItemResponseFoda),
    weakneasses:z.array(ItemResponseFoda),
    strengths:z.array(ItemResponseFoda),
    state:z.string().min(3,{message:"State must have at least 3 characters"}),
    id:z.string().uuid(),
    createdAt:z.date(),
    updatedAt:z.date(),
    departmentsId:z.string().uuid().nullable(),
    demographyId:z.string().uuid().nullable()

})
/**
 * TYPES
 */ 
export type Intervention=z.infer<typeof interventionSchema>
export type DeleteMember = z.infer<typeof deleteSchema>
export type FodaUpdate =z.infer<typeof FodaUpdateResponse>
export type DepartmentResponseType = z.infer<typeof DepartmentCreateSchema>
export type FodaResponse = z.infer<typeof fodaResponseSchema>
export type FodaItem=z.infer<typeof fodaItem>
export type SignUpType =z.infer<typeof SignUpSchema>
export type LoginType = z.infer<typeof LoginSchema>
export type TaskFilterType ={username?:string,state?:string,department?:string,isCompleted?:boolean}|undefined
export type AddMember ={service?:string,state?:string}
export type MemberAdd ={query:AddMember,body:{title:string,description:string}}
export type Mail = z.infer<typeof mailSchema>
export type GetIssues ={
    id:string
    createdAt:Date
    email: string
    email2:string
    name: string
    lastName: string
    socialSecurityNumber: string
    phone:string
    phone2:string
    description: string
    files: Array<{data:string,name:string,id:string}>
    kind: string
    state:string
}
/**
 * API
 */
export const apiSlice=createApi({
    reducerPath: "api",
    baseQuery:fetchBaseQuery({baseUrl:process.env.NEXT_PUBLIC_BACKURL,credentials:"include",mode:"cors"}),
        tagTypes:["users","departments","states","tasks","foda","kois","issues",'interventions'],refetchOnMountOrArgChange:true,
    endpoints:(builder)=>({
        login:builder.mutation<AuthResponseType,LoginType>({
            query:(authData)=>
            ({url:`/auth/login`,
            headers:{"Content-Type": "application/json"},
            method: 'POST',      
            body:authData}),invalidatesTags:[{type:"tasks"}],

     
        }),
        signUp:builder.mutation<AuthResponseType,SignUpType>({
          query:(signUpData)=>({
            url:"/auth/signup",
            method:"post",
            body:signUpData
          })
        }),
        logout:builder.query<any,undefined>({
            query:()=>({
                url:'/auth/logout',
                method:"get"
            })
        }),
        getUsers:builder.query<AuthResponseType[],undefined>({
            query:()=>({
                url:"/users/getUsers",
                method:"get"
            }),providesTags: [{type:"users"}]
        }),
        setAdmin:builder.mutation<AuthResponseType,string>({
            query:(id)=>({
                url:  `/users/setadmin/${id}`,
                method:"put"
            }),invalidatesTags:["users"]
        }),
        dropAdmin:builder.mutation<AuthResponseType,string>({
            query:(id)=>({
                url:  `/users/dropadmin/${id}`,
                method:"put"
            }),invalidatesTags:["users"]
        }),
        createDepartment:builder.mutation<DepartmentResponseType,DepartmentAddType>({
            query:(data)=>({
                url:"/departments/createdepartment",
                method:"post",
                body:data
            }),invalidatesTags:["users", "departments"]
        }),
        getDepartments:builder.query<DepartmentResponseType[],{username?:string}|undefined>({
            query:(query)=>({
                url:`/departments/getdepartments${(query !== undefined)? "?username="+query.username:""}`,
                method:"get",

            }),providesTags:[{type:"departments"}]
        }),
        createState:builder.mutation<any,DemografyCreateType>({
            query:(data)=>({
                url:"/demography/create",
                method:"post",
                body:data
            }),invalidatesTags:[{type:"states"}]
        }),
        getStates:builder.query<StatesType[],undefined>({
            query:()=>({
                url:"/demography/getstates",
                method:"get"
            }),providesTags:[{type:"states"}]
        }),
        // linkDepartment:builder.mutation<any,{data:{name:string[]},id:string}>({
        //     query:(data)=>{
        //         let url = "/users/adddepartments/"+data.id
        //         console.log(data,url,"put")
        //         return {
        //         url,
        //         method: "put",
        //         body:{...data.data}
                
        //     }},invalidatesTags:[{type:"users"}]
        // }),
        addService:builder.mutation<any,{data:{name:string[]},id:string}>({
            query:(data)=>({
                url:"/users/adddepartments/"+data.id,
                method:"put",
                body:{...data.data}
            }),invalidatesTags:[{type:"users"}]
        }),
        getTasks:builder.query<TasksResponseType[],TaskFilterType>({
            query:(query)=>{
                
                return {url:`/tasks/get${query !== undefined ? "?"+Object.keys(query).map(item=>`${item}=${query[item as keyof typeof query]}`).join("&"):""}`,  //"/tasks/get"+(query !== undefined && query !==null)?"?":""+ (query!== undefined && query !==null)? ():"" ,
                method:"get"}
            },providesTags:[{type:"tasks"}]
        }),
        createTask:builder.mutation<TasksResponseType,Omit<TaskType,'time'>>({
            query:(body)=>({
                url:"/tasks/create",
                method:"post",
                body:body
            }),invalidatesTags:[{type:"tasks"}]

        }),
        deleteTask:builder.mutation<TasksResponseType,string>({
            query:(id)=>({
                url:"/tasks/delete?id="+id,
                method:"delete"
            }),invalidatesTags:[{type:"tasks"}] 
        }),
        updateTask:builder.mutation<TasksResponseType,Omit<TaskType,'time'>&{id:string}>({
            query:(data)=>({
                url:"/tasks/update",
                method:"put",
                body:data
            }),invalidatesTags:[{type:"tasks"}]
        }),
        closeTask:builder.mutation<{id:string},CloseTaskType>({
            query:(data)=>({
                url:"/tasks/close",
                method:"put",
                body:data,
            }),invalidatesTags:[{type:"tasks"}]
        }),
        createDocument:builder.mutation<{id:string},{title:string,text:string,user:string}>({
            query:(data)=>({
                url:"/google/createDocument",
                method:"post",
                body:data
            })
        }),
        getFoda:builder.query<FodaResponse,{state?:string,department?:string}>({
            query:(baseQuery)=>{
                const {department,state} =baseQuery
                let query={}
                if (department !== undefined && department !==null){
                    query={service:department}
                }
                if (state !== undefined && state !== null){
                    query={...query,state}
                }
                              return {
                url:`/foda${query !== undefined 
                    ? "?"+Object.keys(query)
                        .map(item=>`${item}=${query[item as keyof typeof query]}`)
                        .join("&")
                    :""}`, 
            }},providesTags:[{type:"foda"}]
        }),
        addStrength:builder.mutation<FodaUpdate,MemberAdd>({
            query:(data)=>({
                url:`/foda/strength${data.query !== undefined ? "?"+Object.keys(data.query)
                    .map(key=>
                        {
                            if (data.query[key as keyof typeof data.query] !==undefined)
                            return `${key}=${data.query[key as keyof typeof data.query]}`
                            else return 
                        }
                        )
                    .join("&"):""}`,
                method:"PUT",
                body:data.body
            }),invalidatesTags:[{type: "foda"}]
        }),
        removeStrength:builder.mutation<DeleteMember,string>({
            query:(id)=>({
                url:"/foda/strength/"+id,
                method:"DELETE"
            }),invalidatesTags:[{type:"foda"}]
        }),
        addWeakness:builder.mutation<FodaUpdate,MemberAdd>({
            query:(data)=>({
                url:`/foda/weakness${data.query !== undefined ? "?"+Object.keys(data.query)
                .map(key=>
                    {
                        if (data.query[key as keyof typeof data.query] !==undefined)
                        return `${key}=${data.query[key as keyof typeof data.query]}`
                        else return 
                    }
                    )
                .join("&"):""}`,
            method:"PUT",
            body:data.body
            }),invalidatesTags:[{type: "foda"}]
        }),
        removeWeakness:builder.mutation<DeleteMember,string>({
            query:(id)=>({
                url:"/foda/weakness/"+id,
                method:"DELETE"
            }),invalidatesTags:[{type:"foda"}]
        }),
        addOportunity:builder.mutation<FodaUpdate,MemberAdd>({
            query:(data)=>({
                url:`/foda/oportunity${data.query !== undefined ? "?"+Object.keys(data.query)
                .map(key=>
                    {
                        if (data.query[key as keyof typeof data.query] !==undefined)
                        return `${key}=${data.query[key as keyof typeof data.query]}`
                        else return 
                    }
                    )
                .join("&"):""}`,
            method:"PUT",
            body:data.body
            }),invalidatesTags:[{type: "foda"}]
        }),
        removeOportunity:builder.mutation<DeleteMember,string>({
            query:(id)=>({
                url:"/foda/oportunity/"+id,
                method:"DELETE"
            }),invalidatesTags:[{type:"foda"}]
        }),
        addMenace:builder.mutation<FodaUpdate,MemberAdd>({
            query:(data)=>({
                url:`/foda/menace${data.query !== undefined ? "?"+Object.keys(data.query)
                .map(key=>
                    {
                        if (data.query[key as keyof typeof data.query] !==undefined)
                        return `${key}=${data.query[key as keyof typeof data.query]}`
                        else return 
                    }
                    )
                .join("&"):""}`,
            method:"PUT",
            body:data.body
            }),invalidatesTags:[{type: "foda"}]
        }),
        removeMenace:builder.mutation<DeleteMember,string>({
            query:(id)=>({
                url:"/foda/menace/"+id,
                method:"DELETE"
            }),invalidatesTags:[{type:"foda"}]
        }),
        addStrategySO:builder.mutation<FodaUpdate,MemberAdd>({
            query:(data)=>({
                url:`/foda/strategySO${data.query !== undefined ? "?"+Object.keys(data.query)
                .map(key=>
                    {
                        if (data.query[key as keyof typeof data.query] !==undefined)
                        return `${key}=${data.query[key as keyof typeof data.query]}`
                        else return 
                    }
                    )
                .join("&"):""}`,
            method:"PUT",
            body:data.body
            }),invalidatesTags:[{type: "foda"}]
        }),
        removeStrategySO:builder.mutation<DeleteMember,string>({
            query:(id)=>({
                url:"/foda/strategySO/"+id,
                method:"DELETE"
            }),invalidatesTags:[{type:"foda"}]
        }),
        addStrategyWO:builder.mutation<FodaUpdate,MemberAdd>({
            query:(data)=>({
                url:`/foda/strategyWO${data.query !== undefined ? "?"+Object.keys(data.query)
                .map(key=>
                    {
                        if (data.query[key as keyof typeof data.query] !==undefined)
                        return `${key}=${data.query[key as keyof typeof data.query]}`
                        else return 
                    }
                    )
                .join("&"):""}`,
            method:"PUT",
            body:data.body
            }),invalidatesTags:[{type: "foda"}]
        }),
        removeStrategyWO:builder.mutation<DeleteMember,string>({
            query:(id)=>({
                url:"/foda/strategyWO/"+id,
                method:"DELETE"
            }),invalidatesTags:[{type:"foda"}]
        }),
        addStrategySM:builder.mutation<FodaUpdate,MemberAdd>({
            query:(data)=>({
                url:`/foda/strategySM${data.query !== undefined ? "?"+Object.keys(data.query)
                .map(key=>
                    {
                        if (data.query[key as keyof typeof data.query] !==undefined)
                        return `${key}=${data.query[key as keyof typeof data.query]}`
                        else return 
                    }
                    )
                .join("&"):""}`,
            method:"PUT",
            body:data.body
            }),invalidatesTags:[{type: "foda"}]
        }),
        removeStrategySM:builder.mutation<DeleteMember,string>({
            query:(id)=>({
                url:"/foda/strategySM/"+id,
                method:"DELETE"
            }),invalidatesTags:[{type:"foda"}]
        }),
        addStrategyWM:builder.mutation<FodaUpdate,MemberAdd>({
            query:(data)=>({
                url:`/foda/strategyWM${data.query !== undefined ? "?"+Object.keys(data.query)
                .map(key=>
                    {
                        if (data.query[key as keyof typeof data.query] !==undefined)
                        return `${key}=${data.query[key as keyof typeof data.query]}`
                        else return 
                    }
                    )
                .join("&"):""}`,
            method:"PUT",
            body:data.body
            }),invalidatesTags:[{type: "foda"}]
        }),
        removeStrategyWM:builder.mutation<DeleteMember,string>({
            query:(id)=>({
                url:"/foda/strategyWM/"+id,
                method:"DELETE"
            }),invalidatesTags:[{type:"foda"}]
        }),
        uploadImage:builder.mutation<{id:string},FormData>({
            query:(body)=>({
                url:"/google/uploadImage/",
                method:"POST",
                body
            })
        }),
        deleteImage:builder.mutation<any,string>({
            query:(id)=>({
                url:"/google/deleteImage?id="+id,
                method:"DELETE",
            })
        }),
        addKindOfIssue:builder.mutation<CreatedKOI,AddKOI>({
            query:(body)=>({
                url:"/gc",
                method:"POST",
                body
            }),invalidatesTags:[{type:"kois"}]
        }),
        getKOIs:builder.query<CreatedKOI[]|CreatedKOI,string|undefined>({
            query:(id)=>{
                let url:string = "/gc"
                if (id !== undefined) url+= "?id="+id
                return {
                url,
                method:"GET",
            }},providesTags:[{type:"kois"}]
        }),
        deleteKOI:builder.mutation<{id:string},string>({
            query:(id)=>({
                url:"/gc?id="+id,
                method:"DELETE"
            }),invalidatesTags:[{type:"kois"}]
        }),
        updateKOI:builder.mutation<CreatedKOI,AddKOI&{id:string}>({
            query:(body)=>({
                url:"/gc",
                method:"put",
                body
            }),invalidatesTags:[{type:"kois"}]
        }),
        createIssue:builder.mutation<{id:string},UserIssue>({
            query:(body)=>({
                url:"/gc/issue",
                method:"post",
                body
            }),invalidatesTags:[{type:"issues"}]
        }),
        getIssues:builder.query<GetIssues[]|GetIssues,string|undefined>({
            query:(id)=>{
                let url:string = "/gc/issue"
                if (id !==undefined) url+="?id="+id
                return {
                url,
                method:"get"
            }},providesTags:[{type:"issues"}]
        }),
        addPhone:builder.mutation<{id:string},{id:string,phone:string}>({
            query:(body)=>{
                return {
                    url:"/gc/addphone",
                    method:"PUT",
                    body
            }
            },invalidatesTags:[{type:"issues"}]
        }),
        addMail:builder.mutation<{id:string},{id:string,mail:string}>({
            query:(body)=>({
                url:"/gc/addmail",
                method:"put",
                body
            }),invalidatesTags:[{type:"issues"}]
        }),
        sendMail:builder.mutation<any,Mail>({
            query:(body)=>({
                url:"/google/sendmail",
                method:"post",
                body
            })
        }),
        addIntervention:builder.mutation<{id:string},Intervention>({
            query:(body)=>({
                url:"/gc/intervention",
                method:"post",
                body
            }),invalidatesTags:[{type:"interventions"}]
        })
    })
    })
export const {
    useAddInterventionMutation,
    useSendMailMutation,
    useAddMailMutation,
    useAddPhoneMutation,
    useGetIssuesQuery,
    useCreateIssueMutation,
    useUpdateKOIMutation,
    useDeleteKOIMutation,
    useGetKOIsQuery,
    useAddKindOfIssueMutation,
    useDeleteImageMutation,
    useUploadImageMutation,
    useAddStrategyWMMutation,
    useRemoveStrategyWMMutation,
    useAddStrategySMMutation,
    useRemoveStrategySMMutation,
    useAddStrategyWOMutation,
    useRemoveStrategyWOMutation,
    useAddStrategySOMutation,
    useRemoveStrategySOMutation,
    useAddMenaceMutation,
    useRemoveMenaceMutation,
    useAddOportunityMutation,
    useRemoveOportunityMutation,
    useAddWeaknessMutation,
    useRemoveWeaknessMutation,
    useRemoveStrengthMutation,
    useGetFodaQuery,
    useAddStrengthMutation,
    useCloseTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useCreateTaskMutation,
    useGetTasksQuery,
    useGetStatesQuery,
    useCreateStateMutation,
    useGetDepartmentsQuery,
    useGetUsersQuery, 
    useCreateDepartmentMutation,
    useLoginMutation,
    useSignUpMutation,
    useLogoutQuery, 
    useSetAdminMutation,
    useDropAdminMutation,
    useCreateDocumentMutation,
    useAddServiceMutation
}=apiSlice
