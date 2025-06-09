"use client";
import React, { useEffect, useRef, useState } from "react";
import BoxButton from "../atoms/BoxButton";
import { ArrowRightToLine, MapIcon } from "lucide-react";
import useTheme from "@/hooks/useTheme";
import { RangeCalendar } from "@heroui/calendar";
import CardSelect from "../atoms/CardSelect";
import { useRouter } from "next/navigation";
import { DateValue, RangeValue } from "@heroui/calendar";
import { useTranslations } from "next-intl";
import Autocomplete from "../atoms/Autocomplete";
import useMediaQuery from "@/hooks/useMediaQuery";
interface SelectOption {
  title: string;
  text: string;
  action?: () => void;
}

interface SearchBarProps {
  onSearch: (data: {
    destination: string;
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
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
  }>({ start: null, end: null });

  const destinations = [
    "Colombia",
    "Ecuador",
    "Peru",
    "Venezuela",
    "Brasil",
    "Costa Rica",
  ];
  const isLight = useTheme(state => state.theme);
  const isMd = useMediaQuery("(min-width: 768px)");

  const hangleMap = () => router.push("/map");

  const handleRangeChange = (range: RangeValue<DateValue>) => {
    setSelectedRange({ start: range.start, end: range.end });
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
    <div className="flex flex-col md:flex-row gap-4 md:gap-x-6 relative w-full items-center">
      <div
        className={`
          grid grid-cols-1 md:grid-cols-3 grid-rows-3 md:grid-rows-1 gap-2 md:gap-4
          px-4 md:px-8 py-2 md:py-1
          justify-center items-center
          min-w-80 md:min-w-2xl
          rounded-2xl md:rounded-full
          ${bgTheme} ${shadowTheme}
          transition-all
        `}
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

      <div className="flex gap-2 md:gap-x-3 items-center mt-2 md:mt-0">
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
          onClick={() =>
            onSearch({
              destination,
              startDate: selectedRange.start
                ? selectedRange.start.toDate("America/Bogota")
                : null,
              endDate: selectedRange.end
                ? selectedRange.end.toDate("America/Bogota")
                : null,
            })
          }
        />
      </div>

      {calendarOpen && (
        <div
          ref={calendarRef}
          className="absolute left-0 top-24 md:top-17 z-20 w-full md:w-auto"
        >
          <RangeCalendar
            visibleMonths={isMd ? 2 : 1}
            className="shadow-lg shadow-sky-500"
            calendarWidth={335}
            color="primary"
            aria-atomic="true"
            classNames={{
              header: !isLight && "bg-[#587aff] rounded-lg",
              title: isLight ? "text-[#587aff] text-md" : "text-white text-md",
              content: !isLight && "bg-[#4f6ee6]",
              cellButton: !isLight && " text-white ",
              gridHeaderCell: isLight ? "text-[#181c25]" : "text-black",
            }}
            onChange={handleRangeChange}
          />
        </div>
      )}

      {autocompleteOpen && (
        <div
          ref={autocompleteRef}
          className="absolute left-0 top-0 md:top z-20 w-full md:w-auto"
        >
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
