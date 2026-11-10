"use client";
import Image from "next/image";
import LckrLogo from "@/public/lckr-logo.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mensagemDeErro } from "@/lib/api";
import { login } from "@/services/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function entrar(evento: React.FormEvent) {
    evento.preventDefault();
    setErro("");
    try {
      const usuario = await login(email, senha);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      router.replace("/");
    } catch (e) {
      setErro(mensagemDeErro(e));
    }
  }

  return (
    <div className="bg-gray-custom w-screen h-screen">
      <form onSubmit={entrar} className="bg-white flex w-[400px] h-[500px] rounded-lg flex-col gap-4 m-auto shadow-lg my-32 p-8">
        <Image src={LckrLogo} width={50} height={50} alt="LCKR Logo" className="rounded-md" />
        <h1 className="text-xl font-bold">Entrar</h1>
        <p className="text-sm text-gray-500 -mt-4">Acesse o painel da LCKR Club.</p>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="secretaria@lckrclub.com.br" className="-mt-3 border border-gray-custom rounded-lg p-2" />
        <label htmlFor="senha">Senha</label>
        <input id="senha" type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="*********" className="-mt-3 border border-gray-custom rounded-lg p-2" />
        {erro && <p className="text-sm text-red-600">{erro}</p>}
        <button type="submit" className="bg-green-logo text-black font-semibold rounded-lg hover:bg-green-logo/90 hover:cursor-pointer p-2 mt-4">Entrar</button>
        <hr className="text-gray-200 mt-4" />
      </form>
    </div>
  );
}
