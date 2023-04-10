import React, { useMemo, useState, useRef } from 'react';
import './styles/carousel.css';

export default function Carousel({ children }) {
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(1);

  const btnHandler = (mode) => {
    containerRef.current.style.transitionDuration = '500ms';

    if (mode === 'left') {
      setCurrent((prev) => --prev);
      if (current <= 1) {
        setTimeout(() => {
          containerRef.current.style.transitionDuration = '0ms';
          setCurrent(children.length);
        }, 500);
      }
    } else if (mode === 'right') {
      setCurrent((prev) => ++prev);
      if (current >= children.length) {
        setTimeout(() => {
          containerRef.current.style.transitionDuration = '0ms';
          setCurrent(1);
        }, 500);
      }
    }
  };

  const slides = useMemo(() => {
    if (children.length > 1) {
      let items = [];
      for (let k = 0; k < children.length; k++) {
        items = [
          ...items,
          <li className="slide" key={k}>
            {children[k]}
          </li>,
        ];
      }
      return [
        <li className="slide" key={children.length + 1}>
          {children[children.length - 1]}
        </li>,
        ...items,
        <li className="slide" key={children.length + 2}>
          {children[0]}
        </li>,
      ];
    }

    return <li className="slide">{children[0]}</li>;
  }, [children]);

  return (
    <section className="carousel">
      <ul
        className="container"
        ref={containerRef}
        style={{
          transform: `translateX(${-100 * current}%)`,
          transition: 'all 500ms ease-in-out',
        }}
      >
        {slides}
      </ul>
      <button onClick={() => btnHandler('left')} className="btn btnLeft" type="button">
        {'<'}
      </button>
      <button onClick={() => btnHandler('right')} className="btn btnRight" type="button">
        {'>'}
      </button>
    </section>
  );
}
