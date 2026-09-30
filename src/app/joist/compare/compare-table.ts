import { Product } from '@spartacus/core';

export interface CompareRow {
  readonly label: string;
  readonly values: readonly string[];
  /** True when at least two products have different values. */
  readonly differs: boolean;
}

export interface CompareSection {
  readonly title: string;
  readonly rows: readonly CompareRow[];
}

const MISSING = '—';

function stockLabel(product: Product): string {
  const status = product.stock?.stockLevelStatus;
  if (status === 'outOfStock') {
    return 'Out of stock';
  }
  if (status === 'lowStock') {
    return product.stock?.stockLevel ? `Low stock · ${product.stock.stockLevel} left` : 'Low stock';
  }
  if (status) {
    return product.stock?.stockLevel ? `In stock · ${product.stock.stockLevel}` : 'In stock';
  }
  return MISSING;
}

function row(label: string, values: string[]): CompareRow {
  return { label, values, differs: new Set(values).size > 1 };
}

/**
 * Builds the side-by-side table: an overview section, then one section per
 * classification with a row for every feature any product has. Feature order
 * follows first appearance across the products.
 */
export function buildCompareSections(products: readonly Product[]): CompareSection[] {
  const overview: CompareSection = {
    title: 'Overview',
    rows: [
      row('Price', products.map((p) => p.price?.formattedValue ?? MISSING)),
      row('Availability', products.map(stockLabel)),
      row('Rating', products.map((p) => (p.averageRating ? `${p.averageRating.toFixed(1)} / 5` : MISSING))),
      row('SKU', products.map((p) => p.code ?? MISSING)),
    ],
  };

  // classification name -> feature name -> per-product value
  const sections = new Map<string, Map<string, string[]>>();
  products.forEach((product, index) => {
    for (const classification of product.classifications ?? []) {
      const title = classification.name ?? 'Specification';
      const features = sections.get(title) ?? new Map<string, string[]>();
      sections.set(title, features);
      for (const feature of classification.features ?? []) {
        if (!feature.name) {
          continue;
        }
        const values = features.get(feature.name) ?? products.map(() => MISSING);
        const unit = feature.featureUnit?.unitType !== '300' ? feature.featureUnit?.symbol : undefined;
        const value = (feature.featureValues ?? [])
          .map((v) => v.value)
          .filter(Boolean)
          .join(', ');
        values[index] = value ? (unit ? `${value} ${unit}` : value) : MISSING;
        features.set(feature.name, values);
      }
    }
  });

  return [
    overview,
    ...[...sections.entries()].map(([title, features]) => ({
      title,
      rows: [...features.entries()].map(([label, values]) => row(label, values)),
    })),
  ];
}
