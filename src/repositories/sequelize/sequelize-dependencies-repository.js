import { Dependency } from '../../../db/sequelize/models/dependency.js';

export class SequelizeDependenciesRepository {
    async create(data) {
        const dependency = await Dependency.create(data)
        return dependency ? dependency.dataValues : null
    }

    async createMany(data) {
        await Dependency.bulkCreate(data, {
            validate: true,
            returning: false
        });
        
        return {
            success: true
        }
    }

    async getById(id) {
        const result = await Dependency.findByPk(id)
        return result ? result.dataValues : null
    }

    async getBySchoolId(schoolId) {
        const result = await Dependency.findAll({
            where: {
                school_id: schoolId
            }
        })

        return result && result.length ? result.map(data => data.dataValues) : [] 
    }

    async getMany(page) {
        const pageSize = 20
        return await Dependency.findAll({
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [['nomesc', 'ASC']]
        });
    }

    async update(id, data) {
        const dependency = await Dependency.findByPk(id)
        let updatedDependency;

        if (dependency) {
            updatedDependency = await dependency.update(data)
        }

        return updatedDependency
    }

    async delete(id) {
        const target = await Dependency.findByPk(id)
        if (!target) {
            return null
        }

        await target.destroy()

        return true
    }
}