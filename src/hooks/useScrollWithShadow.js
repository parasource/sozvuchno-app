import { useState } from "react";

export function useScrollWithShadow() {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  const onScrollHandler = (event) => {
    setScrollTop(event.target.scrollTop);
    setScrollHeight(event.target.scrollHeight);
    setClientHeight(event.target.clientHeight);
  };

  function getBoxShadow() {
    const isTop = scrollTop <= 0;
    const isBetween = scrollTop > 0 && clientHeight < scrollHeight - scrollTop;

    let boxShadowClass = '';

    if (isTop || isBetween) {
      boxShadowClass = 'bottom';
    } 

    return boxShadowClass;
  }

  return { boxShadow: getBoxShadow(), onScrollHandler };
}
