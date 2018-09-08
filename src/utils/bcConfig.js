const path = require('path');
const fs = require('fs');

module.exports = (filePath) => {
    
    if (!fs.existsSync(filePath+'bc.json')) throw Error('Imposible to load bc.json, make sure you have a ./bc.json file on your current path');
    if (!fs.existsSync(filePath+'exercises')) throw Error('Imposible to exercises folder, make sure you have an exercises folder on your current path');
    
    const bcContent = fs.readFileSync('./bc.json');
    let config = JSON.parse(bcContent);
    
    return {
        getConfig: () => config,
        getReadme: (slug=null) => {
            if(slug){
                const exercise = config.exercises.find(ex => ex.slug == slug);
                if (!exercise) throw Error('Exercise not found');
                const basePath = exercise.path;
                if (!fs.existsSync(basePath+'/README.md')) throw Error('Readme file not found for exercise: '+basePath+'/README.md');
                return fs.readFileSync(basePath+'/README.md');
            }
            else{
                if (!fs.existsSync('./README.md')) throw Error('Readme file not found');
                return fs.readFileSync('./README.md');
            }
        },
        getFile: (slug, name) => {
            const exercise = config.exercises.find(ex => ex.slug == slug);
            if (!exercise) throw Error('Exercise not found');
            const basePath = exercise.path;
            if (!fs.existsSync(basePath+'/'+name)) throw Error('File not found: '+basePath+'/'+name);
            return fs.readFileSync(basePath+'/'+name);
        },
        saveFile: (slug, name, content) => {
            const exercise = config.exercises.find(ex => ex.slug == slug);
            if (!exercise) throw Error('Exercise '+slug+' not found');
            const basePath = exercise.path;
            if (!fs.existsSync(basePath+'/'+name)) throw Error('File not found: '+basePath+'/'+name);
            return fs.writeFileSync(basePath+'/'+name, content, 'utf8');
        },
        getExerciseDetails: (slug) => {
            const exercise = config.exercises.find(ex => ex.slug == slug);
            if (!exercise) throw Error('Exercise not found');
            const basePath = exercise.path;
            const getFiles = source => fs.readdirSync(source).map(file => ({ path: source+'/'+file, name: file}));
            return getFiles(basePath);
        },
        buildIndex: () => {
            const isDirectory = source => fs.lstatSync(source).isDirectory();
            const getDirectories = source => fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);
            
            // TODO we could use npm library front-mater to read the title of the exercises from the README.md
            config.exercises = getDirectories(filePath+'exercises').map(ex => ({ slug: ex.replace('exercises/',''), title: ex.replace('exercises/',''), path: ex}));
            
            return {
                write: (callback) => fs.writeFile(filePath+'bc.json', JSON.stringify(config), callback)
            }
        }
    };
};