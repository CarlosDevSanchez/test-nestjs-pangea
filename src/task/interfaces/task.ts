export type Status = 'PENDING' | 'IN_PROGRESS' | 'DONE'

export interface Task {
    id: string
    code: number
    name: string
    description: string
    status: Status
}

export interface TaskAllWithPagination{
    data: Task[]
    page: number
    take: number
    nextPage: number
    prevPage: number
    lastPage: number
}