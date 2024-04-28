"use client";
import {
  apiSlice,
  useAddServiceMutation,
  useDropAdminMutation,
  useGetDepartmentsQuery,
  useGetUsersQuery,
  useLinkDepartmentMutation,
  useSetAdminMutation,
} from "@/app/ReduxGlobals/Features/apiSlice";
import {
  Button,
  Checkbox,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import Card, {
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react/components/Card";
import { useForm } from "react-hook-form";

export default function AsignDepartment() {
  const { data, isFetching } = useGetUsersQuery(undefined);
  console.log(data, "Asigns Department");
  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        data?.map((item) => (
          <UserCard
            isAdmin={item.isAdmin !== undefined ? item.isAdmin : false}
            name={item.name}
            lastname={item.lastname}
            id={item.id}
            key={item.id}
            departments={item.Departments}
          />
        ))
      )}
    </>
  );
}

function UserCard({
  name,
  lastname,
  isAdmin,
  id,
  departments,
}: {
  name: string;
  lastname: string;
  isAdmin: boolean;
  id: string;
  departments: { name: string; id: string }[] | undefined;
}) {
  const [linkDepartment, { isLoading }] = useAddServiceMutation();
  const { register, handleSubmit } = useForm<{ name: string }>();
  const { data, isFetching } = useGetDepartmentsQuery(undefined);
  const onSubmit = (dataParam: any) => {
    console.log(dataParam, "submited", id);
    let stringData: string[] = [];
    Object.keys(dataParam).forEach((key) => {
      console.log(key);
      if (dataParam[key]) stringData.push(key);
    });
    console.log(stringData);
    linkDepartment({ id, data: { name: stringData } })
      .then((res) => console.log(res, "ok"))
      .catch((e) => console.log(e));
  };
  console.log(data, "getDepartmentss");
  return (
    <>
      <Card className="mt-6 w-3/5">
        <CardBody className="flex flex-col justify-center items-center">
          <Typography variant="h3">{`${name} ${lastname}`}</Typography>
          <Typography
            variant="h5"
            color="light-blue"
            className="font-bold text-left"
          >
            Programas
          </Typography>
          <div className="grid grid-cols-3">
            {isFetching ? (
              <Spinner />
            ) : data !== undefined ? (
              data?.map((program) => (
                <Checkbox
                  {...register(program.name as any)}
                  label={program.name}
                  name={program.name}
                  key={program.id}
                  className="col-span-1"
                  defaultChecked={
                    departments?.find(
                      (department) => department.name === program.name
                    ) !== undefined
                      ? true
                      : undefined
                  }
                />
              ))
            ) : null}
          </div>
        </CardBody>
        <CardFooter className="flex flex-row justify-end">
          <Button
            variant="gradient"
            color="blue"
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? <Spinner className="self-center" /> : "Actualizar"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
