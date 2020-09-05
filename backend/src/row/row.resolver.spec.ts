import { Test, TestingModule } from '@nestjs/testing';
import { RowResolver } from './row.resolver';
import {RowService} from "./row.service";

describe('RowResolver', () => {
  let resolver: RowResolver;

  it('Dummy test for now', () => {
    expect('🍕').toBe('🍕');
  });
});
