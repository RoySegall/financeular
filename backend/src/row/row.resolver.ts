import {Query, Resolver} from '@nestjs/graphql';
import {RowService} from "./row.service";
import {Row} from "./row.entity";
import {RowModel} from "./row.model";

@Resolver()
export class RowResolver {

  constructor(private readonly rowService: RowService) {
  }

  @Query(returns => [RowModel])
  rows(): Promise<Row[]> {
    return this.rowService.getAll();
  }

}
