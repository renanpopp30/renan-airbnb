import { useEffect, useState } from "react";
import { Perks } from "./Perks";
import { useUserContext } from "../contexts/UserContext.jsx";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import PhotoUploader from "./PhotoUploader.jsx";

export const NewPlace = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [photos, setPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [description, setDescription] = useState("");
  const [extras, setExtras] = useState("");
  const [price, setPrice] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (id) {
      const axiosGet = async () => {
        const { data } = await axios.get(`/places/${id}`);
        setTitle(data.title);
        setCity(data.city);
        setPhotos(data.photos);
        setPerks(data.perks);
        setDescription(data.description);
        setExtras(data.extras);
        setPrice(data.price);
        setCheckin(data.checkin);
        setCheckout(data.checkout);
        setGuests(data.guests);
      };
      axiosGet();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      title &&
      city &&
      // photos.length > 0 &&
      description &&
      price &&
      checkin &&
      checkout &&
      guests
    ) {
      if (id) {
        try {
          const modifiedPlace = await axios.put(`/places/${id}`, {
            title,
            city,
            photos,
            description,
            extras,
            perks,
            price,
            checkin,
            checkout,
            guests,
          });
          alert("Alteração salva na com sucesso na Acomodção!");
        } catch (error) {
          console.error(JSON.stringify(error));
          alert("Erro ao alterar Acomodção");
        }
      } else {
        try {
          const newPlace = await axios.post("/places", {
            owner: user._id,
            title,
            city,
            photos,
            description,
            extras,
            perks,
            price,
            checkin,
            checkout,
            guests,
          });
          alert("Nova Acomodção criada com sucesso!");
          // console.log("Criou novo place", newPlace)
        } catch (error) {
          console.error(JSON.stringify(error));
          alert("Erro ao criar uma nova Acomodção");
        }
      }

      setRedirect(true);
    } else {
      alert("Preencha todas as informações necessarias para enviar");
    }
  };

  if (redirect) return <Navigate to="/account/places" />;

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

      <PhotoUploader {...{ photoLink, setPhotoLink, setPhotos, photos }} />

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

        <Perks {...{ perks, setPerks }} />
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
            <label htmlFor="price" className="ml-2 text-xl font-bold">
              Preço
            </label>
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
            <label htmlFor="checkin" className="ml-2 text-xl font-bold">
              Checkin
            </label>
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
            <label htmlFor="checkout" className="ml-2 text-xl font-bold">
              Checkout
            </label>
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
            <label htmlFor="guests" className="ml-2 text-xl font-bold">
              N° Convidados
            </label>
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

      <button className="bg-primary-400 hover:bg-primary-500 mb-3 min-w-44 cursor-pointer rounded-full px-4 py-3 text-center font-bold text-white transition">
        Salvar Informações
      </button>
    </form>
  );
};
