import fs from 'fs';
import { execSync } from 'child_process';

const timestamp = Math.floor(Date.now() / 1000);
let shortHash = 'dev';
try {
  shortHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch (e) {
  console.warn('Git not available, using "dev" as hash');
}
const version = `converter-${timestamp}-${shortHash}`;

const template = fs.readFileSync('public/sw.template.js', 'utf8');
const output = template.replace('__CACHE_VERSION__', version);
fs.writeFileSync('dist/sw.js', output);

console.log(`Service worker built with version: ${version}`);
