import type { DataModel } from '@toolpad/core/Crud';

export interface Book extends DataModel {
    title: string,
    isbn: string,
    author: string,
    publisher: string,
    category_id: number,
    quantity: number
}