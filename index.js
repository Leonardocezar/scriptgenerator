const { dirname, resolve, delimiter } = require("path");
const readline = require("readline")
const fs = require("fs");
const Tree = require("./Tree");
const filePath = "../../Downloads/2.3_jumpsuit/2.3_jumpsuit"
const contentFileDestination = "./jumpsuit.json";
const parse = require("csv-parse/lib/sync")
function save(content) {
    const contentString = JSON.stringify(content);
    return fs.writeFileSync(contentFileDestination, contentString);
}

function buildTree(rootPath) {
    const root = new Tree(rootPath);
    const stack = [root];
    while (stack.length) {
        const currentNode = stack.pop();
        if (currentNode) {
            const children = fs.readdirSync(`../../Downloads/2.3_jumpsuit/${currentNode.rP}`);
            for (const child of children) {
                const childPath = `../../Downloads/2.3_jumpsuit/${currentNode.rP}/${child}`;
                const childNode = new Tree(childPath)
                if (fs.statSync(`../../Downloads/2.3_jumpsuit/${childNode.rP}`).isDirectory()) {
                    currentNode.ch.push(childNode);
                }
                if (fs.statSync(`../../Downloads/2.3_jumpsuit/${childNode.rP}`).isDirectory()) {
                    stack.push(childNode);
                }
            }
        }
    }
    return root;
}
const x = buildTree(filePath);
save(x);
