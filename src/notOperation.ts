import { Specification, SpecificationData, SpecificationResult } from './buildSpec';

export function notOperation(parentSpec: Specification, name: string): SpecificationData {
  const desc = `NOT (${parentSpec.desc})`;

  const isSatisfiedBy = (entity: any): SpecificationResult => {
    const parentResult = parentSpec.isSatisfiedBy(entity);

    return {
      name,
      desc,
      value: !parentResult.value,
      details: [
        {
          name,
          desc,
          value: !parentResult.value,
        },
      ],
    };
  };

  return { desc, name, isSatisfiedBy };
}
