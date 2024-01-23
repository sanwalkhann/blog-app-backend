/* eslint-disable prettier/prettier */

import { CategoryDocument } from "src/category/schemas/category.schema"







export class UpdateBlogDto{
    readonly title:string
    readonly content:string
    readonly createdAt:Date
    readonly category:CategoryDocument


}