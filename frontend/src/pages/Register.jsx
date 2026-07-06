import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";

const Register = () => {
  const { setUser } = useUserContext();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return alert("Preecha Nome, E-mail e Senha");
    }
    try {
      const { data: userDoc } = await axios.post("/users", {
        name,
        email,
        password,
      });
      setUser(userDoc) // se eu quiser que va para a tela de login eu tiro esse setUser e redireciono para o login
      alert("Cadastro Efetuado com sucesso !!");
      setRedirect(true)
    } catch (error) {
      alert(`Erro ao cadastrar: ${JSON.stringify(error)}`);
    }
  };

  if (redirect) return <Navigate to="/" />

  return (
    <section className="flex items-center">
      <div className="mx-auto flex w-full max-w-96 flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Faça seu Cadastro</h1>
        <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
            <input
            type="text"
            className="w-full rounded-full border border-gray-300 px-4 py-2 shadow-md"
            placeholder="Digite seu Nome"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            className="w-full rounded-full border border-gray-300 px-4 py-2 shadow-md"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="w-full rounded-full border border-gray-300 px-4 py-2 shadow-md"
            placeholder="Digite sua Senha"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button className="bg-primary-400 w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 font-bold text-white shadow-lg">
            Cadastrar-se
          </button>
        </form>
        <p>
          Possui tem conta?{" "}
          <Link to="/login" className="font-semibold underline">
            Entre agora
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
