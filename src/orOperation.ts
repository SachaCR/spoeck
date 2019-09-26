import { SpecificationData, Specification } from '..';

export function orOperation(
  parentSpecData: SpecificationData,
  spec: Specification,
): SpecificationData {
  const desc = `${parentSpecData.desc} OR (${spec.desc})`;

  const isSatisfiedBy = <T>(entity: T): boolean => {
    return parentSpecData.isSatisfiedBy(entity) || spec.isSatisfiedBy(entity);
  };

  return { desc, isSatisfiedBy };
}
