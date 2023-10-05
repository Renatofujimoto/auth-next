"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      console.log("[LOGIN_RESPONSE]: ", response);

      if (!response?.error) {
        router.refresh();
        router.push("/private");
      } else {
        setError("Email ou senha inválidos");
      }
    } catch (error) {
      console.log("[LOGIN_ERROR]: ", error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-800">
      <form className="p-10 border rounded-lg w-96" onSubmit={handleLogin}>
        <h1 className="text-3xl font-bold mb-4 text-center text-slate-200">
          Login
        </h1>
        <p className="text-sm text-slate-300 text-center mb-10">
          Faça login para continuar.
        </p>
        <div className="flex flex-col">
          <div className="flex flex-col gap-1 mb-6">
            <label htmlFor="email" className="text-slate-300">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full p-3"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6">
            <label htmlFor="password" className="text-slate-300">
              Senha
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full p-3"
            />
          </div>
          {error && (
            <span className="text-red-400 text-sm block mt-2">{error}</span>
          )}
          <button
            type="submit"
            className="mt-10 bg-blue-600 text-slate-50 p-3 rounded"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export { LoginForm };
