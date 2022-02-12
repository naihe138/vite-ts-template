type Fn = () => void;
export function useReport() {
  const click = (elemId: string, success?: Fn, fail?: Fn) => {
    console.log('click', elemId, success, fail);
  };
  const custom = (elemId: string, params: Record<string, any>, success?: Fn, fail?: Fn) => {
    console.log('click', elemId, params, success, fail);
  };
  return {
    clickReport: click,
    customReport: custom,
  };
}
