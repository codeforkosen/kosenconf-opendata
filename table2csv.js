export const table2csv = (tbl, urlname = null) => {
  const res = [];
  const trs = tbl.querySelectorAll("tr");
  let urlidx = -1;
  trs.forEach((tr, idx) => {
    const tds = tr.querySelectorAll("td, th");
    const line = [];
    tds.forEach((td, idx2) => {
      const colspan = td.getAttribute("colspan") || 1;
      for (let i = 0; i < colspan; i++) {
        line.push(td.text);
      }
      if (idx == 0 && td.text == urlname) {
        line.push("URL");
        urlidx = idx2;
      } else if (idx2 == urlidx) {
        const url = td.querySelector("a")?.getAttribute("href") || "";
        line.push(url);
      }
    });
    res.push(line);
  });
  return res;
};
