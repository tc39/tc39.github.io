import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";

export default defineConfig({
  extends: [core],
  ignorePatterns: core.ignorePatterns,
  overrides: [
    {
      // Eleventy data filenames must match their locale directory.
      files: ["**/*.11tydata.js"],
      rules: {
        "unicorn/filename-case": "off",
      },
    },
  ],
});
