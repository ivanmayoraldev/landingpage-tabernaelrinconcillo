import React from "react";

const Postres = () => {
  return (
    <div className="flex gap-4 animate-slide-x mt-3 mb-10">
        {[...Array(10)].map((_, i) => (
          <img
            key={i}
            className="rounded-xl h-[246px] w-auto flex-shrink-0 hover:scale-105 transition-transform"
            src={`../../src/assets/Images/postre${(i % 5) + 1}.png`}
            alt={`Comida ${i + 1}`}
          />
        ))}

        {[...Array(10)].map((_, i) => (
          <img
            key={`repeat-${i}`}
            className="rounded-xl h-[246px] w-auto flex-shrink-0 hover:scale-105 transition-transform"
            src={`../../src/assets/Images/postre${(i % 5) + 1}.png`}
            alt={`Comida repeat ${i + 1}`}
          />
        ))}
    </div>
  );
};

export default Postres;