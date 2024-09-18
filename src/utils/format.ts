import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { TABS } from "./constant.js";
import INotes from "../types/notes.js";

export function showFormattedDate(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "2-digit",
    month: "short",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export function filterNotes(notes: INotes[], tab: string, searchKey?: string) {
  const q = searchKey?.toLocaleLowerCase();

  return notes.filter((note) => {
    const matchesTab =
      tab === TABS[0] ||
      (tab === TABS[1] && !note.archived) ||
      (tab === TABS[2] && note.archived);

    const matchesSearchKey = !q || note.title.toLocaleLowerCase().includes(q);

    return matchesTab && matchesSearchKey;
  });
}