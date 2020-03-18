import { animation, style, animate } from '@angular/animations';

export const enterAnimation = animation([style({ height: 0 }), animate('{{ timing }}', style({ height: '*' }))], {
  params: { timing: '150ms ease-in-out' }
});

export const leaveAnimation = animation([style({ height: '*' }), animate('{{ timing }}', style({ height: '0' }))], {
  params: { timing: '150ms ease-in-out' }
});
