import { readFile } from "node:fs/promises";

const host = "www.cursive-text-generator.net";
const key = "4d6457b36c574df2a1586f7bf33f3a26";
const keyLocation = `https://${host}/${key}.txt`;
const endpoints = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow"
];

const raw = await readFile(new URL("../indexnow-urls.txt", import.meta.url), "utf8");
const urlList = raw
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

const payload = {
  host,
  key,
  keyLocation,
  urlList
};

for (const endpoint of endpoints) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload)
  });

  const body = await response.text();

  if (!response.ok && response.status !== 202) {
    throw new Error(`IndexNow failed at ${endpoint}: ${response.status} ${response.statusText}
${body}`);
  }

  console.log(`IndexNow accepted by ${endpoint} for ${urlList.length} URLs.`);
}
