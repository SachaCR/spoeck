import { SpecificationData, Specification, SpecificationResult } from '..';

export function orOperation(
  parentSpecData: Specification,
  spec: Specification,
  name: string,
): SpecificationData {
  const desc = `${parentSpecData.desc} OR (${spec.desc})`;

  const isSatisfiedBy = (entity: any): SpecificationResult => {
    const parentResult = parentSpecData.isSatisfiedBy(entity);
    const childResult = spec.isSatisfiedBy(entity);

    const details: Array<{
      value: boolean;
      desc: string;
      name: string;
    }> = [];

    return {
      name,
      desc,
      value: parentResult.value || childResult.value,
      details: details.concat(parentResult.details || []).concat(childResult.details || []),
    };
  };

  return { desc, name, isSatisfiedBy };
}
