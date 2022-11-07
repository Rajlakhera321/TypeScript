const csvtojson = require("csvtojson");
const {db} = require("./db")
const {file} = require("./model")
const readXlsxFile = require("read-excel-file")
const XLSX = require("xlsx")

const addData = async (req, res) => {
        try {
            const fileData = req.file
            if(fileData.originalname.includes('csv')){
                csvtojson().fromFile(fileData.originalname)
                .then(source=> {
                    for(var i=0;i<source.length;i++){
                        var Name = source[i]["Name"]
                        var Age = source[i]["Age"]
                        var Email = source[i]["Email"]
                        var Password = source[i]["Password"]
                        console.log(Name,Age,Email,Password)
                        var insertData = `INSERT INTO excel(Name,Age,Email,Password) VALUES(?,?,?,?)`;
                        var items =[Name, Age, Email, Password];
                        db.query(insertData, items,(err, result, fields)=>{
                            if(err){
                                console.log(err,"Unable to insert data in Database");
                            }else{
                                console.log("added successfully",result)
                            }
                        })
                    }
                })
                return res.status(201).json({message:"CSV Data Successfully Inserted"});
            }
            var workBook = XLSX.readFile(req.file.path);
            let workSheet = workBook.SheetNames;
            var x =0;
            let xlsxData;
            workSheet.forEach(element => {
                xlsxData = XLSX.utils.sheet_to_json(workBook.Sheets[workSheet[x]]);
                x++;
            })
            for(let i of xlsxData){
                const data = [i.Name, i.Age, i.Email, i.Password]
                console.log(data);
                var insertData = `INSERT INTO excel(Name,Age,Email,Password) VALUES (?,?,?,?)`;
                db.query(insertData, data,(err, result, fields)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log(result);
                    }
                })
            }
            return res.status(201).json({message: "Excel Data Added Successfully"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:"Internal server error"})
        }
}

module.exports = {addData}