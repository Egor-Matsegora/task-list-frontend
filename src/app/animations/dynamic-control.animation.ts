import { animation, style, animate } from '@angular/animations';

export const enterAnimation = animation(
  [
    style({ height: 0, opacity: 0, padding: 0 }),
    animate('{{ timing }}', style({ height: '*', opacity: '*', padding: '*' }))
  ],
  { params: { timing: '150ms 30ms ease-in-out' } }
);

export const leaveAnimation = animation(
  [
    style({ height: '*', opacity: '*', padding: '*' }),
    animate('{{ timing }}', style({ height: 0, opacity: 0, padding: 0 }))
  ],
  { params: { timing: '150ms 30ms ease-in-out' } }
);
