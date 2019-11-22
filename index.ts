import { buildSpec, Specification, SpecificationResult } from './src/buildSpec';

export interface SpecificationDefinition {
  desc: string;
  name: string;
  isSatisfiedBy: (entity: any) => boolean;
}

export function defineSpecification(
  definition: SpecificationDefinition,
): Specification {
  return buildSpec({
    name: definition.name,
    desc: definition.desc,
    isSatisfiedBy: (entity: any): SpecificationResult => {
      const isSatisfied = definition.isSatisfiedBy(entity);

      return {
        name: definition.name,
        value: isSatisfied,
        desc: definition.desc,
        details: [
          {
            name: definition.name,
            value: isSatisfied,
            desc: definition.desc,
          }
        ],
      };
    },
  });
}
