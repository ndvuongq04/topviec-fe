// src/types/common.types.ts
export interface RestResponse<T> {
    statusCode: number
    error: string | null
    message: string | string[]
    data: T
}