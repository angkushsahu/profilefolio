import { useMemo } from "react";

export function useDates() {
   return useMemo(function () {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      const currentYear = new Date().getFullYear();
      const years = [];
      for (let year = 1924; year <= currentYear; year++) years.push(year);

      return { years, months };
   }, []);
}
