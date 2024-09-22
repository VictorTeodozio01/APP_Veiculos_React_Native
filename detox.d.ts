// detox.d.ts
declare module 'detox' {
    export function element(selector: any): any;
  
    export const by: {
      id: (id: string) => any;
      text: (text: string) => any;
      label: (label: string) => any;
      // adicione outros seletores que você deseja usar
    };
  }
  