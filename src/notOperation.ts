import { SpecificationData } from '..';

export function notOperation(
  parentSpecData: SpecificationData,
): SpecificationData {
  const desc = `NOT (${parentSpecData.desc})`;

  const isSatisfiedBy = <T>(entity: T): boolean => {
    return !parentSpecData.isSatisfiedBy(entity);
  };

  return { desc, isSatisfiedBy };
}
