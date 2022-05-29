const fs = require('fs');

const componentPath = process.argv[2];
const componentName = process.argv[3];

const pathForComponent = `${componentPath}/${componentName}`;

fs.mkdirSync(pathForComponent);

fs.appendFileSync(`${pathForComponent}/package.json`, JSON.stringify({
    main: `./${componentName}.tsx`,
    private: true
}));

fs.appendFileSync(`${pathForComponent}/${componentName}.tsx`,
`import React from 'react';
import classes from './${componentName}.module.css';
import type {Props} from './${componentName}.types';

export const ${componentName}: React.FC<Props> = () => (
    <>
    
    </>
);
`);

fs.appendFileSync(`${pathForComponent}/${componentName}.types.ts`,
`export type Props = {};
`);

fs.appendFileSync(`${pathForComponent}/${componentName}.module.css`,
`.${componentName} {

}
`);

console.log(`FINISHED ${componentName} creating!`)
