import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { sleep } from "https://js.sabae.cc/sleep.js";
import { table2json } from "./table2json.js";

const url = "https://kosenconf.jp/";
//const baseurl = url;

const html = await fetchOrLoad(url);
const dom = HTMLParser.parse(html);

const divs = dom.querySelectorAll(".rtable li");
//console.log(divs.length);

const links = divs
  .filter(i => i.text.indexOf("年開催") >= 0)
  .map(i => i.querySelector("a").getAttribute("href"))
  .reverse();
//console.log(links);

const fn = "kosenconf.csv";
const list = await CSV.fetchJSON(fn, []);
//const list = []; // for init

for (const link of links) {
  console.log(link);
  const html = await fetchOrLoad(link);
  const dom = HTMLParser.parse(html);
  const tbl = dom.querySelector(".style_table");
  const json = table2json(tbl);
  //console.log(csv, json);
  for (const item of json) {
    if (!item.タグ) continue;
    if (list.find(i => i.タグ == item.タグ)) continue;
    list.push(item);
  }
  await sleep(100);
}

await Deno.writeTextFile(fn, CSV.stringify(list));
