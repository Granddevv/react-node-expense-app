const mongoose = require('mongoose');
const _ = require('lodash');

class ControllerAbstract {
    constructor(modelName) {
        this.model = mongoose.model(modelName);
        this.name = modelName;
    }

    async listAll(req, res) {
        const entities = await this.model.find({});
        res.success({ data: entities });
    }

    async show(req, res) {
        const { id } = req.params;
        const entity = await this.model.findById(id);
        res.success({ data: entity });
    }

    async create(req, res) {
        const request = req.body;
        const entity = new this.model(request);

        await entity.save();
        res.success({ data: entity });
    }

    async update(req, res) {
        const { id } = req.params;
        const request = req.body;
        const entity = await this.model.findById(id);
        _.assign(entity, request);

        await entity.save();
        res.success({ data: entity })
    }

    async destroy(req, res) {
        const { id } = req.params;
        const entity = await this.model.findById(id);
        await entity.remove();
        res.success();
    }
}

module.exports = ControllerAbstract;