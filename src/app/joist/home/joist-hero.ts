import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface CutListRow {
  readonly item: string;
  readonly size: string;
  readonly qty: string;
}

/** Homepage hero (replaces the CMS Section1 banners). */
@Component({
  selector: 'app-joist-hero',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './joist-hero.html',
  styleUrl: './joist-hero.scss',
})
export class JoistHero {
  protected readonly cutList: readonly CutListRow[] = [
    { item: 'C16 treated joist', size: '47 × 150 × 3600 mm', qty: '× 8' },
    { item: 'C16 treated noggin', size: '47 × 150 × 2400 mm', qty: '× 6' },
    { item: 'Joist hanger', size: '47 mm', qty: '× 16' },
    { item: 'Decking screws', size: '4.5 × 60 mm, box of 250', qty: '× 2' },
  ];
}
