"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/src/firebase/firebaseConfig";
import Loading from "@/src/componentsAdmin/Loading";
import { buscarUsuario } from "@/src/services/usuarioService";
import { useAuthRedirectAdmin } from "@/src/hoohsAdmin/useAuthRedirectAdmin";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { loading } = useAuthRedirectAdmin();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const camposValidos = () => {
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Digite um e-mail válido.");
      return false;
    }
    if (senha.length < 5) {
      toast.error("Senha deve ter pelo menos 5 caracteres.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!camposValidos()) return;
    setLoadingSubmit(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, senha);

      if (result.user.uid) {
        router.push("/admin");
      } else {
        toast.error("Usuario não encontrado");
      }
    } catch (e) {
      console.error(e);
      toast.error("Erro ao fazer login. Verifique os dados.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] px-4 relative overflow-hidden">
      {/* Glow vermelho no fundo */}
      <div className="absolute w-[500px] h-[500px] bg-red-600/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-yellow-500/10 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-10">
          {/* Logo / Nome */}
          <h1 className="text-3xl font-extrabold text-center mb-1">
            <span className="text-white">ITA</span>{" "}
            <span className="text-red-500">Sushi?</span> <br />
            <span className="text-red-500">Bar</span>
          </h1>

          <p className="text-center text-gray-400 mb-8 text-sm">
            Painel administrativo
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full rounded-xl border border-white/10 
              bg-white/5 text-white placeholder-gray-500
              px-4 py-3 focus:ring-2 focus:ring-red-500 
              focus:border-red-500 transition outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Senha
              </label>
              <input
                id="senha"
                type="password"
                className="mt-1 block w-full rounded-xl border border-white/10 
              bg-white/5 text-white placeholder-gray-500
              px-4 py-3 focus:ring-2 focus:ring-red-500 
              focus:border-red-500 transition outline-none"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 
            text-white font-semibold py-3 rounded-xl 
            transition-all duration-300 shadow-lg 
            shadow-red-600/30 hover:scale-[1.02]"
            >
              Entrar no Painel
            </button>
          </form>

          {/* Loading submit */}
          {loadingSubmit && <Loading />}
        </div>
      </div>
    </div>
  );
}
