#!/usr/bin/env node
/** Run: node scripts/hash-admin-password.mjs [password] */
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const bcrypt = require("bcryptjs");
const pwd = process.argv[2] || "Admin1234!";
console.log(bcrypt.hashSync(pwd, 10));
