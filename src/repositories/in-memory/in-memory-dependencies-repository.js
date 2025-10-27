import { randomUUID } from 'node:crypto'

export class InMemoryDependenciesRepository {
    items = []

    async create(data) {
        const dependency = {
            id: randomUUID(),
            ...data
        }

        this.items.push(dependency)
        return dependency
    }

    async createMany(data) {
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
        return this.items.find(item => item.id === id)
    }

    async getBySchoolId(schoolId) {
        return this.items.filter(item => item.school_id === schoolId)
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
        const targetIndex = this.items.findIndex(school => school.id === id)
        if (targetIndex < 0) {
            return null
        }

        this.items.splice(targetIndex, 1)

        return true
    }
}