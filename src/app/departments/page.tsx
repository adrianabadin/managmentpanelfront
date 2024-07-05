"use client";

import { useState } from "react";
import Gestion from "./components/Gestion";
import Practicas from "./components/Practicas";
import Cronicos from "./components/Cronicos";
import { Button } from "@material-tailwind/react";
import AsignDepartment from "./config/components/AsignDepartment";
import Protesis from "./components/Protesis";
import { useGetUsersQuery } from "../ReduxGlobals/Features/apiSlice";
import { useAppSelector } from "../ReduxGlobals/store";
import Item from "./components/MenuItem";
import Gc from "./components/Gc";
import Programa from "./components/gc/Basico";

export default function Departments() {
  const auth = useAppSelector((state) => state.auth);
  const [choice, setChoice] = useState<string>("");
  const { Departments } = auth;
  console.log(auth, "ASignados");
  return (
    <>
      <main className="grid grid-cols-12 bg-gray-200  min-h-screen  flex-col  ">
        <nav className="col-span-3  bg-gray-300 w-full flex flex-col">
          {Departments?.map((item) => {
            return (
              <Button
                key={item.id}
                variant="gradient"
                color="white"
                className="m-2 justify-center px-2  hover:bg-blue-200 hover:text-white hover:outline-dashed hover:outline-1"
                onClick={() => setChoice(item.name)}
              >
                {item.name}
              </Button>
            );
          })}
          {/*<Item name="gestion" setChoice={setChoice} />
           <Button
            variant="gradient"
            color="white"
            className="m-2 justify-center px-2  hover:bg-blue-200 hover:text-white hover:outline-dashed hover:outline-1"
            onClick={() => setChoice("cronicos")}
          >
            Cronicos y alto costo
          </Button>
          <Button
            variant="gradient"
            color="white"
            className="m-2 justify-center px-2  hover:bg-blue-200 hover:text-white hover:outline-dashed hover:outline-1"
            onClick={() => setChoice("protesis")}
          >
            Protesis
          </Button>
          <Button
            variant="gradient"
            color="white"
            className="m-2 justify-center px-2  hover:bg-blue-200 hover:text-white hover:outline-dashed hover:outline-1 "
            onClick={() => setChoice("practicas")}
          >
            Practicas
          </Button> */}
          <Button
            variant="gradient"
            color="white"
            className="m-2 justify-center px-2  hover:bg-blue-200 hover:text-white hover:outline-dashed hover:outline-1 "
            onClick={() => setChoice("gc")}
          >
            Gestion Ciudadana
          </Button>
        </nav>
        <div className="col-span-9  w-full items-center mx-auto  flex flex-col">
          {choice === "gc" ? (
            <Gc />
          ) : choice !== "" ? (
            <Programa department={choice} />
          ) : null}
        </div>
      </main>
    </>
  );
}
