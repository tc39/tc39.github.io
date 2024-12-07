export default (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon*");
  return {
    dir: { input: "./", output: "./_site", layouts: "./_layouts" },
  };
};
