import { buildSpec, Specification, SpecificationResult } from './buildSpec';

export interface SpecificationDefinition<T> {
  desc: string;
  name: string;
  isSatisfiedBy: (entity: T) => {
    value: boolean;
    details?: Array<{
      value: boolean;
      desc: string;
      name: string;
    }>;
  };
}

export function defineSpecification<T>(
  definition: SpecificationDefinition<T>,
): Specification<T> {

  return buildSpec({
    name: definition.name,
    desc: definition.desc,
    isSatisfiedBy: (entity: T): SpecificationResult => {
      const isSatisfied = definition.isSatisfiedBy(entity);

      const defaultDetails = [
        {
          name: definition.name,
          value: isSatisfied.value,
          desc: definition.desc,
        },
      ];

      return {
        name: definition.name,
        value: isSatisfied.value,
        desc: definition.desc,
        details: isSatisfied.details ? isSatisfied.details : defaultDetails
      };
    },
  });
}
