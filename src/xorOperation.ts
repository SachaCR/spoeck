import { SpecificationData, Specification } from '..';

export function xorOperation(
  parentSpecData: SpecificationData,
  spec: Specification,
): SpecificationData {
  const desc = `${parentSpecData.desc} XOR (${spec.desc})`;

  const isSatisfiedBy = (entity: any): boolean => {
    return (
      (parentSpecData.isSatisfiedBy(entity) && !spec.isSatisfiedBy(entity)) ||
      (!parentSpecData.isSatisfiedBy(entity) && spec.isSatisfiedBy(entity))
    );
  };

  return { desc, isSatisfiedBy };
}
