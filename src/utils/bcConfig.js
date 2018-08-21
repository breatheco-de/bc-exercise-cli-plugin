const path = require('path');
const fs = require('fs');

module.exports = (filePath) => {
    
    if (!fs.existsSync(filePath+'bc.json')) throw Error('Imposible to load bc.json, make sure you have a ./bc.json file on your current path');
    if (!fs.existsSync(filePath+'exercises')) throw Error('Imposible to exercises folder, make sure you have an exercises folder on your current path');
    
    const bcContent = fs.readFileSync('./bc.json');
    let config = JSON.parse(bcContent);
    
    return {
        getConfig: () => config,
        buildIndex: (callback) => {
            const isDirectory = source => fs.lstatSync(source).isDirectory();
            const getDirectories = source => fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);
            
            // TODO we could use npm library front-mater to read the title of the exercises from the README.md
            config.exercises = getDirectories(filePath+'exercises').map(ex => ({ slug: ex.replace('exercises/',''), title: ex.replace('exercises/','')}));
            fs.writeFile(filePath+'bc.json', JSON.stringify(config), callback);
        }
    };
};