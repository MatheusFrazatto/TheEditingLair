// Publish a plugin version as a GitHub Release and point its page at it.
//
//   npm run release -- easy-crt             (add --dry-run to only build the zip)
//
// Takes the single .setting in public/downloads/<slug>/, zips it under its own
// name (Release assets cannot keep spaces, a zip can), creates the release
// <slug>-v<version> with that version's changelog notes, then rewrites the
// download, fileName and fileSize lines of src/content/plugins/<slug>.md.
// GitHub counts each download of the zip; the plugin page shows the total.

import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { crc32, deflateRawSync } from 'node:zlib';
import { parse } from 'yaml';

const REPO = 'MatheusFrazatto/TheEditingLair';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: npm run release -- <plugin-slug>');
  process.exit(1);
}

const pagePath = join('src/content/plugins', `${slug}.md`);
const page = readFileSync(pagePath, 'utf8');
const front = parse(page.split(/^---\s*$/m)[1]);
const { title, version, changelog = [] } = front;

const dir = join('public/downloads', slug);
const settings = readdirSync(dir).filter((f) => f.endsWith('.setting'));
if (settings.length !== 1) {
  console.error(`Expected exactly one .setting in ${dir}, found ${settings.length}.`);
  process.exit(1);
}
const settingName = settings[0];

const tag = `${slug}-v${version}`;
const zipName = `${title.replace(/\s+/g, '-')}-v${version}.zip`;
const zipPath = join(mkdtempSync(join(tmpdir(), 'tel-release-')), zipName);
writeFileSync(zipPath, zip(settingName, readFileSync(join(dir, settingName))));

const entry = changelog.find((c) => String(c.version) === String(version));
const notes = `${entry?.notes ?? `${title} ${version}.`}\n\nUnzip it to get \`${settingName}\`, then follow the install steps on https://matheusfrazatto.github.io/TheEditingLair/plugins/${slug}/`;

if (process.argv.includes('--dry-run')) {
  console.log(`Dry run: ${zipPath}\nWould create ${tag} with notes:\n${notes}`);
  process.exit(0);
}

execFileSync('gh', ['release', 'create', tag, zipPath, '-R', REPO, '--target', 'main', '--title', `${title} ${version}`, '--notes', notes], {
  stdio: 'inherit',
});

const url = `https://github.com/${REPO}/releases/download/${tag}/${zipName}`;
const kb = Math.max(1, Math.round(statSync(zipPath).size / 1024));
const updated = page
  .replace(/^(\s+download:).*$/m, `$1 ${url}`)
  .replace(/^(\s+fileName:).*$/m, `$1 ${zipName}`)
  .replace(/^(\s+fileSize:).*$/m, `$1 ${kb} KB`);
writeFileSync(pagePath, updated);
console.log(`\n${pagePath} now downloads ${zipName} (${kb} KB) from ${tag}.`);

/** A one-file zip archive, deflated. */
function zip(name, data) {
  const nameBuf = Buffer.from(name, 'utf8');
  const body = deflateRawSync(data, { level: 9 });
  const crc = crc32(data);
  // DOS date/time for the archive entry: now
  const d = new Date();
  const time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
  const date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
  const UTF8 = 0x0800;

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);
  local.writeUInt16LE(UTF8, 6);
  local.writeUInt16LE(8, 8);
  local.writeUInt16LE(time, 10);
  local.writeUInt16LE(date, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(body.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(nameBuf.length, 26);

  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50, 0);
  central.writeUInt16LE(20, 4);
  central.writeUInt16LE(20, 6);
  central.writeUInt16LE(UTF8, 8);
  central.writeUInt16LE(8, 10);
  central.writeUInt16LE(time, 12);
  central.writeUInt16LE(date, 14);
  central.writeUInt32LE(crc, 16);
  central.writeUInt32LE(body.length, 20);
  central.writeUInt32LE(data.length, 24);
  central.writeUInt16LE(nameBuf.length, 28);

  const localSize = local.length + nameBuf.length + body.length;
  const centralSize = central.length + nameBuf.length;
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(1, 8);
  end.writeUInt16LE(1, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(localSize, 16);

  return Buffer.concat([local, nameBuf, body, central, nameBuf, end]);
}
