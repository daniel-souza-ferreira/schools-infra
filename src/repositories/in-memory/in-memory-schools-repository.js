
import { randomUUID } from 'node:crypto'

export class InMemorySchoolsRepository {
    items = [];

    async create(data) {
        const school = {
            id: randomUUID(),
            ...data
        }

        this.items.push(school)
        return school
    }

    async createMany(dataList) {
        this.items.push(dataList.map(data => {
            return {
                id: randomUUID(),
                ...data
            }
        }))
        
        return {
            success: true
        }
    }

    async getById(id) {
        return this.items.find(school => school.id === id)
    }

    async getMany(page) {
        const pageSize = 20
        return this.items
            .slice((page - 1) * pageSize, page * pageSize)
    }

    async update(id, data) {
        const targetSchoolIndex = this.items.findIndex(school => school.id === id)
        if (targetSchoolIndex >= 0) {
            this.items[targetSchoolIndex] = data
            this.items[targetSchoolIndex].id = id
        }

        return data
    }

    async delete(id) {
        const targetSchoolIndex = this.items.findIndex(school => school.id === id)
        if (targetSchoolIndex < 0) {
            return null
        }

        this.items.splice(targetSchoolIndex, 1)

        return true
    }
}