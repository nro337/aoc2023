const {readFileSync, promises: fsPromises} = require('fs');
const { parse } = require('path');
//Parsing source: https://bobbyhadz.com/blog/javascript-read-file-into-array

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  let possible = {
    "red": 12,
    "green": 13,
    "blue": 14,
  }

  let total = 0;

  let games = []

  for (line of arr) {
    let id = line.slice(line.indexOf(' ')+1, line.indexOf(':'))
    let gameText = line.slice(line.indexOf(':') + 2)

    let sets = gameText.split('; ')
    let setsObj = {}
    let setCount = 0;
    for (st of sets) {
      let setNums = st.match(/\d+/g);
      let setColors = st.match(/[a-z]+/g);
      let setList = []
      for (let i in setNums) {
        let obj = {}
        let tmp = setColors[i]
        obj[tmp] = parseInt(setNums[i])
        setList.push(obj)
      }

      setsObj[setCount] = setList

      setCount++
    }
    console.log(setsObj)
    let valid = true;
    Object.keys(setsObj).forEach(key => {
      for (colorObj of setsObj[key]) {
        let clr = Object.keys(colorObj)[0]
        let num = Object.values(colorObj)[0]
        if (num > possible[clr]) {
          valid = false
        }
      }
    })
    console.log(valid)
    if (valid) {
      total += parseInt(id)
    }

  }
  console.log(total)

}

syncReadFile('./2.txt');