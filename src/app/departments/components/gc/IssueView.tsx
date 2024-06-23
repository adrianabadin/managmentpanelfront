import email from "@/icons/emailadd.svg";
import document from "@/icons/document.svg";
import exit from "@/icons/exit.svg";
import download from "@/icons/download.svg";
import close from "@/icons/close.svg";
import upload from "@/icons/UPLOAD.svg";
import addPhone from "@/icons/addPhone.svg";
import history from "@/icons/history.svg";
import { GetIssues } from "@/app/ReduxGlobals/Features/apiSlice";
import {
  Dialog,
  DialogHeader,
  Typography,
  DialogBody,
  Button,
  DialogFooter,
} from "@material-tailwind/react";
import { Dispatch, SetStateAction, useState } from "react";
import { AddMail } from "./AddMail";
import { AddPhone } from "./AddPhone";
import { DocumentationView } from "./DocumentationView";
import { IssueIntervention } from "./IssueIntervention";
import Image from "next/image";
import InterventionHistory from "./InterventionHistory";
export function IssueView({
  open,
  setOpen,
  issue,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  issue: GetIssues;
}) {
  const [addPhoneOpen, setAddPhoneOpen] = useState<boolean>(false);
  const [addMailOpen, setAddMailOpen] = useState<boolean>(false);
  const [interventionHistory, setOpenHistory] = useState<boolean>(false);
  const [openIntervention, setIssueIntervencionOpen] = useState<boolean>(false);
  const [openDoc, setOpenDoc] = useState<boolean>(false);
  return (
    <Dialog
      open={open}
      handler={() => setOpen((prev) => !prev)}
      size="xl"
      className="mx-4"
    >
      <DialogHeader title="Problema del ciudadano">
        <div className="flex justify-between w-full align-middle items-center">
          <Typography variant="h3" color="blue">
            Problema del ciudadano
          </Typography>
          <Typography
            variant="h5"
            color="white"
            className="bg-pink-400 rounded-2xl p-1 px-3"
          >
            {`${issue.state.state}/${issue.kind.name}`}
          </Typography>
        </div>
      </DialogHeader>
      <DialogBody className="grid grid-cols-10 gap-6 mt-4">
        <div className="flex flex-row align-middle items-center col-span-3 ">
          <Typography
            className="mr-2"
            variant="h5"
            color="blue"
          >{`Nombre: `}</Typography>
          <Typography variant="paragraph" color="blue-gray">
            {`${issue.name.toUpperCase()} ${issue.lastName.toUpperCase()}`}
          </Typography>
        </div>
        <div className="flex flex-row align-middle items-center col-span-2 ">
          <Button
            variant="outlined"
            color="blue"
            onClick={() => setAddPhoneOpen(true)}
            className="rounded-full p-2 m-0 shadow-lg  mr-4 w-fit  outline-none hover:scale-110"
          >
            <Image
              src={addPhone}
              alt="Agregar telefono"
              width={24}
              height={24}
            />
          </Button>
          <Typography variant="paragraph" color="blue-gray">
            {`${issue.phone}\n${issue.phone2}`}
          </Typography>
        </div>
        <div className="flex flex-row align-middle items-center col-span-3 ">
          <Button
            variant="outlined"
            color="blue"
            className="rounded-full p-2 m-0 shadow-lg  mr-4 w-fit  outline-none hover:scale-110"
            onClick={() => setAddMailOpen(true)}
          >
            <Image src={email} alt="Agregar telefono" width={24} height={24} />
          </Button>

          <Typography variant="paragraph" color="blue-gray">
            {`${issue.email}\n${issue.email2}`}
          </Typography>
        </div>

        <div className="flex flex-row align-middle items-center col-span-2 ">
          <Typography
            variant="h5"
            color="blue"
            className="mr-2"
          >{`DNI: `}</Typography>
          <Typography variant="paragraph" color="blue-gray">
            {`${issue.socialSecurityNumber}`}
          </Typography>
        </div>

        <Typography variant="h5" color="blue" className="col-span-10">
          Descripcion:
        </Typography>
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="text-justify w-full min-h-52 col-span-10"
        >
          {issue.description}
        </Typography>
      </DialogBody>
      <DialogFooter className="w-full  flex justify-around align-middle items-center">
        <Button
          variant="gradient"
          color="blue"
          className="w-28 text-center p-0 py-3"
          onClick={() => setIssueIntervencionOpen(true)}
        >
          Intervenir
        </Button>
        <Button
          variant="filled"
          className="w-fit bg-transparent shadow-none border-none outline-none"
          onClick={() => setOpenDoc(true)}
        >
          <Image src={document} alt="Documentacion" width={64} height={64} />
        </Button>
        <Button
          variant="filled"
          className="w-fit bg-transparent shadow-none border-none outline-none"
          onClick={() => setOpenHistory(true)}
        >
          <Image
            src={history}
            alt="Historia de Intervenciones"
            width={64}
            height={64}
          />
        </Button>
        <Button
          variant="filled"
          className="w-fit bg-transparent shadow-none border-none outline-none"
          onClick={() => setOpen(false)}
        >
          <Image
            src={exit}
            alt="Salir"
            className="text-blue-500"
            width={64}
            height={64}
          />
        </Button>

        <Button
          variant="gradient"
          color="blue"
          className="w-28 text-center p-0 py-3 "
          disabled
        >
          Derivar
        </Button>
      </DialogFooter>
      <DocumentationView
        open={openDoc}
        setOpen={setOpenDoc}
        files={issue["files"]}
      />
      <IssueIntervention
        open={openIntervention}
        id={issue.id}
        setOpen={setIssueIntervencionOpen}
        to={`${issue.email}${
          issue.email2 !== undefined ? "," + issue.email2 : ""
        }`}
        username={`${issue.name} ${issue.lastName}`}
      />
      <AddPhone open={addPhoneOpen} setOpen={setAddPhoneOpen} id={issue.id} />
      <AddMail open={addMailOpen} setOpen={setAddMailOpen} id={issue.id} />
      <InterventionHistory
        id={issue.id}
        isOpen={interventionHistory}
        setOpen={setOpenHistory}
      />
    </Dialog>
  );
}
