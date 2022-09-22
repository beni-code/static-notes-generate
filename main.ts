import {readdir} from "fs/promises";
import {readdirSync} from "fs";

const fs = require("fs")
const fsPromises = require("fs/promises")
const fsExtra = require("fs-extra")

if (!fs.existsSync("./dist")) {
    fs.mkdirSync("./dist")
}

fsExtra.copySync("./resources", "./dist/resources")

fsPromises.readFile("./index-template.html", "utf-8").then((txt: string) => {
    console.log(txt)

    let str1 = "<div class=\"nav-list\"></div>";
    let number = txt.search(str1);

    let slice1 = txt.slice(0, number);

    let slice2 = txt.slice(number + str1.length, txt.length)

    let res1 = slice1 + "<div class=\"nav-list\">";

    let readdirSync1 = readdirSync("./resources");
    readdirSync1.forEach(dirname => {

        let name = readdirSync(`./resources/${dirname}`).find(item2 => item2.endsWith(".html"));
        res1 += `<div class="nav-item" onclick="changeiframe(event,'${dirname}','${name}')">${name}</div>`
    })

    res1 += "</div>"

    res1 += slice2;

    fs.writeFileSync("./dist/index.html", res1, "utf-8")
})


