import cleanup from "rollup-plugin-cleanup";
import filesize from "rollup-plugin-filesize";

export default {
  input: "src/index.js",
  plugins: [cleanup()],
  output: [
    {
      file: "dist/ignite-framework",
      format: "esm",
      plugins: [filesize()],
    },
  ],
};
