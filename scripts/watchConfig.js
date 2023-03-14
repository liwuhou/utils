import { watch } from "chokidar";
import { copy } from "fs-extra";
import { normalizePath } from "vite";

watch("config/vitepress.config.ts").on("change", (file) => {
  file = normalizePath(file);
  console.log("🤔 ~ file: watchConfig.js:7 ~ watch ~ file:", file);
  copy(file, ".vitepress/config.ts");
});
