interface IScrollNumberItemProps {
  value: number;
  transformDuration: number;
}

import { useState, useMemo, useRef, useEffect } from "react";
import { easeInOutCubic } from "../utils";
import style from "./ScrollNumberItem.module.css";
export default function ScrollNumber(props: IScrollNumberItemProps) {
  const [currentV, setCurrentV] = useState(props.value % 10);
  const startV = useRef(props.value);
  const endV = useRef(props.value);

  const topValue = useMemo(() => Math.floor(currentV), [currentV]);
  const bottomValue = useMemo(() => Math.floor(currentV) + 1, [currentV]);

  const styleTop = useMemo(
    () => ({
      transform: `translateY(${(currentV - topValue) * 100 * -1}%)`,
      opacity: 1 - Math.abs(currentV - topValue),
    }),
    [currentV, topValue]
  );
  const styleBottom = useMemo(
    () => ({
      transform: `translateY(${(bottomValue - currentV) * 100}%)`,
      opacity: Math.abs(currentV - topValue),
    }),
    [bottomValue, currentV, topValue]
  );

  const isTransitioning = useRef(false);
  const startTime = useRef<number | null>(null);
  const rAF = useRef<number | null>(null);
  function calcCurrrntValue(time: number) {
    isTransitioning.current = true;
    if (!startTime.current) {
      startTime.current = time;
    }
    const progress = (time - startTime.current) / props.transformDuration;
    if (progress > 1) {
      cancelAnimationFrame(endV.current);
      return;
    }
    setCurrentV(
      easeInOutCubic(
        time - startTime.current,
        startV.current,
        endV.current - startV.current,
        props.transformDuration
      ) % 10
    );
    rAF.current = requestAnimationFrame(calcCurrrntValue);
  }

  function cancelAnimationFrame(endValue: number) {
    if (rAF.current) {
      window.cancelAnimationFrame(rAF.current);
      rAF.current = null;
      setCurrentV(endValue % 10);
      startTime.current = null;
      isTransitioning.current = false;
    }
  }
  function startScroll() {
    rAF.current = requestAnimationFrame(calcCurrrntValue);
  }

  function requestAnimationFrame(cb: FrameRequestCallback) {
    return window.requestAnimationFrame(cb);
  }

  useEffect(() => {
    if (isTransitioning.current) {
      startV.current = currentV;
      endV.current = props.value;
      startTime.current = null;
    } else {
      startV.current = endV.current;
      endV.current = props.value;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      startV.current !== endV.current && startScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);
  return (
    <div className={style["scroll-item-wrapper"]}>
      <div style={{ opacity: 0, display: "inline-block" }}>{topValue}</div>
      <div className={style["scroll-numbers"]} style={styleTop}>
        {topValue}
      </div>
      <div className={style["scroll-numbers"]} style={styleBottom}>
        {bottomValue}
      </div>
    </div>
  );
}
