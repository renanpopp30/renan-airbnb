import React from "react";

const Item = ({ place }) => {
  return (
    <a href="/" className="flex flex-col gap-2">
        {/* http://localhost:3000/uploads/a90731aa-9a50-413d-bb4f-40cc4e869366-1741466753784.jpg */}
      <img src={place.photos[0]}
      alt="Imagem da Acomodação" className="aspect-square object-cover rounded-2xl"/>
      <div>
        <h3 className="text-xl font-semibold">{place.city}</h3>
        <p className="truncate text-gray-600">{place.description}</p>
      </div>
      <p>
        <span className="font-semibold">R$ {place.price}</span> por noite
      </p>
    </a>
  );
};

export default Item;
