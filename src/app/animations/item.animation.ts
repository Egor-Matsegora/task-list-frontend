import { animation, animate, style } from '@angular/animations';

export const removeAnimation = animation(
  [
    style({ transform: 'translateX(0)' }),
    animate('{{ timing }}', style({ transform: 'translateX(110%)' })),
    animate('{{ timing }}', style({ height: '0', opacity: '0' }))
  ],
  { params: { timing: '150ms ease-in-out' } }
);

export const addAnimation = animation(
  [style({ height: '0', opacity: '0' }), animate('{{ timing }}', style({ height: '*', opacity: '*' }))],
  { params: { timing: '150ms ease-in-out' } }
);
