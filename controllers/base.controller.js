import mongoose from 'mongoose';

class BaseController {
    constructor(model, populatetable = ''){
        this.model = model;
        this.populatetable = populatetable;
    }

    async create (req, res) {
        try {
           
            if(req.file){
                const urlImg = req.file.filename;
                const newBody = {...req.body, urlImg}
                const item = await this.model.create(newBody);
                const items = await this.model.find()
                res.status(201).json(items);
            }else{
                console.log(req.body)
                const item = await this.model.create(req.body);
                const items = await this.model.find()
                res.status(201).json(items);
            }

        }
        catch (err) {
            res.status(404).send({ message: err.message });
        }
    }

    async findById (req, res) {
        try {
            const {id} = req.params
            const _id =  new mongoose.Types.ObjectId(id);
            if(this.populatetable != ''){
                const item = await this.model.findById(_id).populate(this.populatetable);
                res.status(200).json(item);
            }else{
                const item = await this.model.findById(_id)
                res.status(200).json(item);
            }

        }
        catch (err) {
            res.status(404).send({ message: err.message });
        }
    }

    async findAll (req, res) {
        try {
            if(this.populatetable != ''){
                const item = await this.model.find().populate(this.populatetable);
                res.status(200).json(item);
            }else{
                const item = await this.model.find()
                res.status(200).json(item);
            }
        }
        catch (err) {
            res.status(404).send({ message: err.message });
        }
    }

    async updateById (req, res) {
        try {
            const {id} = req.params
            const _id =  new mongoose.Types.ObjectId(id);
            const updatedItem = await this.model.findByIdAndUpdate(_id, req.body, {new: true});
            const items = await this.model.find()
            res.status(201).json(items);
        }
        catch (err) {
            res.status(404).send({ message: err.message });
        }
    }

    async deleteById (req, res) {
        try{
            const {id} = req.params;
            const _id = new mongoose.Types.ObjectId(id);
            const deletedItem = await this.model.findByIdAndDelete(_id);
            const items = await this.model.find()
            res.status(201).json(items);

        }
        catch (err) {
            res.status(404).send({ message: err.message });
        }
    }
}

export default BaseController;