import * as util from "node:util";
import eleventyFetch from "@11ty/eleventy-fetch";

export default async () => {
  const json = await eleventyFetch("https://tc39.es/dataset/proposals.json", {
    duration: "1h",
    type: "json",
  });

  const stage3 = json.filter((v) => v.stage === 3);

  return stage3.map((v) => {
    v.authorsAndChampions = util.isDeepStrictEqual(v.authors, v.champions)
      ? v.authors
      : false;
    return v;
  });
};
