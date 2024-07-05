"use client";

import TaskManager from "@/app/components/Agenda";
import Agenda from "@/app/components/Agenda";
import { Typography } from "@material-tailwind/react";
import TabBar from "../TabBar";
import Foda from "../Foda";

function Programa({ department }: { department: string }) {
  return (
    <>
      <TabBar
        data={[
          {
            value: "tasks",
            label: "Agenda",
            content: <TaskManager filter={{ department: department }} />,
          },
          {
            value: "foda",
            label: "FODA",
            content: <Foda departmentProp={department} />,
          },
        ]}
      />
    </>
  );
}

export default Programa;
