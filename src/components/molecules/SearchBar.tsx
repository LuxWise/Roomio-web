import React, { useEffect, useRef, useState } from "react";
import BoxButton from "../atoms/BoxButton";
import { ArrowRightToLine, MapIcon } from "lucide-react";
import useTheme from "@/hooks/useTheme";
import { RangeCalendar } from "@heroui/calendar";
import CardSelect from "../atoms/CardSelect";
import { useRouter } from "next/navigation";
import { DateValue } from "@react-types/calendar";
import { useTranslations } from "next-intl";
import Autocomplete from "../atoms/Autocomplete";

interface SelectOption {
  title: string;
  text: string;
  action?: () => void;
}

const SearchBar = () => {
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const calendarRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = useTranslations("SearchBar");

  const [selectedRange, setSelectedRange] = useState<{
    start: DateValue | null;
    end: DateValue | null;
  }>({
    start: null,
    end: null,
  });

  const destinations = [
    "Bogotá",
    "Medellín",
    "Cali",
    "Cartagena",
    "Barranquilla",
  ];

  const isLight = useTheme(state => state.theme);

  const hangleMap = () => {
    router.push("/map");
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

  const handleDestinationSelect = (value: string) => {
    setDestination(value);
    setAutocompleteOpen(false);
  };

  const selectOptions: SelectOption[] = [
    {
      title: t("destiny"),
      text: destination || t("destinySelect"),
      action: () => setAutocompleteOpen(true),
    },
    {
      title: t("arrive"),
      text: selectedRange.start
        ? selectedRange.start.toDate("America/Bogota").toLocaleDateString()
        : t("arriveDate"),
      action: () => setCalendarOpen(true),
    },
    {
      title: t("exit"),
      text: selectedRange.end
        ? selectedRange.end.toDate("America/Bogota").toLocaleDateString()
        : t("exitDate"),
      action: () => setCalendarOpen(true),
    },
  ];

  const bgTheme = isLight ? "bg-white" : "bg-[#587aff]";
  const shadowTheme = isLight ? "shadow-search" : "";

  const selectedAction = (idx: number, action?: () => void) => {
    setSelectedIdx(idx);
    if (idx === 1) {
      setCalendarOpen(prev => !prev);
      setAutocompleteOpen(false);
      return;
    }
    if (idx === 0) {
      setAutocompleteOpen(prev => !prev);
      setCalendarOpen(false);
      return;
    }
    if (action) action();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setCalendarOpen(false);
      }
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        setAutocompleteOpen(false);
      }
    };

    if (calendarOpen || autocompleteOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarOpen, autocompleteOpen]);

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
          onClick={hangleMap}
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
            calendarWidth={350}
            color="primary"
            aria-atomic="true"
            classNames={{
              header: !isLight && "bg-[#587aff] rounded-lg",
              title: isLight ? "text-[#587aff] text-lg" : "text-white text-lg",
              content: !isLight && "bg-[#4f6ee6]",
              cellButton: !isLight && " text-white ",
              gridHeaderCell: isLight ? "text-[#181c25]" : "text-black",
            }}
            onChange={date => handleRangeChange(date)}
          />
        </div>
      )}
      {autocompleteOpen && (
        <div ref={autocompleteRef}>
          <Autocomplete
            value={destination}
            options={destinations}
            placeholder={t("destinySelect")}
            onChange={setDestination}
            onSelect={handleDestinationSelect}
            className="shadow-lg shadow-sky-500"
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
