/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Form from "next/form";
import { useActionState, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiAlertFill } from "react-icons/ri";
import registerAction from './registerAction';

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, null);
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const isFormEmpty = !formValues.name || !formValues.email || !formValues.password;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

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
      <Form action={formAction} className='space-y-2'>
        <div>
          <Label>Nome</Label>
          <Input
            type="text"
            name="name"
            placeholder="Digite seu nome completo"
            value={formValues.name}
            onChange={handleInputChange} />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Digite seu endereço de e-mail"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative">
          <Label>Senha</Label>
          <div className='group'>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Crie uma senha segura"
              value={formValues.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-8 opacity-30 group-focus-within:opacity-100"
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
          <Button disabled={isFormEmpty || isPending} className="w-full mt-6" type="submit">
            Registrar
          </Button>
        </div>
      </Form>
    </>
  )
}