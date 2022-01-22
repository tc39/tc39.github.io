module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('assets');
  return {
    dir: {
      input: './', // Equivalent to Jekyll's source property
      output: './_site', // Equivalent to Jekyll's destination property
      layouts: './_layouts',
    },
  };
};
