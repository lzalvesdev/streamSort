'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "next/form";
import { useActionState, useState } from "react";
import { RiAlertFill } from "react-icons/ri";
import loginAction from "./loginAction";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {state?.success === false && (
        <div
          className="text-xs bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role='alert'
        >
          <strong className="font-bold inline-flex items-center">
            <RiAlertFill className="mr-2" /> Erro!
          </strong>
          <br />
          <span className='block mt-2 sm:inline'>{state?.message}</span>
        </div>
      )}
      <Form action={formAction}>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" placeholder="eu@exemplo.com" />
        </div>
        <div className="relative">
          <Label>Senha</Label>
          <div className='group'>
            <Input
              type={showPassword ? "text" : "password"} // Condicionando o tipo do input
              name="password"
              placeholder="********"
            />
            <button
              type="button"
              className="absolute right-2 top-8 opacity-30 group-focus-within:opacity-100"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={25} />
              ) : (
                <AiOutlineEye size={25} />
              )}
            </button>
          </div>
        </div>
        <div>
          <Button disabled={isPending} className="w-full mt-6" type="submit">
            Login
          </Button>
        </div>
      </Form>
      {/* 
      <div className="flex items-center my-4">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-sm text-gray-500">ou</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      <Button
        className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded transition-all"
        onClick={() => signIn('google')}
      >
        <FcGoogle className="mr-2 text-lg" />
      </Button> */}
    </>
  );
}
