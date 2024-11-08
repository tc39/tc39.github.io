import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export default {
  intro: require("./intro.json"),
  proposals: require("./proposals.json"),
  site: require("./site.json"),
  stage3: require("./stage3.json"),
  locale: "ru",
  lang: "ru",
};
