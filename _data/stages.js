const EleventyFetch = require("@11ty/eleventy-fetch");

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

module.exports = async () => {
  const json = await EleventyFetch("https://tc39.es/dataset/proposals.json", {
    duration: "1h", // 1 day
    type: "json", // also supports "text" or "buffer"
  });

  const stage3 = json.filter((v) => v.stage === 3);
  return stage3.map((v) => {
    v.authorsAndChampions = arrayEquals(v.authors, v.champions)
      ? v.authors
      : false;
    return v;
  });
};
