import { CSV } from "https://js.sabae.cc/CSV.js";
import { table2csv } from "./table2csv.js";

export const table2json = (tbl) => {
  const csv = table2csv(tbl);
  return CSV.toJSON(csv);
};
