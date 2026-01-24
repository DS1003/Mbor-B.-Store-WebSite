import fs from 'fs';
import path from 'path';

const mapping = JSON.parse(fs.readFileSync('migration-mapping.json', 'utf8'));

function getAllFiles(dir: string, fileList: string[] = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
            getAllFiles(name, fileList);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.tsx', '.ts', '.css', '.html', '.js'].includes(ext)) {
                fileList.push(name);
            }
        }
    }
    return fileList;
}

function updateFiles() {
    console.log("--- Updating Codebase Image Links ---");

    const directories = [
        path.join(process.cwd(), 'app'),
        path.join(process.cwd(), 'components'),
        path.join(process.cwd(), 'lib'),
        path.join(process.cwd(), 'prisma')
    ];

    let totalFiles = 0;
    let totalReplacements = 0;

    for (const dir of directories) {
        if (!fs.existsSync(dir)) continue;

        const files = getAllFiles(dir);
        for (const file of files) {
            let content = fs.readFileSync(file, 'utf8');
            let modified = false;

            for (const [localPath, cloudinaryUrl] of Object.entries(mapping)) {
                // We match exactly the local path inside quotes
                // We handle both double and single quotes
                const doubleQuotePath = `"${localPath}"`;
                const singleQuotePath = `'${localPath}'`;

                if (content.includes(doubleQuotePath)) {
                    content = content.split(doubleQuotePath).join(`"${cloudinaryUrl}"`);
                    modified = true;
                    totalReplacements++;
                }

                if (content.includes(singleQuotePath)) {
                    content = content.split(singleQuotePath).join(`'${cloudinaryUrl}'`);
                    modified = true;
                    totalReplacements++;
                }
            }

            if (modified) {
                fs.writeFileSync(file, content);
                console.log(`Updated: ${path.relative(process.cwd(), file)}`);
                totalFiles++;
            }
        }
    }

    console.log(`--- Codebase Update Complete ---`);
    console.log(`Updated ${totalFiles} files with ${totalReplacements} replacements.`);
}

updateFiles();
