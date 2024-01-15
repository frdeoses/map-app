const {writeFileSync, mkdirSync} = require('fs')

require('dotenv').config()

const targetPath = './src/environments/environment.ts';

const envFileContent = `
export const environment = {
  map_tilder_key: "${ process.env['MAPTILDER_KEY'] }",
  otra: "propiedad",
};
`;

mkdirSync('./src/environments', { recursive: true});

writeFileSync(targetPath, envFileContent);
