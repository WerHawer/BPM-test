import mainArr from './incomeArr.js'
import boolObj from './boolObj.js'
import localObj from './localObj.js'
import dateConfig from './dateConfigFunk.js'

const result = [];
const arrOfObjByName = [];
let str = '';
let objArr;
let filteredArr = [];
let localizeArr = [];
let copyOfBool;

doFinalArr(mainArr, boolObj, localObj);

function doFinalArr(incomeArr, boolObj, localizeObj) {

    incomeArr.map(obj => {
        copyOfBool = {...boolObj };
        filterObj(obj)
    });

    doLocalizeObj(filteredArr, localizeObj);

    doArrOfObjByName(filteredArr);

    getResult(arrOfObjByName);

    console.log(result);
}

function filterObj(obj) {
    objArr = Object.keys(obj);

    objArr.forEach(el => {

        if (copyOfBool[el] === true) {
            let objValue = obj[el];
            if (obj[el] === true) objValue = 'Tak';
            if (obj[el] === false) objValue = 'Hi';
            if (obj[el] instanceof Date) objValue = dateConfig(objValue);
            filteredArr.push({
                name: el,
                value: objValue,
            });
        }
    });

    objArr.forEach(el => {

        if (typeof(obj[el]) === 'object') {
            copyOfBool = copyOfBool[el]
            filterObj(obj[el]);
        }
    });
}

function doLocalizeObj(filteredArr, localObj) {

    const localArr = Object.keys(localObj);

    filteredArr.map(obj => {
        localArr.forEach(el => {
            if (el.includes(obj.name)) {
                obj.name = localObj[el]
            }
        })
    })
}

function doArrOfObjByName(filteredArr) {

    let tempArr = [];

    filteredArr.forEach(obj => !tempArr.includes(obj.name) ? tempArr.push(obj.name) : obj);

    tempArr.forEach(name => {
        let insideArr = [];
        filteredArr.forEach(obj => {
            if (obj.name === name) {
                insideArr.push(obj)
            }
        })
        arrOfObjByName.push(insideArr);
    })

}

function getResult(arr) {

    arr.forEach(array => {
        array.forEach((obj, i) => {
            obj[`value${i+1}`] = obj.value;
            delete obj.value;
        });
    })

    arr.map(array => array.reduce((acc, obj) => {
        acc = ({...acc, ...obj })
        result.push(acc)
    }));

}