import { useMemo } from "react";
import { months } from "~/constants";

export function useDates() {
   return useMemo(function () {
      const currentYear = new Date().getFullYear();
      const years: Array<string> = [];
      for (let year = currentYear; year >= 1924; year--) years.push(`${year}`);

      return { years, months };
   }, []);
}
