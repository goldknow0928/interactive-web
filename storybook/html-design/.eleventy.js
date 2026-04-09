module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats(['njk', 'html']);
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: {
      input: "src",
      includes: "components", // 내부 템플릿(njk) 경로
      output: "dist",
    },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
