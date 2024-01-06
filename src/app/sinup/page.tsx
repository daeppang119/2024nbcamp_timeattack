"use client";

import { Button, Input, Spacer } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type ResponseDataType = {
  success: boolean;
  message: string;
};

export default function SinupPage() {
  const [signupNickName, setSignupNickName] = useState("");
  const [signupId, setSignupId] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordCheck, setSignupPasswordCheck] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState<boolean>(false);
  const [errorMessageFromServer, setErrorMessageFromServer] =
    useState<string>("");

  const [isNickNameInvalid, setIsNickNameInvalid] = useState(true);
  const [isEmailInvalid, setIsEmailInvalid] = useState(true);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(true);

  const router = useRouter();

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickName = e.target.value;

    setIsNickNameInvalid(newNickName.length < 3);
    setSignupNickName(newNickName);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;

    setIsEmailInvalid(!newEmail.includes("@") || !newEmail.includes("."));
    setSignupId(newEmail);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;

    setIsPasswordInvalid(newPassword.length < 4);
    setSignupPassword(newPassword);
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (signupPassword !== signupPasswordCheck) {
      setPasswordMatchError(true);
      return;
    }

    setPasswordMatchError(false);

    try {
      const response = await axios.post<ResponseDataType>(
        "https://moneyfulpublicpolicy.co.kr/register",
        {
          id: signupId,
          password: signupPassword,
          nickname: signupNickName,
        }
      );

      console.log(response.data);
    } catch (error: any) {
      console.error("에러:", error.response?.data);

      setErrorMessageFromServer(error.response?.data?.message || "");
    }

    setSignupId("");
    setSignupPassword("");
    setSignupNickName("");
  };

  const handlerLoginBtn = () => {
    router.push("/login");
  };

  return (
    <div className="w-[350px]">
      <h3 className="text-2xl font-bold text-center">회원가입</h3>
      <Spacer y={8} />
      <form onSubmit={handleSignupSubmit}>
        <Input
          type="text"
          value={signupNickName}
          onChange={handleNickNameChange}
          variant="bordered"
          label="닉네임"
          isInvalid={isNickNameInvalid}
          placeholder="닉네임을 입력해주세요."
          errorMessage={isNickNameInvalid ? "닉네임 3자 이상 입력해주세요" : ""}
        />

        <Spacer y={4} />

        <Input
          type="email"
          value={signupId}
          onChange={handleEmailChange}
          variant="bordered"
          label="아이디"
          isInvalid={isEmailInvalid}
          placeholder="이메일 주소를 입력해주세요."
          errorMessage={
            isEmailInvalid ? "올바른 이메일 주소를 입력해주세요" : ""
          }
        />

        <Spacer y={4} />

        <Input
          type="password"
          value={signupPassword}
          onChange={handlePasswordChange}
          variant="bordered"
          label="비밀번호"
          isInvalid={isPasswordInvalid}
          placeholder="비밀번호를 입력해주세요."
          errorMessage={
            isPasswordInvalid ? "4자 이상의 비밀번호를 입력해주세요" : ""
          }
        />

        <Spacer y={4} />

        <Input
          type="password"
          value={signupPasswordCheck}
          onChange={(e) => setSignupPasswordCheck(e.target.value)}
          variant="bordered"
          label="비밀번호 확인"
          isInvalid={passwordMatchError}
          placeholder="비밀번호를 다시 입력해주세요."
          errorMessage={
            passwordMatchError ? "비밀번호가 일치하지 않습니다." : ""
          }
        />

        <Spacer y={8} />
        <Button
          type="submit"
          className="w-full p-[1.5rem]"
          color="primary"
          variant="solid"
        >
          다음
        </Button>
      </form>
      <Spacer y={8} />
      <p className="text-gray-400 text-sm text-center">
        이미 계정이 있으신가요?{" "}
        <span
          onClick={handlerLoginBtn}
          className="text-blue-950 cursor-pointer"
        >
          로그인
        </span>
      </p>
    </div>
  );
}
