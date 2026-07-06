import { useState } from "react";
import { Perks } from "./Perks";

export const NewPlace = () => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [photos, setPhotos] = useState("");
  const [description, setDescription] = useState("");
  const [extras, setExtras] = useState("");
  const [price, setPrice] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 px-8">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="ml-2 text-2xl font-bold">
          Titulo
        </label>
        <input
          id="title"
          type="text"
          placeholder="Digite o título do seu anúncio"
          className="rounded-full border border-gray-300 px-4 py-2"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="ml-2 text-2xl font-bold">
          Cidade e País
        </label>
        <input
          id="city"
          type="text"
          placeholder="Digite a cidade e país do seu anúncio"
          className="rounded-full border border-gray-300 px-4 py-2"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="photos" className="ml-2 text-2xl font-bold">
          Fotos
        </label>
        <div className="flex gap-2">
          <input
            id="photos"
            type="text"
            placeholder="Adicione uma foto pelo link dela"
            className="grow rounded-full border border-gray-300 px-4 py-2"
            value={photos}
            onChange={(e) => {
              setPhotos(e.target.value);
            }}
          />
          <button className="cursor-pointer rounded-full border border-gray-300 bg-gray-100 px-4 py-2 transition hover:bg-gray-300">
            Enviar foto
          </button>
        </div>

        <div className="mt-2 grid grid-cols-5 gap-4">
          <label
            htmlFor="file"
            className="flex aspect-square cursor-pointer items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-gray-100"
          >
            <input type="file" id="file" className="hidden" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="ml-2 text-2xl font-bold">
          Descrição
        </label>
        <textarea
          id="description"
          placeholder="Digite a descrição do seu anúncio"
          className="h-56 resize-none rounded-2xl border border-gray-300 px-4 py-2"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="perks" className="ml-2 text-2xl font-bold">
          Comodidades
        </label>

        <Perks />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="extras" className="ml-2 text-2xl font-bold">
          Informações Extras
        </label>
        <textarea
          id="extras"
          placeholder="Coloque aqui qualquer tipo de informações extras sobre seu anúncio"
          className="h-56 resize-none rounded-2xl border border-gray-300 px-4 py-2"
          value={extras}
          onChange={(e) => {
            setExtras(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="ml-2 text-2xl font-bold">Restrições e Preços</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="ml-2 text-xl font-bold">Preço</label>
            <input
              id="price"
              type="number"
              placeholder="0.00"
              className="rounded-full border border-gray-300 px-4 py-2"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="checkin" className="ml-2 text-xl font-bold">Checkin</label>
            <input
              id="checkin"
              type="text"
              placeholder="Ex: 16:00"
              className="rounded-full border border-gray-300 px-4 py-2"
              value={checkin}
              onChange={(e) => {
                setCheckin(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="checkout" className="ml-2 text-xl font-bold">Checkout</label>
            <input
              id="checkout"
              type="text"
              placeholder="Ex: 12:00"
              className="rounded-full border border-gray-300 px-4 py-2"
              value={checkout}
              onChange={(e) => {
                setCheckout(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="guests" className="ml-2 text-xl font-bold">N° Convidados</label>
            <input
              id="guests"
              type="text"
              placeholder="Ex: 4"
              className="rounded-full border border-gray-300 px-4 py-2"
              value={guests}
              onChange={(e) => {
                setGuests(e.target.value);
              }}
            />
          </div>

        </div>
      </div>

      <button className="bg-primary-400 hover:bg-primary-500 min-w-44 cursor-pointer rounded-full px-4 py-3 font-bold text-white transition text-center mb-3">Salvar Informações</button>
    </form>
  );
};
