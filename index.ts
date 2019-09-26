import { andOperation } from './src/andOperation';
import { orOperation } from './src/orOperation';
import { xorOperation } from './src/xorOperation';
import { notOperation } from './src/notOperation';

export interface SpecificationData {
  desc: string;
  isSatisfiedBy: <T>(entity: T) => boolean;
}

export interface Specification {
  desc: string;
  isSatisfiedBy: <T>(entity: T) => boolean;
  and: (spec: Specification) => Specification;
  or: (spec: Specification) => Specification;
  xor: (spec: Specification) => Specification;
  not: () => Specification;
}

export function createSpec(specData: SpecificationData): Specification {
  return {
    desc: specData.desc,
    isSatisfiedBy: specData.isSatisfiedBy,
    and: (spec: Specification): Specification => {
      return createSpec(andOperation(specData, spec));
    },
    or: (spec: Specification): Specification => {
      return createSpec(orOperation(specData, spec));
    },
    xor: (spec: Specification): Specification => {
      return createSpec(xorOperation(specData, spec));
    },
    not: (): Specification => {
      return createSpec(notOperation(specData));
    },
  };
}
