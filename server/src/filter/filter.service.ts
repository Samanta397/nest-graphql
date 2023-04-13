import { Injectable } from '@nestjs/common';

@Injectable()
export class FilterService {
  buildFilter(filter, fieldName, variableName) {
    const [operator, value] = Object.entries(filter)[0];

    switch (operator) {
      case 'eq':
        return ({condition: `${fieldName} = :${variableName}`, variables: {[variableName]: value}})
      case 'gt':
        return ({condition: `${fieldName} > :${variableName}`, variables: {[variableName]: value}})
      case 'gte':
        return ({condition: `${fieldName} >= :${variableName}`, variables: {[variableName]: value}})
      case 'lt':
        return ({condition: `${fieldName} < :${variableName}`, variables: {[variableName]: value}})
      case 'lte':
        return ({condition: `${fieldName} <= :${variableName}`, variables: {[variableName]: value}})
      case 'like':
        return ({condition: `${fieldName} LIKE :${variableName}`, variables: {[variableName]: value}})
      case 'neq':
        return ({condition: `${fieldName} NOT LIKE :${variableName}`, variables: {[variableName]: value}})
    }
  }
}
