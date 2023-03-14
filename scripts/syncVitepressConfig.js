import { copy } from "fs-extra";

try {
  await copy("config/vitepress.config.ts", ".vitepress/config.ts");
} catch (e) {
  throw e;
}
