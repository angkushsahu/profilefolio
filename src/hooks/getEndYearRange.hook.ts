import type { UseFormGetValues, UseFormWatch } from "react-hook-form";
import { useMemo } from "react";

// eslint-disable-next-line
type DataType = any & { startDate: { year: string } };

export interface UseEndYearRangeArgs {
   getValues: UseFormGetValues<DataType>;
   watch: UseFormWatch<DataType>;
}

export function useEndYearRange({ getValues, watch }: UseEndYearRangeArgs) {
   return useMemo(
      function () {
         const currentYear = new Date().getFullYear();
         const years: Array<string> = [];

         const startDateYear = Number(getValues("startDate.year"));
         const limit = startDateYear ? startDateYear : 1924;

         for (let year = currentYear; year >= limit; year--) years.push(`${year}`);
         return years;
      },
      // eslint-disable-next-line
      [watch("startDate.year")]
   );
}
