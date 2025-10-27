import { School } from '../../../db/sequelize/models/school.js';

export class SequelizeSchoolsRepository {
    async create(data) {
        const school = await School.create(data)
        return school ? school.dataValues : null
    }

    async createMany(dataList) {
        await School.bulkCreate(dataList, {
            validate: true,
            returning: false
        });
        
        return {
            success: true
        }
    }

    async getById(id) {
        const result = await School.findByPk(id)
        return result ? result.dataValues : null
    }

    async getMany(page) {
        const pageSize = 20
        return await School.findAll({
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [['nomesc', 'ASC']]
        });
    }

    async update(id, data) {
        const school = await School.findByPk(id)
        let updatedSchool;

        if (school) {
            updatedSchool = await school.update(data)
        }

        return updatedSchool
    }

    async delete(id) {
        const target = await School.findByPk(id)
        if (!target) {
            return null
        }

        await target.destroy()

        return true
    }
}