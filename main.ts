import {readdir} from "fs/promises";
import {readdirSync} from "fs";

let argv = process.argv;
console.log(argv)
let arg3 = argv.find(item => item.startsWith("prefix="))

let prefix:string
if (arg3) {
    prefix = arg3.split("=")[1].trim()
} else {
    prefix = ''
}


const fs = require("fs")
const fsPromises = require("fs/promises")
const fsExtra = require("fs-extra")

if (!fs.existsSync("./dist")) {
    fs.mkdirSync("./dist")
}

fsExtra.copySync("./resources", "./dist/resources")

let readdirSync1 = readdirSync("./resources");

let resourcesData: Array<{dirname:string,name:string}> = []
readdirSync1.forEach(dirname => {

    let name = readdirSync(`./resources/${dirname}`).find(item2 => item2.endsWith(".html"))!;

    resourcesData.push({
        dirname,
        name
    })
})

let initDataStr = `let navList = ${JSON.stringify(resourcesData)};`

if (prefix){
    initDataStr+=`let prefix = ${prefix}`
}else {
    initDataStr+=`let prefix = ""`
}

fs.writeFileSync("./dist/initData.js",initDataStr,'utf-8')
fs.copyFileSync("./index-template.html","./dist/index.html")
