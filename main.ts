import {readdir} from "fs/promises";
import {readdirSync} from "fs";

let argv = process.argv;
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

let folders = readdirSync("./resources")

let navList:any[] = []

folders.forEach(foldername=>{
    let notedirs = readdirSync(`./resources/${foldername}`)

    let notes:Array<{dirname: string,name: string}> = []
    notedirs.forEach(notedirname => {
        let name = readdirSync(`./resources/${foldername}/${notedirname}`).find(item2 => item2.endsWith(".html"))!;
        notes.push({
            dirname: notedirname,
            name
        })
    })

    navList.push({
        folder: foldername,
        notes
    })
})


let initDataStr = `let navList = ${JSON.stringify(navList)};`

if (prefix){
    initDataStr+=`let prefix = "${prefix}"`
}else {
    initDataStr+=`let prefix = ""`
}

fs.writeFileSync("./dist/initData.js",initDataStr,'utf-8')
let htmltemp = fs.readFileSync("./index-template.html",'utf-8')
htmltemp = htmltemp.replace("此处替换读取initData.js",prefix ? `<script src="\\${prefix}\\initData.js"></script>` : '<script src="./initData.js"></script>')
fs.writeFileSync("./dist/index.html",htmltemp,'utf-8')

fsExtra.copySync("./imgs","./dist/imgs")

console.log("finish!")
