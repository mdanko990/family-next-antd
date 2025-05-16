import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const useKeyPress = (keys: string[], callback:any, node = null) => {
    console.log("presses")
    const callbackRef = useRef(callback);  useLayoutEffect(() => {
      callbackRef.current = callback;
    });  const handleKeyPress = useCallback((event: any) => {
      if (keys.some((key: string) => event.key === key)) {
        callbackRef.current(event);
      }
    }, [keys]);  useEffect(() => {
      const targetNode = node ?? document;
      if (targetNode) {
        targetNode.addEventListener('keydown', handleKeyPress);
        return () => targetNode.removeEventListener('keydown', handleKeyPress);
      }
    }, [handleKeyPress, node]);
  };export default useKeyPress;