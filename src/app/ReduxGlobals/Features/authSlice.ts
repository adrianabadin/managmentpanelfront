import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { apiSlice, SignUpType } from "./apiSlice";
import { DepartmentType } from '../../../../../managmentpanelback/src/users/users.schema';
export type Department= {
Departments:{name:string,id:string}
}
export interface AuthResponseType extends Omit<SignUpType,"password2"|"password"> 
{
    id:string
    DepartmentUsers:Department[]
    responsibleFor:Department["Departments"][]
}
const initialState:AuthResponseType={
    lastname:"",
    name: "",
    username:"",
    id:"",
    isAdmin:false,
    DepartmentUsers:[],
    Departments:[],
    responsibleFor:[]
}

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
      clearAuth:(_state)=>initialState  
    },
    extraReducers:(builder)=>{
        builder.addMatcher(apiSlice.endpoints.login.matchFulfilled,(state,action:PayloadAction<AuthResponseType>)=>{
            state.lastname=action.payload.lastname
            state.username=action.payload.username
            state.name=action.payload.name
            state.id=action.payload.id
            state.isAdmin=action.payload.isAdmin
            state.Departments=action.payload.Departments
        }),
        builder.addMatcher(apiSlice.endpoints.jwtLogin.matchFulfilled,(state,action:PayloadAction<AuthResponseType>)=>{
            state.lastname=action.payload.lastname
            state.username=action.payload.username
            state.name=action.payload.name
            state.id=action.payload.id
            state.isAdmin=action.payload.isAdmin
            state.Departments=action.payload.Departments

        })
    }
        
    
})
export const {clearAuth}=authSlice.actions