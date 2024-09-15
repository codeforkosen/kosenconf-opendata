import { CSV } from "https://js.sabae.cc/CSV.js";
import { table2csv } from "./table2csv.js";

export const table2json = (tbl, urlname = null) => {
  const csv = table2csv(tbl, urlname);
  return CSV.toJSON(csv);
};
