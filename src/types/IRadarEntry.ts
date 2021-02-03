export interface IRadarEntry {
  ring: number;
  label: string;
  link?: string;
  active: boolean;
  visible: boolean;
  quadrant: number;
  moved: number;
  id: number;
  // @TODO remove any
  segment?: any;
  x?: number;
  y?: number;
  color?: string;
}
