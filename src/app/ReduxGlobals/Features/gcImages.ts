import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { apiSlice, SignUpType } from "./apiSlice";
import Link from 'next/link';
import {z}from "zod"
export const gcImageItem=z.object({
    description:z.string().min(3,{message:"La descripcion de la imagen debe ser de al menos 3 caracteres"}),
    link:z.string().url({message:"Debe ser un link valido"})
})
export type GcImageItem=z.infer<typeof gcImageItem>
const initialState:{description:string,link:string}[]=[]
export const gcImageSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
      clearAuth:(_state)=>initialState,
      addFile:(state,action:PayloadAction<GcImageItem>)  =>{
        if (state.length ===0) state=[action.payload]
        else state.push(action.payload)
      },
      removeFile:(state,action:PayloadAction<GcImageItem>)=>{
        return state.filter(item=>item.description=== action.payload.description && item.link===action.payload.link)
      }
    }        
})
export const {clearAuth}=gcImageSlice.actions