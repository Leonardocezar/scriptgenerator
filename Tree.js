const fs = require("fs");
const parse = require("csv-parse/lib/sync")
class Tree {

    constructor(path) {
        this.n = this.setName(path);  //name
        this.rP = this.setRelativePath(path); //relativePath
        this.id = this.setId() //id
        this.p = this.setPrice(path); //price
        this.t = this.setType(path); //type
        this.i = this.setInfo(path); //info
        this.d = this.setDepth(path); //deepth
        this.g = this.setGraphic(path); //graphic
        this.pr = this.setPreview(path); //preview
        this.ch = []; //children
    }
    setPreview(path){        
        if (fs.lstatSync(path).isDirectory()) {
            const dir = fs.readdirSync(path)
            for (const child of dir) {
                if (fs.lstatSync(`${path}/${child}`).isFile()) {
                    if (`${path}/${child}`.includes('image')) {                       
                        
                        return 'image.jpg'; 
                    }
                }
            }
        }  
    }
    setId() {
        return Math.ceil(Math.random() * Math.pow(10, 15))
    }
    readCsv(path) {
        const a = fs.readFileSync(path);
        const records = parse(a, {
            skip_empty_lines: true,
            delimiter: ',',
            quote:true,
            
        })
        return records[0][0];
    }
    setGraphic(path){        
        if (fs.lstatSync(path).isDirectory()) {
            const dir = fs.readdirSync(path)
            for (const child of dir) {
                if (fs.lstatSync(`${path}/${child}`).isFile()) {
                    if (`${path}/${child}`.includes('graphic')) {                        
                        let lastPath = this.setName(path);
                        let lastpathWithoutSpace = lastPath.replace(" ",'');
                        let graphic = `_graphic_${lastpathWithoutSpace}`;
                        return graphic; 
                    }
                }
            }
        }       

    }
    setName(name) {
        let stringWithoutFilePath = name.replace('../../Downloads/2.3_jumpsuit/', '');
        let stringConvertedArray = stringWithoutFilePath.split('/');
        let updatedName = stringConvertedArray[stringConvertedArray.length - 1]
        let nameAltered = updatedName.replace(/[0-9]/g, '');
        let nameWithoutSymbols = nameAltered.replace(/[_]/g, ' ');
        return nameWithoutSymbols.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,'');
    }
    setRelativePath(path) {
        let stringWithoutFilePath = path.replace("../../Downloads/2.3_jumpsuit/", '');
        return stringWithoutFilePath;
    }
    setPrice(path) {
        if (fs.lstatSync(path).isDirectory()) {
            const dir = fs.readdirSync(path)
            for (const child of dir) {
                if (fs.lstatSync(`${path}/${child}`).isFile()) {
                    if (`${path}/${child}`.includes('price')) {
                        const rstream = this.readCsv(`${path}/${child}`)
                        return rstream
                    }
                }
            }
        }
    }
    setType(path) {
        if (fs.lstatSync(path).isDirectory()) {
            const dir = fs.readdirSync(path)
            for (const child of dir) {
                if (fs.lstatSync(`${path}/${child}`).isFile()) {
                    if (`${path}/${child}`.includes('type')) {
                        const rstream = this.readCsv(`${path}/${child}`)
                        return rstream
                    }
                }
            }
        }
    }
    setDepth(path) {
        console.log(path)
        if (fs.lstatSync(path).isDirectory()) {
            const dir = fs.readdirSync(path)
            for (const child of dir) {
                if (fs.lstatSync(`${path}/${child}`).isFile()) {
                    if (`${path}/${child}`.includes('depth')) {
                        const rstream = this.readCsv(`${path}/${child}`)
                        return rstream
                    }
                }
            }
        }
    }

    convertToPlain(rtf) {
        rtf = rtf.replace(/\\par[d]?/g, "");
        rtf = rtf.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "")
        rtf.replace(/\\'[0-9a-zA-Z]{2}/g, "").trim()
        const ar = rtf.split(/\n/);
        const title = ar[ar.length-2].replace(/[\\"]/g, '');
        const subtitle = ar[ar.length-1].replace(/[\\"]/g, '');
        return [`${title}`,`Material ${subtitle}`]
      
      }
      
    setInfo(path) {
        if (fs.lstatSync(path).isDirectory()) {
            const dir = fs.readdirSync(path)
            for (const child of dir) {
                if (fs.lstatSync(`${path}/${child}`).isFile()) {
                    if (`${path}/${child}`.includes('Info')) {
                        const item = fs.readFileSync(`${path}/${child}`)
                        const convertedItem = this.convertToPlain(item.toString('utf-8'))
                        return convertedItem;
                    }
                }
            }
        }
    }

}

module.exports = Tree;