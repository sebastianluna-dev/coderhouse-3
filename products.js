const { readFile, writeFile } = require("fs/promises")

module.exports = class File {

    constructor(fileName) {
        this._fileName = fileName
    }
    async save(object) {
        const fileContent = await readFile(`./${this._fileName}`, { encoding: "utf-8", flag:'r'})
        const objectArray = JSON.parse(fileContent)
        objectArray.push(object)
        await writeFile(`./${this._fileName}`, JSON.stringify(objectArray),{ encoding: "utf-8", flag:'w'})
        return object
    }
    async getById(id) {
        const fileContent = await readFile(`./${this._fileName}`, { encoding: "utf-8", flag:'r'})
        const objectArray = JSON.parse(fileContent)
        const object = objectArray.find(obj => obj.id === id)
        return object
    }
    async getAll() {
        const fileContent = await readFile(`./${this._fileName}`, { encoding: "utf-8", flag:'r'})
        const objectArray = JSON.parse(fileContent)
        console.log(objectArray)
        return objectArray
    }
    async getRandom() {
        const fileContent = await readFile(`./${this._fileName}`, { encoding: "utf-8", flag:'r'})
        const objectArray = JSON.parse(fileContent)
        const randomIndex = Math.floor(Math.random() * objectArray.length)
        console.log(objectArray[randomIndex])
        return objectArray[randomIndex]
    }
    async deleteById(id) {
        const fileContent = await readFile(`./${this._fileName}`, { encoding: "utf-8", flag:'r'})
        const objectArray = JSON.parse(fileContent)
        const filteredData = objectArray.filter(obj => obj.id !== id)
        await writeFile(`./${this._fileName}`, JSON.stringify(filteredData),{ encoding: "utf-8", flag:'w'})
        console.log(filteredData)
        return filteredData
    }
    async deleteAll() {
        await writeFile(`./${this._fileName}`, '[]',{ encoding: "utf-8", flag:'w'})
    };
}