const csvtojson = require("csvtojson");
const XLSX = require("xlsx");
const db = require("./models");
const excel = db.excel;
const path = require("path");
const fs = require("fs");

const addData = async (req, res) => {
    try {
        const fileData = req.file
        if (fileData.originalname.includes('csv')) {
            csvtojson().fromFile(fileData.path).then(source => {
                for (var i = 0; i < source.length; i++) {
                    var name = source[i]["Name"]
                    var age = source[i]["Age"]
                    var email = source[i]["Email"]
                    var password = source[i]["Password"]
                    excel.create({
                        name,
                        email,
                        age,
                        password
                    })
                }
                const url = path.resolve('uploads', fileData.filename)
                fs.unlinkSync(url)
            })
            return res.status(201).json({ message: "CSV Data Successfully Inserted" });
        }
        var workBook = XLSX.readFile(req.file.path);
        let workSheet = workBook.SheetNames;
        var x = 0;
        let xlsxData;
        workSheet.forEach(element => {
            xlsxData = XLSX.utils.sheet_to_json(workBook.Sheets[workSheet[x]]);
            x++;
        })
        for (let i of xlsxData) {
            const [name, age, email, password] = [i.Name, i.Age, i.Email, i.Password]
            await excel.create({
                name,
                age,
                email,
                password
            })
        }
        const url = path.resolve('uploads', fileData.filename)
        await fs.unlinkSync(url)
        return res.status(201).json({ message: "Excel Data Added Successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

const getData = async (req, res) => {
    try {
        const data = await excel.findAll({})
        res.status(200).json({ message: data })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const getDataById = async (req, res) => {
    try {
        const { id } = req.params
        const data = await excel.findOne({ where: { id: id } });
        res.status(200).json({ message: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = {
    addData,
    getData,
    getDataById
}
