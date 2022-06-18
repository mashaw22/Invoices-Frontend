import { createContext } from "react";


export const SubNavContext = createContext({
    isInvoicesListPage: false,
    viewInvoiceNav: () => {},
    viewOtherNav: () => {}
})