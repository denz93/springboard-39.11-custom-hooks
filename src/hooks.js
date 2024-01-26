import { useCallback, useState } from "react";

export function useFlip() {
  const [state, setState] = useState(false);
  const flip = useCallback(() => setState(state => !state), []);
  return [state, flip];
}