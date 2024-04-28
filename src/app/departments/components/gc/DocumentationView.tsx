import download from "@/icons/download.svg";
import close from "@/icons/close.svg";

import { GetIssues } from "@/app/ReduxGlobals/Features/apiSlice";
import {
  Dialog,
  DialogHeader,
  Typography,
  Button,
  DialogBody,
} from "@material-tailwind/react";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
export function DocumentationView({
  open,
  setOpen,
  files,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  files: GetIssues["files"];
}) {
  return (
    <Dialog open={open} handler={() => setOpen((prev) => !prev)} size="lg">
      <DialogHeader title="Documentacion Adjunta">
        <div className="flex justify-between w-full align-middle items-center">
          <Typography variant="h3" color="blue">
            Documentacion Adjunta
          </Typography>
          <Button
            variant="filled"
            className="bg-transparent shadow-none border-none outline-none"
            onClick={() => setOpen(false)}
          >
            <Image src={close} alt="Cerrar" width={32} height={32} />
          </Button>
        </div>
      </DialogHeader>
      <DialogBody className="grid grid-cols-3 gap-3 grid-flow-dense">
        {Array.isArray(files) && files.length > 0
          ? files.map((file, index) => {
              const blob = new Blob([Buffer.from(file.data, "base64")]);
              const url = URL.createObjectURL(blob);

              return (
                <article
                  key={file.id}
                  className="relative m-8 flex justify-center"
                >
                  <Image
                    src={url}
                    alt={file.name}
                    width={500}
                    height={100}
                    className="object-contain rounded-lg border-2 border-blue-gray-400 shadow-lg "
                  />
                  <a
                    download={`${file.name}${index}.jpg`}
                    href={url}
                    className="absolute bottom-0 backdrop-opacity-30 bg-gray-100 rounded-full p-1 bg-opacity-80 backdrop-blur-md hover:scale-105"
                  >
                    <Image
                      src={download}
                      alt="Descargar"
                      width={48}
                      height={48}
                      className="opacity-100 "
                    />
                  </a>
                </article>
              );
            })
          : " "}
      </DialogBody>
    </Dialog>
  );
}
