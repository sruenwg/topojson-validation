import { Glob } from 'bun';

const dialects = ['draft-07'];
const glob = new Glob(`**/*.json`);

const dialectExportWrites = dialects.map((dialect) => {
  const cwd = `./dist/schemas/${dialect}`;
  const lines = [...glob.scanSync({ cwd })].map((fileName) => {
    const id = fileName.split('.')[0];
    return `export { default as ${id} } from './${fileName}';`;
  });
  return Bun.write(
    `${cwd}/index.js`,
    lines.join('\n'),
  );
});

await Promise.all(dialectExportWrites);
