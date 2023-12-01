const {readFileSync, promises: fsPromises} = require('fs');
//Parsing source: https://bobbyhadz.com/blog/javascript-read-file-into-array

let conversionObj = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five":5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9
}

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);
  //console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

  let total = 0;
  
  // Numbers in words
  for (st of arr) {
    let rg = /\d+/g
    let foundIndexes = []
    for (let strNum in conversionObj) {
      if (st.includes(strNum)) {
        let allNumOccurencesIndexes = [...st.matchAll(new RegExp(strNum, 'g'))].map(a => a.index)
        allNumOccurencesIndexes.forEach(index => {
          foundIndexes.push({index: index, strNum: strNum})
        })
      }
    }

    //  Numbers in digits
    for (let letter of st) {
      if (Object.values(conversionObj).includes(parseInt(letter))) {
        let allNumOccurencesIndexes = [...st.matchAll(new RegExp(letter, 'g'))].map(a => a.index)
        allNumOccurencesIndexes.forEach(index => {
          foundIndexes.push({index: index, strNum: letter})
        })
      }
    }


    for (let obj of foundIndexes) {
      // console.log(obj.strNum)
      if (Object.keys(conversionObj).includes((obj.strNum))) {
        // console.log(obj.strNum)
        obj.strNum = conversionObj[obj.strNum].toString()
      }
    }
    foundIndexes.sort((a, b) => a.index - b.index)
    total += parseInt(foundIndexes[0].strNum + '' + foundIndexes.at(-1).strNum)
    
  }
  console.log(total)


}

syncReadFile('./1.txt');