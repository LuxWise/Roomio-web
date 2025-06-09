import { useState, useRef } from "react";
import { CalendarDays, Check, X } from "lucide-react";
import { RangeCalendar } from "@heroui/calendar";
import BoxButton from "../atoms/BoxButton";
import useTheme from "@/hooks/useTheme";

type CalendarDate = {
  toDate: (tz: string) => Date;
};

export default function ReservationSection({
  onReservationChange, // Devuelve los datos crudos del calendario
}: {
  onReservationChange: (data: {
    startDate: string; // string en formato solicitado
    endDate: string;
    nights: number;
  }) => void;
}) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{
    start: CalendarDate | null;
    end: CalendarDate | null;
  }>({
    start: null,
    end: null,
  });
  const [localTable, setLocalTable] = useState<{
    startDate: Date;
    endDate: Date;
    nights: number;
  } | null>(null);

  const isLight = useTheme(state => state.theme);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleRangeChange = (range: {
    start: CalendarDate | null;
    end: CalendarDate | null;
  }) => {
    setSelectedRange(range);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}T14:00:00`;
  };

  const confirmReservation = () => {
    if (!selectedRange.start || !selectedRange.end) return;

    const start = selectedRange.start.toDate("America/Bogota");
    const end = selectedRange.end.toDate("America/Bogota");
    start.setHours(14, 0, 0, 0);
    end.setHours(14, 0, 0, 0);
    const nights = Math.max(
      Math.ceil((+end - +start) / (1000 * 60 * 60 * 24)),
      0
    );

    onReservationChange({
      startDate: formatDate(start),
      endDate: formatDate(end),
      nights,
    });

    setLocalTable({
      startDate: start,
      endDate: end,
      nights,
    });

    setCalendarOpen(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="flex gap-2 md:gap-x-3 items-center  justify-center mt-2 md:mt-0">
        <BoxButton
          icon={CalendarDays}
          bgColor={isLight ? "white" : "blue"}
          color={isLight ? "black" : "white"}
          shadow="blue"
          onClick={() => setCalendarOpen(prev => !prev)}
        />
      </div>

      {/* Calendario + botones de acción */}
      {calendarOpen && (
        <div
          ref={calendarRef}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/30"
        >
          <div className="bg-white dark:bg-[#232946] p-6 rounded-2xl shadow-xl w-full max-w-xl mx-4 relative">
            <RangeCalendar
              visibleMonths={2}
              color="primary"
              className="shadow-md"
              aria-atomic="true"
              classNames={{
                header: !isLight && "bg-[#587aff] rounded-lg",
                title: isLight
                  ? "text-[#587aff] text-md"
                  : "text-white text-md",
                content: !isLight && "bg-[#4f6ee6]",
                cellButton: !isLight && "text-white",
                gridHeaderCell: isLight ? "text-[#181c25]" : "text-black",
              }}
              onChange={handleRangeChange}
            />

            <div className="flex justify-end gap-4 mt-4">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={confirmReservation}
              >
                <Check size={18} /> Confirmar reserva
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => setCalendarOpen(false)}
              >
                <X size={18} /> Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {localTable && (
        <div className="absolute left-55 top-0 mt-6 bg-white dark:bg-[#2a2a2a] shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <CalendarDays className="w-6 h-6" /> Detalles de la reserva
          </h3>
          <table className="w-full text-left text-base">
            <thead>
              <tr className="bg-blue-50 dark:bg-[#232946]">
                <th className="py-3 px-4 rounded-tl-xl">Entrada</th>
                <th className="py-3 px-4">Salida</th>
                <th className="py-3 px-4 rounded-tr-xl">Noches</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-100 dark:hover:bg-[#1a1a2a] transition">
                <td className="py-3 px-4 font-medium">
                  {localTable.startDate?.toLocaleDateString("es-CO")}
                </td>
                <td className="py-3 px-4 font-medium">
                  {localTable.endDate?.toLocaleDateString("es-CO")}
                </td>
                <td className="py-3 px-4 font-semibold text-center text-blue-600 dark:text-blue-300">
                  {localTable.nights}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
