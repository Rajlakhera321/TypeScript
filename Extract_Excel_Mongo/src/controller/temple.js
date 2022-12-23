const {templeModel, prayerModel, serviceModel, professionModel, categoryModel, ageModel} = require("../models");
const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");

const addTemple = async (req, res) => {
    try {
        const fileData = req.file
        var workBook = XLSX.readFile(req.file.path);
        let workSheet = workBook.SheetNames;
        var x = 0;
        let xlsxData;
        workSheet.forEach(element => {
            xlsxData = XLSX.utils.sheet_to_json(workBook.Sheets[workSheet[x]]);
            x++;
        })
        var obj1 =[]
        var obj2 =[]
        var obj3 =[]
        for (let i of xlsxData) {
            if(i.Coordinates){
                var coordinates = i.Coordinates.split(', ')
            }
            obj1.push({templeName: i.TempleName, image:i.Image, location: i.Location, coordinates: coordinates, totalMembers:i.TotalMembers});
            obj2.push({prayerType: i.PrayerType});
            obj3.push({firstService: i["1stService"],secondSecond: i["2ndService"],thirdService: i["3rdService"],fourthService: i["4thService"]});
        }
        const filtered = obj1.filter( (el) => {
            return el.templeName != null
        })        
        await templeModel.insertMany(
            filtered
        )
        let arr = []
        let totalPrayers = []
        const templeData = await templeModel.find()
        for(let i=0;i<filtered.length;i++){
            let k=1
            let alot = false;
            for(let j=0;j<k;j++){
                if(alot==false || j==0){
                    arr.push({"prayerType": obj2[0].prayerType, "templeId": templeData[i]._id});
                    obj2.shift(obj2[0]);
                    obj1.shift(obj1[0]);
                    alot=true;
                    k+=1;
                }else if(obj1.length!=0 && obj1[0].templeName==undefined){
                    arr.push({"prayerType": obj2[0].prayerType, "templeId": templeData[i]._id});
                    obj2.shift(obj2[0]);
                    obj1.shift(obj1[0]);
                    k+=1;
                }
            }
            totalPrayers.push(k-1)
        }
        templeData.map(async (ele, ind)=> {
            await templeModel.findByIdAndUpdate({_id: ele._id},{
                $set: {
                    totalPrayers: totalPrayers[ind]
                }})
        })
        await prayerModel.insertMany(arr);
        const data = await prayerModel.find()
        const record = data.map(record=>{
            return record._id
        })
        let services = []
        for(let i=0;i<obj3.length;i++){
            services.push({
                "prayerId": record[i],
                "firstService": obj3[i].firstService || null,
                "secondService": obj3[i].secondSecond || null,
                "thirdService": obj3[i].thirdService || null,
                "fourthService": obj3[i].fourthService || null
            })
        }
        await serviceModel.insertMany(services)
        const url = path.resolve('uploads', fileData.filename)
        fs.unlinkSync(url)
        return res.status(201).json({message: "Excel data extracted"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
} 

const deleteAll = async (req ,res) => {
    try {
        await templeModel.deleteMany({});
        await prayerModel.deleteMany({});
        await serviceModel.deleteMany({});
        return res.status(200).json({message: "Data deleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const getData = async (req, res) => {
    try {
        const data  = await templeModel.aggregate([{
            $lookup: {
              from: "prayer",
              as: "prayer",
              let: {temple: "$_id"},
              pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [{
                                $eq: ["$templeId","$$temple"]
                            }]
                        }
                    }
                },{
                    $lookup: {
                        from: "service",
                        let: {prayer: "$_id"},
                        as: "service",
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $and: [{
                                        $eq: ["$prayerId","$$prayer"]
                                    }]
                                }
                            }
                        }]
                    }
                }]
            }
          }])
        return res.json({message: data})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const spiritualFitness = async (req, res) => {
    try {
        const fileData = req.file
        var workBook = XLSX.readFile(req.file.path);
        let workSheet = workBook.SheetNames;
        var x = 0;
        let xlsxData;
        workSheet.forEach(element => {
            xlsxData = XLSX.utils.sheet_to_json(workBook.Sheets[workSheet[x]]);
            x++;
        })
        var age =[]
        var categories =[]
        var stud =[]
        var husband=[]
        var profession=[]
        var houseWife=[]
        var retire=[]
        var unmarried=[]
        var workingWomen=[]
        for (let i of xlsxData) {
            if(i.Age){
                age.push({age: i.Age});
            }
            if(i.Categories.includes('Default')){
                categories.push({category: i.Categories.split(':')[1].trim(), definition: i.Definition, frequency: i.Frequency, isPreDefined: true});
            }else {
                categories.push({category: i.Categories, definition: i.Definition, frequency: i.Frequency,});
            }
            if(i.Students && i.Students.includes('Default')){
                stud.push({categoryId: i.Students.split(':')[1].trim(), isPreDefined: true});
            }else if(i.Students) {
                stud.push({categoryId: i.Students});
            }
            if(i.Housewife && i.Housewife.includes('Default')){
                houseWife.push({categoryId: i.Housewife.split(':')[1].trim(), isPreDefined: true});
            }else if(i.Housewife) {
                houseWife.push({categoryId: i.Housewife});
            }
            if(i.Husband && i.Husband.includes('Default')){
                husband.push({categoryId: i.Husband.split(':')[1].trim(), isPreDefined: true});
            }else if(i.Husband) {
                husband.push({categoryId: i.Husband});
            }
            if(i["Retired person"] && i["Retired person"].includes('Default')){
                retire.push({categoryId: i["Retired person"].split(':')[1].trim(), isPreDefined: true});
            }else if(i["Retired person"]) {
                retire.push({categoryId: i["Retired person"]});
            }
            if(i.Unmarried && i.Unmarried.includes('Default')){
                unmarried.push({categoryId: i.Unmarried.split(':')[1].trim(), isPreDefined: true});
            }else if(i.Unmarried) {
                unmarried.push({categoryId: i.Unmarried});
            }
            if(i["Working women"] && i["Working women"].includes('Default')){
                workingWomen.push({categoryId: i["Working women"].split(':')[1].trim(), isPreDefined: true});
            }else if(i["Working women"]) {
                workingWomen.push({categoryId: i["Working women"]});
            }
            if(i["Profession Type"]){
                profession.push({profession: i["Profession Type"]})
            }
        }
        await ageModel.insertMany(age)
        await categoryModel.insertMany(categories);
        const categoryData = await categoryModel.find();
        for(let i of stud){
            for(let j=0;j<categoryData.length;j++){
                if(categoryData[j].category == i.categoryId){
                   i.categoryId = categoryData[j]._id
                }
            }
        }
        for(let i of houseWife){
            for(let j=0;j<categoryData.length;j++){
                if(categoryData[j].category == i.categoryId){
                   i.categoryId = categoryData[j]._id
                }
            }
        }
        for(let i of husband){
            for(let j=0;j<categoryData.length;j++){
                if(categoryData[j].category == i.categoryId){
                   i.categoryId = categoryData[j]._id
                }
            }
        }
        for(let i of retire){
            for(let j=0;j<categoryData.length;j++){
                if(categoryData[j].category == i.categoryId){
                   i.categoryId = categoryData[j]._id
                }
            }
        }
        for(let i of unmarried){
            for(let j=0;j<categoryData.length;j++){
                if(categoryData[j].category == i.categoryId){
                   i.categoryId = categoryData[j]._id
                }
            }
        }
        for(let i of workingWomen){
            for(let j=0;j<categoryData.length;j++){
                if(categoryData[j].category == i.categoryId){
                   i.categoryId = categoryData[j]._id
                }
            }
        }
        var data = []
        for(let i of profession){
            if(i.profession == 'Students'){
                i.professionType = stud
            } else if(i.profession == 'Housewife'){
                i.professionType = houseWife
            } else if(i.profession == 'Husband'){
                i.professionType = husband
            } else if(i.profession == 'Retired person'){
                i.professionType = retire
            } else if(i.profession == 'Unmarried'){
                i.professionType = unmarried
            } else {
                i.professionType = workingWomen
            }
            data.push(i)
        }
        await professionModel.insertMany(data)
        return res.status(201).json({message:"Data inserted successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = {
    addTemple,
    deleteAll,
    getData,
    spiritualFitness
}