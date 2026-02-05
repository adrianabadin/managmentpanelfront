"use client";
import { useEffect } from "react";
import { Dashboard } from "../components/Dashboard";
import { useAppSelector } from "../ReduxGlobals/store";

export function WorkListPage() {
  const auth = useAppSelector((selec) => selec.auth);
  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return <div>S</div>;
}
export default WorkListPage;
