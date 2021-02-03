import { RingType } from './RingType';

export interface IEntry {
  ring: RingType;
  label: string;
  link?: string;
  tags: string[];
  active?: boolean;
  visible?: boolean;
  moved?: number;
}
