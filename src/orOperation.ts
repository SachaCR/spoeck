import { SpecificationData, Specification } from '..';

export function orOperation(
  parentSpecData: SpecificationData,
  spec: Specification,
): SpecificationData {
  const desc = `${parentSpecData.desc} OR (${spec.desc})`;

  const isSatisfiedBy = (entity: any): boolean => {
    return parentSpecData.isSatisfiedBy(entity) || spec.isSatisfiedBy(entity);
  };

  return { desc, isSatisfiedBy };
}
