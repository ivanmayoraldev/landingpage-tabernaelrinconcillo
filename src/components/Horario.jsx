import { useState, useEffect } from "react";

const schedule = {
  0: { day: "Domingo", open: "07:00", close: "22:00" },
  1: { day: "Lunes", open: "07:00", close: "22:00" },
  2: { day: "Martes", open: "07:00", close: "22:00" },
  3: { day: "Miércoles", open: null, close: null },
  4: { day: "Jueves", open: "07:00", close: "22:00" },
  5: { day: "Viernes", open: "07:00", close: "23:55" },
  6: { day: "Sábado", open: "07:00", close: "23:55" },
};

function parseTime(str) {
  const [h, m] = str.split(":").map(Number);
  return { h, m };
}

function RestaurantStatus() {
  const [status, setStatus] = useState("");
  const [info, setInfo] = useState("");
  const [nextOpen, setNextOpen] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dayIndex = new Date().getDay();

  useEffect(() => {
    const now = new Date();
    const today = schedule[dayIndex];
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    if (!today.open) {
      setStatus("Cerrado");
      findNextOpenDay(dayIndex);
      return;
    }

    const { h: openH, m: openM } = parseTime(today.open);
    const { h: closeH, m: closeM } = parseTime(today.close);
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    if (currentMinutes < openMinutes) {
      if (openMinutes - currentMinutes <= 60) {
        setStatus("Abre Pronto");
        setInfo(`Abre a las ${today.open}`);
      } else {
        setStatus("Cerrado Ahora");
        setInfo(`${today.day}: ${today.open} - ${today.close}`);
      }
    } else if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      if (closeMinutes - currentMinutes <= 60) {
        const minutesLeft = closeMinutes - currentMinutes;
        const unidad = minutesLeft === 1 ? "minuto" : "minutos";
        setStatus("Cierra Pronto");
        setInfo(`Cierra en ${minutesLeft} ${unidad}`);
      } else {
        setStatus("Abierto Ahora");
        setInfo(`${today.open} - ${today.close}`);
      }
    } else {
      setStatus("Cerrado Ahora");
      findNextOpenDay(dayIndex);
    }
  }, []);

  const findNextOpenDay = (startDay) => {
    for (let i = 1; i <= 7; i++) {
      const nextIndex = (startDay + i) % 7;
      const dayData = schedule[nextIndex];
      if (dayData.open) {
        setNextOpen(`${dayData.day}: ${dayData.open} - ${dayData.close}`);
        break;
      }
    }
  };

  const orderedDays = [1, 2, 3, 4, 5, 6, 0];

  return (
    <>
      <div
        className="p-4 h-auto mx-auto rounded-b-lg border bg-black text-center space-y-2 w-full max-w-6xl flex flex-col justify-around cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div
          className={`text-4xl font-bold ${
            status === "Cerrado Ahora"
              ? "text-red-500"
              : status === "Cierra Pronto"
              ? "text-[#FF4949]"
              : status === "Abre Pronto"
              ? "text-[#F0F781]"
              : "text-[#EEFF00]"
          }`}
        >
          {status}
        </div>

        <div className="text-3xl text-white font-bold">{info}</div>
        {status === "Cerrado Ahora" && nextOpen && (
          <div className="text-2xl font-bold text-white">
            Próxima apertura: {nextOpen}
          </div>
        )}
      </div>

      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white text-black p-6 rounded-xl w-80 max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-center">Horario de apertura</h2>
            <ul className="space-y-2">
              {orderedDays.map((i) => {
                const { day, open, close } = schedule[i];
                const isToday = i === dayIndex;
                return (
                  <li
                    key={i}
                    className={`flex justify-between ${
                      isToday ? "font-bold text-[#222]" : "text-gray-700"
                    }`}
                  >
                    <span>{day}</span>
                    <span>{open ? `${open} - ${close}` : "Cerrado"}</span>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default RestaurantStatus;
