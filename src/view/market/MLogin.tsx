import React from "react";
import RHFForm from "../../components/RHF/RHFForm";
import RHFInput from "../../components/RHF/RHFInput";
import RHFSubmit from "../../components/RHF/RHFSubmit";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required("아이디를 입력해주세요"),
  password: yup.string().required("비밀번호를 입력해주세요"),
});

function MLogin(props: any) {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const handlers = {
    onSubmit: (data: FormData) => {},
  };
  return (
    <div className={"flex flex-col justify-center items-center h-full w-full"}>
      <RHFForm
        className={
          "flex flex-col gap-2 items-center justify-center shadow-xl p-12 rounded-lg bg-sky-50"
        }
        methods={methods}
        onSubmit={handlers.onSubmit}
      >
        <div className={"text-xl"}>스토어 관리자</div>
        <RHFInput name={"username"} label={"아이디"} />
        <RHFInput name={"password"} label={"비밀번호"} type={"password"} />
        <RHFSubmit label={"로그인"} />
      </RHFForm>
    </div>
  );
}

export default MLogin;
