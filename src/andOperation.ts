import { SpecificationData, Specification } from '..';

export function andOperation(
  parentSpecData: SpecificationData,
  spec: Specification,
): SpecificationData {
  const desc = `${parentSpecData.desc} AND (${spec.desc})`;

  const isSatisfiedBy = (entity: any): boolean => {
    return parentSpecData.isSatisfiedBy(entity) && spec.isSatisfiedBy(entity);
  };

  return { desc, isSatisfiedBy };
}
