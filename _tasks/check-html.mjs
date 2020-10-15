import { execSync } from 'child_process';
import vnu from 'vnu-jar';

process.exitCode = await execSync(`java -jar ${vnu} _site/index.html`);
