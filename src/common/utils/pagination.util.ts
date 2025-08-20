import { ObjectLiteral, Repository } from "typeorm";

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[],
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  }
}

export async function paginate<T extends ObjectLiteral>(
  repository: Repository<T>,
  options: PaginationOptions,
) {
  const page = options.page ? Math.max(1, options.page) : 1;
  const limit = options.limit ? Math.max(1, options.limit) : 10;
  const skip = (page - 1) * limit;

  const [data, totalItems] = await repository.findAndCount({
    take: limit,
    skip: skip
  })

  const totalPages = Math.ceil(totalItems / limit);
  const itemCount = data.length;

  return {
    data,
    meta: {
      total: totalItems,
      itemCount,
      itemsPerPage: limit,
      totalPages,
      currentPage: page,
    }
  }
}
