const configureEleventy = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon*");
  return {
    dir: { input: "./", layouts: "./_layouts", output: "./_site" },
  };
};

export default configureEleventy;
