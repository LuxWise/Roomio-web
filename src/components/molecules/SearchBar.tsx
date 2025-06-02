import React, { useEffect, useRef, useState } from "react";
import BoxButton from "../atoms/BoxButton";
import { ArrowRightToLine, MapIcon } from "lucide-react";
import useTheme from "@/hooks/useTheme";
import { RangeCalendar } from "@heroui/calendar";
import CardSelect from "../atoms/CardSelect";
import { DateValue } from "@react-types/calendar";

// Tipado para las opciones de selección
interface SelectOption {
  title: string;
  text: string;
  action?: () => void;
}

const SearchBar = () => {
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null); // 🆕

  const [selectedRange, setSelectedRange] = useState<{
    start: DateValue | null;
    end: DateValue | null;
  }>({
    start: null,
    end: null,
  });

  const isLight = useTheme(state => state.theme);

  const handleCanlendar = () => {
    setCalendarOpen(prev => !prev);
  };

  const handleRangeChange = (range: {
    start: DateValue | null;
    end: DateValue | null;
  }) => {
    setSelectedRange({
      start: range.start,
      end: range.end,
    });
  };

  const selectOptions: SelectOption[] = [
    { title: "Destino", text: "Seleccionar destino" },
    {
      title: "Llegada",
      text: selectedRange.start
        ? selectedRange.start.toDate("America/Bogota").toLocaleDateString()
        : "Fecha de llegada",
      action: () => setCalendarOpen(true),
    },
    {
      title: "Salida",
      text: selectedRange.end
        ? selectedRange.end.toDate("America/Bogota").toLocaleDateString()
        : "Fecha de salida",
      action: () => setCalendarOpen(true),
    },
  ];

  const bgTheme = isLight ? "bg-white" : "bg-[#587aff]";
  const shadowTheme = isLight ? "shadow-search" : "";

  const selectedAction = (idx: number, action?: () => void) => {
    setSelectedIdx(idx);
    if (action) action();
  };

  // Cerrar calendario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setCalendarOpen(false);
      }
    };

    if (calendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarOpen]);

  return (
    <div className="flex gap-x-6 relative">
      <div
        className={`grid grid-cols-3 grid-rows-1 gap-5 px-12 py-2 justify-center items-center min-w-96 rounded-full ${bgTheme} ${shadowTheme}`}
      >
        {selectOptions.map((option, idx) => (
          <CardSelect
            key={option.title}
            title={option.title}
            text={option.text}
            textColor={isLight ? "black" : "white"}
            boderColor={isLight ? "black" : "white"}
            select={selectedIdx === idx}
            onClick={() => selectedAction(idx, option.action)}
          />
        ))}
      </div>
      <div className="flex gap-x-3 items-center">
        <BoxButton
          icon={MapIcon}
          bgColor={isLight ? "white" : "blue"}
          color={isLight ? "black" : "white"}
          shadow="blue"
          onClick={handleCanlendar}
        />
        <BoxButton
          icon={ArrowRightToLine}
          bgColor={isLight ? "blue" : "white"}
          color={isLight ? "white" : "black"}
        />
      </div>
      {calendarOpen && (
        <div ref={calendarRef} className="absolute top-25 z-20">
          <RangeCalendar
            visibleMonths={2}
            className="shadow-lg shadow-sky-500"
            color="primary"
            aria-atomic="true"
            classNames={{
              header: !isLight && "bg-[#587aff] rounded-lg",
              title: isLight ? "text-[#587aff] text-lg" : "text-white text-lg",
              content: !isLight && "bg-[#1d4aaa]",
              cellButton: !isLight && " text-white ",
              gridHeaderCell: isLight ? "text-[#181c25]" : "text-black",
            }}
            onChange={date => handleRangeChange(date)}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
