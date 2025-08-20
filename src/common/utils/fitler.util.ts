import { BadGatewayException } from "@nestjs/common";
import { FindOptionsWhere, In, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not } from "typeorm";

export function buildWhereCondition(filters: Record<string, any>) {
  let whereClause: FindOptionsWhere<any> = {};

  for (const key in filters) {
    const filterValue = filters[key];

    if (typeof filterValue !== 'object' || filterValue === null) {
      whereClause[key] = filterValue;
      continue;
    }

    if (typeof filterValue === 'object') {
      for (const operator in filterValue) {
        const opValue = filterValue[operator];

        switch (operator) {
          case '$eq':
            whereClause[key] = opValue;
            break;
          case '$ne':
            whereClause[key] = Not(opValue);
            break;
          case '$gt':
            whereClause[key] = MoreThan(opValue);
            break;
          case '$lt':
            whereClause[key] = LessThan(opValue);
            break;
          case '$gte':
            whereClause[key] = MoreThanOrEqual(opValue);
            break;
          case '$lte':
            whereClause[key] = LessThanOrEqual(opValue);
            break;
          case '$like':
            whereClause[key] = Like(`%${opValue}%`)
            break;
          case '$%like':
            whereClause[key] = Like(`%${opValue}`);
            break;
          case '$like%':
            whereClause[key] = Like(`${opValue}%`);
            break;
          case '$in':
            if (!Array.isArray(opValue)) {
              throw new BadGatewayException(`Filter for ${key} must be array.`);
            }
            whereClause[key] = In(opValue);
            break;
          case '$nin':
            if (!Array.isArray(opValue)) {
              throw new BadGatewayException(`Filter for ${key} must be array.`);
            }
            whereClause[key] = Not(In(opValue));
            break;
          case '$is_null':
            whereClause[key] = null;
            break;
          case '$is_not_null':
            whereClause[key] = Not(null);
            break;
          case '$between':
            if (!Array.isArray(opValue) || opValue.length !== 2) {
              throw new BadGatewayException(`Filter for ${key} must be an array of two elements.`);
            }
            whereClause[key] = MoreThanOrEqual(opValue[0]);
            whereClause[key] = LessThanOrEqual(opValue[1]);
            break;
          case '$not_between':
            if (!Array.isArray(opValue) || opValue.length !== 2) {
              throw new BadGatewayException(`Filter for ${key} must be an array of two elements.`);
            }
            whereClause[key] = Not(MoreThanOrEqual(opValue[0]));
            whereClause[key] = Not(LessThanOrEqual(opValue[1]));
            break;
          default:
            console.warn(`Unsupported operator: ${operator}`);
            break;
        }
      }
    }
  }
  return whereClause;
}
