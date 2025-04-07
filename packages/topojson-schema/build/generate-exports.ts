import { Glob } from 'bun';

const dialects = ['draft-07'];
const glob = new Glob(`**/*.schema.json`);

const dialectExportWrites = dialects.map(async (dialect) => {
  const cwd = `./dist/schemas/${dialect}`;
  const lines = [...glob.scanSync({ cwd })].map(async (fileName) => {
    const json = await Bun.file(`${cwd}/${fileName}`).json();
    const id = json.title;
    return `export { default as ${id} } from './${fileName}';`;
  });
  const fileContents = (await Promise.all(lines)).join('\n');
  return Bun.write(`${cwd}/index.js`, fileContents);
});

await Promise.all(dialectExportWrites);
