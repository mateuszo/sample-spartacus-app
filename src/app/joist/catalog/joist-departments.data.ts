/**
 * Joist departments shown on the homepage and in the footer.
 * Each links to a storefront search until the catalogue carries matching
 * categories; swap `query` for a category route when it does.
 */
export interface JoistDepartment {
  readonly name: string;
  readonly detail: string;
  readonly icon: string;
  readonly query: string;
}

export const JOIST_DEPARTMENTS: readonly JoistDepartment[] = [
  { name: 'Timber & sheet', detail: 'Treated, planed, ply and OSB', icon: 'fa-ruler-combined', query: 'timber' },
  { name: 'Tools', detail: 'Power tools, hand tools, storage', icon: 'fa-screwdriver-wrench', query: 'tools' },
  { name: 'Fixings', detail: 'Screws, nails, anchors, brackets', icon: 'fa-toolbox', query: 'fixings' },
  { name: 'Paint & decorating', detail: 'Paint, fillers, brushes, rollers', icon: 'fa-paint-roller', query: 'paint' },
  { name: 'Plumbing & heating', detail: 'Pipe, fittings, taps, radiators', icon: 'fa-faucet', query: 'plumbing' },
  { name: 'Electrical', detail: 'Cable, sockets, switches, lighting', icon: 'fa-plug', query: 'electrical' },
  { name: 'Building materials', detail: 'Blocks, cement, aggregates, lintels', icon: 'fa-trowel-bricks', query: 'building' },
  { name: 'Garden & landscaping', detail: 'Decking, fencing, sleepers, paving', icon: 'fa-seedling', query: 'garden' },
];
