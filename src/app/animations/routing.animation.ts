import { animation, style, animate } from '@angular/animations';

export const enterPage = animation(
  [
    style({ transform: 'translateX(-5000px)', opacity: 0 }),
    animate('{{ timing }}', style({ transform: 'translateX(0)', opacity: 1 }))
  ],
  { params: { timing: '250ms ease-in-out' } }
);

export const livePage = animation(
  [
    style({ transform: 'translateX(0)', opacity: '*' }),
    animate('{{ timing }}', style({ transform: 'translateX(5000px)', opacity: 0 }))
  ],
  { params: { timing: '250ms ease-in-out' } }
);
