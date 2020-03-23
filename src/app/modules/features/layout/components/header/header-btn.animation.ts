import { animation, style, animate } from '@angular/animations';

export const enterAnimation = animation(
  [style({ flexBasis: 0, opacity: 0 }), animate('{{ timing }}', style({ flexBasis: '*', opacity: 1 }))],
  { params: { timing: '150ms ease-in-out' } }
);

export const liveAnimation = animation(
  [style({ flexBasis: '*', opacity: '*' }), animate('{{ timing }}', style({ flexBasis: 0, opacity: 0 }))],
  { params: { timing: '150ms ease-in-out' } }
);
