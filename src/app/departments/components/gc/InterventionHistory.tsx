import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Spinner,
  Typography,
} from "@material-tailwind/react";

import picture from "@/icons/picture.svg";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import close from "@/icons/close.svg";
import { DocumentationView } from "./DocumentationView";
import {
  GetInterventions,
  useGetInterventionsQuery,
} from "@/app/ReduxGlobals/Features/apiSlice";
function InterventionHistory({
  id,
  isOpen,
  setOpen,
}: {
  id: string;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { data, isFetching } = useGetInterventionsQuery(id);
  return (
    <Dialog
      open={isOpen}
      size="xl"
      className="mx-4"
      handler={(prev) => setOpen(!prev)}
    >
      <DialogHeader className="flex justify-between">
        <Typography variant="h2" color="blue">
          Historial de Intervenciones
        </Typography>
        <Button
          variant="filled"
          className="w-fit bg-transparent shadow-none border-none outline-none"
          onClick={() => setOpen(false)}
        >
          <Image src={close} alt="Cerrar" width={32} height={32} />
        </Button>
      </DialogHeader>
      <DialogBody className="w-full">
        {isFetching ? (
          <Spinner />
        ) : data !== undefined ? (
          data.interventions.map((item) => (
            <InterventionRow data={item} key={item.id} />
          ))
        ) : null}
      </DialogBody>
    </Dialog>
  );
}

function InterventionRow({ data }: { data: GetInterventions }) {
  const [open, setOpen] = useState<number>(0);
  const [documentation, setDocumentation] = useState<boolean>(false);
  const handler = (value: number) => {
    if (open === value) return setOpen(0);
    setOpen(value);
    console.log(open);
  };
  return (
    <Accordion open={open === 1} className="w-full">
      <AccordionHeader onClick={() => handler(1)} className="w-full">
        <div className="grid grid-cols-12 justify-around w-full ">
          <Typography
            variant="h5"
            color="blue-gray"
            className="col-span-3"
          >{`Fecha: ${new Date(
            data.createdAt
          ).toLocaleDateString()}`}</Typography>
          <Typography variant="h5" color="blue-gray" className="col-span-3">
            {`Hora: ${new Date(data.createdAt).toLocaleTimeString()}`}
          </Typography>
          <Typography variant="h5" color="blue-gray" className="col-span-6">
            {`Usuario Interviniente: ${
              data.user !== null
                ? data.user.username !== null
                  ? data.user.username
                  : ""
                : ""
            }`}
          </Typography>
        </div>
      </AccordionHeader>
      <AccordionBody className="flex flex-row">
        <div className="flex flex-col w-2/3">
          <Typography variant="h5" color="blue-gray" className="col-span-9">
            {`Descripcion:`}
          </Typography>
          <Typography variant="paragraph" color="black" className="col-span-9">
            {data.text}
          </Typography>
        </div>
        <div className="w-1/3 justify-center flex">
          <Button
            className="bg-transparent w-fit shadow-none justify-center"
            variant="filled"
            onClick={() => setDocumentation((prev) => !prev)}
          >
            <Image
              src={picture}
              alt="Documentacion asociada"
              width={64}
              height={64}
            />
          </Button>
        </div>
      </AccordionBody>
      <DocumentationView
        files={data.files}
        open={documentation}
        setOpen={setDocumentation}
      />
    </Accordion>
  );
}
function Documentation({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog
      handler={() => {
        console.log(open, "texto");
        setOpen((prev) => !prev);
      }}
      open={open}
      size="xl"
    >
      <DialogHeader className="flex justify-between">
        <Typography variant="h3" color="blue">
          Documentacion agregada
        </Typography>
        <Button
          variant="filled"
          className=" bg-transparent shadow-none"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Image src={close} alt="Cerrar" width={32} height={32} />
        </Button>
      </DialogHeader>
    </Dialog>
  );
}
export default InterventionHistory;
