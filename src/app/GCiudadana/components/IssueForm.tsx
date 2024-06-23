"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import swal from "sweetalert2";
import {
  Button,
  Input,
  Option,
  Select,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { kill } from "process";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import upload from "@/icons/UPLOAD.svg";
import Image from "next/image";
import FileButton from "./FileButton";
import { Suspense, useState } from "react";
import FileUpload from "./FileUpload";
import {
  useCreateIssueMutation,
  useGetKOIsQuery,
  useGetStatesQuery,
} from "@/app/ReduxGlobals/Features/apiSlice";

export const FilesDescriptor = z.object({
  driveId: z.string({ required_error: "El campo es obligatorio" }),
  name: z
    .string({ required_error: "El campo es obligatorio" })
    .min(3, "El nombre del archivo debe tener al menos 3 letras"),
  description: z.string({ required_error: "El campo es obligatorio" }).min(3, {
    message: "La descripcion del archivo debe contener al menos 3 caracteres",
  }),
});
const userIssue = z
  .object({
    email: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (value === undefined || value === "") return true;
          else {
            const prueba = z.string().email();
            const response = prueba.safeParse(value);
            if (response.success) return true;
            else return false;
          }
        },
        { message: "Debes proveer un email valido o nada" }
      ),
    name: z
      .string({ required_error: "El campo es obligatorio" })
      .min(3, { message: "El nombre debe tener al menos 3 letras" }),
    lastName: z
      .string({ required_error: "El campo es obligatorio" })
      .min(3, { message: "El apellido debe tener al menos 3 letras" }),
    socialSecurityNumber: z
      .string({ required_error: "El campo es obligatorio" })
      .regex(/^[0-9]{7,8}$/, {
        message:
          "El DNI debe contar con 7 a 8 caracteres numericos sin simbolos especiales",
      }),
    phone: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (value === undefined || value === "") return true;
          console.log(value);
          if (value.length < 10) return false;
          let bool: boolean = true;
          value.split("").forEach((character) => {
            console.log(
              character,
              parseInt(character),
              Number.isNaN(parseInt(character))
            );
            if (Number.isNaN(parseInt(character))) bool = false;
          });
          return bool;
        },
        { message: "Deben ser 10 digitos o ningun valor" }
      )
      .optional(),
    state: z
      .string({ required_error: "El campo es obligatorio" })
      .min(3, { message: "El partido debe contener al menos 3 caracteres" }),
    kind: z.string({ required_error: "El campo es obligatorio" }).min(3, {
      message: "El tipo de solicitud debe contener al menos 3 caracteres",
    }),
    description: z
      .string({ required_error: "El campo es obligatorio" })
      .min(3, {
        message: "La descripcion debe contener al menos 3 caracteres",
      }),
    files: z.array(FilesDescriptor).optional(),
  })
  .refine(
    (values) => {
      if (
        (values.email === undefined || values.email === "") &&
        (values.phone === undefined || values.phone === "")
      )
        return false;
      else return true;
    },
    {
      path: ["root"],
      message: "Debes ingresar un telefono o un mail para contacto",
    }
  );
export type UserIssue = z.infer<typeof userIssue>;
export type FileType = z.infer<typeof FilesDescriptor>;
export function IssueForm() {
  const [open, setOpen] = useState(false);
  const {
    register,
    setValue,
    getValues,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserIssue>({
    resolver: zodResolver(userIssue),
    mode: "all",
  });
  const [createIssue] = useCreateIssueMutation();
  const { data, isFetching } = useGetStatesQuery(undefined);
  const { data: kois, isFetching: koisFetch } = useGetKOIsQuery(undefined);
  console.log(errors, Object.keys(errors).length, "DATA");
  return isFetching || koisFetch ? (
    <Spinner />
  ) : (
    <main className="w-11/12 bg-white flex flex-col justify-center mx-auto p-8">
      <Typography variant="h1" color="blue" className="text-center">
        Gestion Ciudadana
      </Typography>
      <Typography variant="h2" color="blue" className="text-center">
        Region Sanitaria X
      </Typography>
      <Typography variant="h4" color="black" className="font-bold">
        Objetivo:
      </Typography>
      <Typography
        variant="paragraph"
        color="blue-gray"
        className="text-justify"
      >
        Cuidamos la salud de los bonaerenses, a partir de la prevención,
        promoción y el ordenamiento de la demanda, mediante nuestros programas y
        efectores sanitarios. Completando el siguiente formulario podes hacernos
        llegar tu reclamo, demanda o pedido. También podes comunicarte al 422546
        o enviarnos un mail a gestionciudadana.rsx@gmail.com
      </Typography>
      <form
        className="grid grid-cols-6 gap-8 w-full bg-white  my-4 grid-flow-dense"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <div className="flex flex-col col-span-3 mt-6">
          <Input
            {...register("name")}
            label="Nombre"
            placeholder="Nombre"
            variant="outlined"
            containerProps={{ className: "w-full" }}
            className=" w-full "
          />
          <p className="text-red-500 font-bold text-center w-full">
            {errors.name ? errors.name.message : " "}
          </p>
        </div>
        <div className="flex flex-col col-span-3 mt-6">
          <Input
            {...register("lastName")}
            label="Apellido"
            placeholder="Apellido"
            variant="outlined"
            containerProps={{ className: "w-full" }}
            className=" w-full "
          />
          <p className="text-red-500 font-bold text-center w-full">
            {errors.lastName ? errors.lastName.message : " "}
          </p>
        </div>
        <div className="flex flex-col col-span-2 mt-6">
          <Input
            {...register("socialSecurityNumber")}
            label="DNI"
            placeholder="DNI"
            variant="outlined"
            containerProps={{ className: "w-full" }}
            className=" w-full "
          />
          <p className="text-red-500 font-bold text-center w-full">
            {errors.socialSecurityNumber
              ? errors.socialSecurityNumber.message
              : " "}
          </p>
        </div>
        <div className="flex flex-col col-span-2 mt-6">
          <Input
            {...register("email")}
            label="e-Mail"
            placeholder="e-Mail"
            variant="outlined"
            containerProps={{ className: "w-full" }}
            className=" w-full "
          />
          <p className="text-red-500 font-bold overflow-visible text-center w-full">
            {errors.email ? errors.email.message : " "}
          </p>
        </div>
        <div className="flex flex-col col-span-2 mt-6">
          <Input
            {...register("phone")}
            label="Telefono"
            placeholder="Telefono"
            variant="outlined"
            containerProps={{ className: "w-full" }}
            className=" w-full "
          />
          <p className="text-red-500 font-bold text-center w-full">
            {errors.phone ? errors.phone.message : " "}
          </p>
        </div>
        <div className="flex justify-center content-between flex-col col-span-2">
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <>
                <Select
                  label="Partido"
                  placeholder={null}
                  className="col-span-2 col-start-1 text-black"
                  containerProps={{ className: "mt-10 mb-10" }}
                  {...field}
                  onChange={(data) =>
                    data !== undefined ? setValue("state", data) : null
                  }
                >
                  {isFetching || data === undefined ? (
                    <Spinner />
                  ) : (
                    data.map((item) => (
                      <Option key={item.id} value={`${item.state}`}>
                        {`${item.state}`}
                      </Option>
                    ))
                  )}
                </Select>
                <p className="text-red-500 font-bold text-center">
                  {errors.state !== undefined ? errors.state.message : " "}
                </p>
              </>
            )}
          ></Controller>

          <Controller
            name="kind"
            control={control}
            render={({ field }) => (
              <Suspense>
                <Select
                  label="Tipo de solicitud"
                  placeholder={null}
                  className="col-span-2 col-start-1 text-black"
                  containerProps={{ className: "mt-10 mb-10" }}
                  {...field}
                  onChange={(data) => field.onChange(data)}
                >
                  {Array.isArray(kois)
                    ? kois.map((item) => (
                        <Option key={item.id} value={item.name}>
                          {item.name}
                        </Option>
                      ))
                    : null}
                </Select>
                <p className="text-red-500 font-bold text-center">
                  {errors.kind !== undefined ? errors.kind.message : " "}
                </p>
              </Suspense>
            )}
          ></Controller>
          <FileButton
            text="Subir documentacion (Formato JPG)"
            handleClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className="flex flex-col col-span-4 mt-6 h-full">
          <Textarea
            {...register("description")}
            label="Descripcion del problema..."
            variant="outlined"
            containerProps={{ className: "w-full h-full mb-4" }}
            className=" w-full  row-span-1 grid-flow-row-dense"
          ></Textarea>
          <p className="text-red-500 font-bold text-center w-full">
            {errors.description ? errors.description.message : " "}
          </p>
        </div>
        <Button
          color="blue"
          type="button"
          className="w-fit p-4 col-span-6 self-center mx-auto"
          onClick={() => {
            const data = getValues();
            const result = userIssue.safeParse(data);
            if (result.success) {
              console.log(data);
              createIssue(data)
                .unwrap()
                .then((response) => {
                  console.log(response);
                  swal.fire(
                    "Gestion Iniciada",
                    `Su codigo de gestion es :<br><strong>${
                      response.id as string
                    }</strong><br> recibira un email confirmando esto y se comunicaran con ud a la brevedad.`,
                    "success"
                  );
                })
                .catch((e) => swal.fire("Error", e.text, "error"));
            } else
              swal.fire(
                "Error",
                `Los campos ${result.error.issues.map((item) =>
                  item.path.join("/")
                )} tienen los siguientes errores:\n ${result.error.issues.map(
                  (issue) => issue.message + "\n"
                )}`,
                "error"
              );
          }}
          disabled={Object.keys(errors).length !== 0 ? true : undefined}
        >
          Iniciar Tramite
        </Button>
      </form>
      <FileUpload
        title="Cargar documentacion"
        open={open}
        setOpen={setOpen}
        getValues={getValues}
        setValue={setValue}
      />
    </main>
  );
}
