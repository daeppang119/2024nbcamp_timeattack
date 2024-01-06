"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Spacer } from "@nextui-org/react";
import axios from "axios";

export default function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;

    setIsEmailInvalid(!newEmail.includes("@") || !newEmail.includes("."));
    setLoginId(newEmail);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;

    setIsPasswordInvalid(newPassword.length < 4);
    setLoginPassword(newPassword);
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        {
          id: loginId,
          password: loginPassword,
        }
      );

      console.log(response);

      alert("로그인 완료되었습니다.");
    } catch (error: any) {
      console.error("로그인 요청 중 에러 발생:", error);

      if (error.response) {
        alert("에러: " + JSON.stringify(error.response.data));
      }
    }

    setLoginId("");
    setLoginPassword("");
  };

  const handlerSinupBtn = () => {
    router.push("/sinup");
  };

  return (
    <div className="w-[350px]">
      <h3 className="text-2xl font-bold text-center">로그인</h3>
      <Spacer y={8} />
      <form onSubmit={handleLoginSubmit}>
        <Input
          type="email"
          value={loginId}
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
          value={loginPassword}
          onChange={handlePasswordChange}
          variant="bordered"
          label="비밀번호"
          isInvalid={isPasswordInvalid}
          placeholder="비밀번호를 입력해주세요."
          errorMessage={
            isPasswordInvalid ? "비밀번호는 4자 이상이어야 합니다." : ""
          }
        />

        <Spacer y={2} />
        <p className="text-sm text-right text-blue-950">
          비밀번호를 잊으셨나요?
        </p>
        <Spacer y={8} />

        <Button
          type="submit"
          className="w-full p-[1.5rem]"
          color="primary"
          variant="solid"
        >
          로그인
        </Button>
      </form>
      <Spacer y={8} />
      <p className="text-gray-400 text-sm text-center">
        내일배움캠프 회원이 아니신가요?
        <span
          onClick={handlerSinupBtn}
          className="text-blue-950 cursor-pointer px-[5px]"
        >
          회원가입
        </span>
      </p>
    </div>
  );
}
