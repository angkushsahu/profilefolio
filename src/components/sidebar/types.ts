import type { Dispatch, SetStateAction } from "react";

export interface ToggleNavigationProps {
   setOpen?: Dispatch<SetStateAction<boolean>>;
}
