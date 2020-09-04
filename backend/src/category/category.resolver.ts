import { Query, Resolver } from '@nestjs/graphql';
import {CategoryService} from "./category.service";
import {CategoryModel} from "./category.model";
import {Category} from "./category.entity";

@Resolver()
export class CategoryResolver {

  constructor(private readonly categoryService: CategoryService) {
  }

  @Query(returns => [CategoryModel])
  async categories(): Promise<Category[]> {
    return this.categoryService.getAll();
  }
}
