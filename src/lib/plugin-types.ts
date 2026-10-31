import type { pluginTypes } from '../content.config';

export type PluginType = (typeof pluginTypes)[number];

export const pluginTypeLabel: Record<PluginType, string> = {
  'fusion-macro': 'Fusion macro',
  'fusion-template': 'Fusion template',
  script: 'Script',
  dctl: 'DCTL',
  lut: 'LUT',
  powergrade: 'PowerGrade',
};
