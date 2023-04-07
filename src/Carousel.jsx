import React, {
  useMemo, Children, useState, useLayoutEffect, useRef, useEffect,
} from 'react';
import './styles/carousel.css';

export default function Carousel({ children }) {
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(1);
  // const [translateX, setTranslateX] = useState(0);

  const btnHandler = (mode) => {
    containerRef.current.style.transition = 'all 500ms ease-in-out';

    if (mode === 'left') {
      if (current <= 1) {
        setCurrent((prev) => --prev);

        setTimeout(() => {
          setCurrent(children.length);
        }, 500);
      } else {
        setCurrent((prev) => --prev);
      }
    } else if (mode === 'right') {
      if (current >= children.length - 1) {
        setCurrent((prev) => ++prev);

        setTimeout(() => {
          setCurrent(-1);
        }, 500);
      } else {
        setCurrent((prev) => ++prev);
      }
    }
  };

  useEffect(() => {
    const transitionEnd = () => {
      if (current <= 1) {
        containerRef.current.style.transition = 'none';
      } else if (current >= children.length - 2) {
        containerRef.current.style.transition = 'none';
      }
    };
    document.addEventListener('transitionend', transitionEnd);

    return () => {
      document.removeEventListener('transitionend', transitionEnd);
    };
  }, [current]);

  const slides = useMemo(() => {
    if (children.length > 1) {
      // const items = Children.map(children, (child, index) => (
      //   <li className="slide" key={index}>
      //     {child}
      //   </li>
      // ));
      let items = [];
      for (let ile = 0; ile < children.length; ile++) {
        items = [
          ...items,
          <li className="slide" key={ile}>
            {children[ile]}
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

  // ' Postion first element correctly & this will render only once

  // useLayoutEffect(() => {
  //   setTranslateX(containerRef.current.clientWidth * current);
  // }, []);

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
