import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { vnpay } = require("vn-payments");
export { vnpay };
