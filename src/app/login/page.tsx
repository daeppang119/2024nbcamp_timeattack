"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Spacer } from "@nextui-org/react";

export default function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const router = useRouter();

  const handlerSinupBtn = () => {
    router.push("/sinup");
  };

  return (
    <div className="w-[350px]">
      <h3 className="text-2xl font-bold text-center">로그인</h3>
      <Spacer y={8} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input
          type="text"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          variant="bordered"
          label="로그인"
          isInvalid={false}
          placeholder="이메일 주소를 입력해주세요."
          // errorMessage="등록된 이메일이 없습니다."
          required
        />
        <Spacer y={4} />
        <Input
          type="current-password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          variant="bordered"
          label="비밀번호"
          isInvalid={false}
          placeholder="비밀번호를 입력해주세요."
          // errorMessage="등록된 이메일이 없습니다."
          required
        />
        <Spacer y={2} />
        <p className="text-sm text-right text-blue-950">
          비밀번호를 잊으셨나요?
        </p>
        <Spacer y={8} />
        <Button className="w-full p-[1.5rem]" color="primary" variant="solid">
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
