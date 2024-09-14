export const table2csv = (tbl) => {
  const res = [];
  const trs = tbl.querySelectorAll("tr");
  trs.forEach(tr => {
    const tds = tr.querySelectorAll("td, th");
    const line = [];
    tds.forEach(td => {
      const colspan = td.getAttribute("colspan") || 1;
      for (let i = 0; i < colspan; i++) {
        line.push(td.text);
      }
    });
    res.push(line);
  });
  return res;
};
