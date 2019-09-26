import { SpecificationData } from '..';

export function notOperation(
  parentSpecData: SpecificationData,
): SpecificationData {
  const desc = `NOT (${parentSpecData.desc})`;

  const isSatisfiedBy = (entity: any): boolean => {
    return !parentSpecData.isSatisfiedBy(entity);
  };

  return { desc, isSatisfiedBy };
}
