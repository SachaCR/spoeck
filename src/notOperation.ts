import { Specification, SpecificationData, SpecificationResult } from '..';

export function notOperation(parentSpec: Specification, name: string): SpecificationData {
  const desc = `NOT (${parentSpec.desc})`;

  const isSatisfiedBy = <T>(entity: T): SpecificationResult => {
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
