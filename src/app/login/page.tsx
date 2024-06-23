"use client";
import { useRouter } from "next/navigation";
import { useJwtLoginQuery } from "../ReduxGlobals/Features/apiSlice";
import LoginModal from "../components/Login";
import { Spinner } from "@material-tailwind/react";
import { useState } from "react";

function Page() {
  const { isError, isFetching } = useJwtLoginQuery(undefined);
  const [open, setOpen] = useState<boolean>(true);
  const router = useRouter();
  if (isError) {
    return <LoginModal open={open} setOpen={setOpen} />;
  } else
    return isFetching ? (
      <Spinner />
    ) : (
      <div className="text-3xl text-green-500">Ingreso correcto</div>
    );
}

export default Page;
