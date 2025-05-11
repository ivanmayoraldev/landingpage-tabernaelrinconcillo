import React from "react";

const Comidas = () => {
  return (
    <div className="mt-3 mb-10 mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-4">
      {[...Array(4)].map((_, i) => (
        <a
          key={i}
          href="https://carta.avocaty.io/taberna-el-rinconcillo/B6Rg8UHgByYUchsfDwQE"
          className="relative group"
          target="_blank"
        >
          <img
            className="rounded-xl transition-all duration-300 group-hover:scale-105 h-[246px] w-full object-cover"
            src={`Images/desayuno${(i % 4) + 1}.png`}
            alt={`Desayuno ${i + 1}`}
          />
        </a>
      ))}
      
      {[...Array(4)].map((_, i) => (
        <a
          key={i}
          href="https://carta.avocaty.io/taberna-el-rinconcillo/FenbgaRZJeYkpjtBdlD1"
          className="relative group"
          target="_blank"
        >
          <img
            className="rounded-xl transition-all duration-300 group-hover:scale-105 h-[246px] w-full object-cover"
            src={`Images/comida${(i % 4) + 1}.png`}
            alt={`Comida ${i + 1}`}
          />
        </a>
      ))}

      {[...Array(4)].map((_, i) => (
          <img
            key={i}
            className="relative group rounded-xl transition-all duration-300 group-hover:scale-105 h-[246px] w-full object-cover"
            src={`Images/postre${(i % 4) + 1}.png`}
            alt={`Postre ${i + 1}`}
          />
      ))}
    </div>
  );
};

export default Comidas;
