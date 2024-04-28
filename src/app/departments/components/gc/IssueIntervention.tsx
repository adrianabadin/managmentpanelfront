import close from "@/icons/close.svg";
import upload from "@/icons/UPLOAD.svg";
import FileUpload from "@/app/GCiudadana/components/FileUpload";
import { FilesDescriptor } from "@/app/GCiudadana/components/IssueForm";
import { zodResolver } from "@hookform/resolvers/zod";
import swal from "sweetalert2";
import {
  Dialog,
  DialogHeader,
  Typography,
  Button,
  DialogBody,
  Textarea,
  DialogFooter,
} from "@material-tailwind/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { InterventionResponse } from "./InterventionResponse";
import {
  useAddInterventionMutation,
  useSendMailMutation,
} from "@/app/ReduxGlobals/Features/apiSlice";
import { useAppSelector } from "@/app/ReduxGlobals/store";
const interventionSchema = z.object({
  files: z.array(FilesDescriptor).optional(),
  description: z
    .string()
    .min(3, { message: "Debes ingresar una cadena de al menos 3 letras" }),
});
export type Intervention = z.infer<typeof interventionSchema>;
export function IssueIntervention({
  open,
  setOpen,
  to,
  username,
  id,
}: {
  id: string;
  to: string;
  username: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [openAnswer, setOpenAnswer] = useState<boolean>(false);
  const [openFU, setOpenFU] = useState<boolean>(false);
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof interventionSchema>>({
    mode: "all",
    resolver: zodResolver(interventionSchema),
  });
  const [sendMail] = useSendMailMutation();
  const [addIntervention] = useAddInterventionMutation();
  const { name, lastname } = useAppSelector((state) => state.auth);
  return (
    <Dialog
      open={open}
      handler={() => setOpen((prev) => !prev)}
      title="Intervencion"
      size="lg"
    >
      <DialogHeader>
        <div className="flex justify-between w-full">
          <Typography variant="h2" color="blue">
            Intervención
          </Typography>
          <Button
            variant="filled"
            className="bg-transparent shadow-none outline-none border-none"
            onClick={() => setOpen(false)}
          >
            <Image src={close} alt="Cerrar" width={32} height={32} />
          </Button>
        </div>
      </DialogHeader>
      <form
        onSubmit={handleSubmit((data) => {
          addIntervention({
            description: data.description,
            files: data.files,
            id,
          })
            .unwrap()
            .then(() => setOpen(false))
            .catch((e) => {
              swal.fire("Error", e.text, "error");
            });
          sendMail({
            to,
            nombre: username,
            autor: `${name} ${lastname}`,
            body: "Se ha realizado una intervencion en tu gestion, cuando tengamos respuesta de la misma te lo comunicaremos",
          });
        })}
      >
        <DialogBody className="pt-0">
          <Typography variant="h4" color="blue">
            Descripcion:
          </Typography>
          <div className="my-2">
            <Textarea
              {...register("description")}
              variant="outlined"
              containerProps={{ className: "mt-4" }}
              label="Descripcion"
              error={errors.description === undefined ? undefined : true}
            />
            <p className="w-full text-center text-red-500">
              {errors.description !== undefined
                ? errors.description.message
                : " "}
            </p>
          </div>
        </DialogBody>
        <DialogFooter className="w-full flex justify-around">
          <Button variant="gradient" color="blue" type="submit">
            Guardar
          </Button>
          <Button
            variant="filled"
            className="bg-transparent outline-none shadow-none border-none"
            onClick={() => setOpenFU(true)}
          >
            <Image
              src={upload}
              width={48}
              height={48}
              alt="Subir Documentacion"
            />
          </Button>
          <Button
            variant="gradient"
            color="blue"
            onClick={() => setOpenAnswer(true)}
          >
            Responder
          </Button>
        </DialogFooter>
        <FileUpload
          open={openFU}
          setOpen={setOpenFU}
          title="Cargar Documentacion"
          getValues={getValues}
          setValue={setValue}
        />
        <InterventionResponse
          open={openAnswer}
          setOpen={setOpenAnswer}
          to={to}
          userName={username}
        />
      </form>
    </Dialog>
  );
}
