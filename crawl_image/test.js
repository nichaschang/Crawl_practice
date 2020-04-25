var fs = require("fs"),
request = require("request");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const axios = require("axios");

const download_image = (url, image_path) =>
  axios({
    url,
    responseType: "stream"
  }).then(
    response =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on("finish", () => resolve())
          .on("error", e => reject(e));
      })
  );

let strKeyword = "fish";
async function getData() {
  console.log("strat to read file...");
  //讀取 json 檔
  let data = JSON.parse(
    await readFile("./" + strKeyword + ".json")
  );

  for (let i = 0; i < data.length; i++) {
    console.log("downloading... i=", i);
    var rootDir = "./images";
    if (!fs.existsSync(rootDir)) fs.mkdirSync(rootDir);

    const keywordFolderName = "./images/"+strKeyword;
    if (!fs.existsSync(keywordFolderName)) fs.mkdirSync(keywordFolderName);

    var picsDir = "./images/"+strKeyword +"/";
    if (!fs.existsSync(picsDir)) fs.mkdirSync(picsDir);

      const uri = data[i].src;
      console.log("uri =", data[i].src);
      let imgName=i
      if((i*1+1)<10){
        imgName='0'+(i*1+1)
      }
      const filename =
        "images/" +
        strKeyword +
        "/"+
        imgName +
        ".png";
      await download_image(uri, filename);
    }
}

getData();