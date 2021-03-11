import { useEffect, useState } from "react";

import styles from "../styles/Parallel.module.css";

export default function Hello() {
  // body
  useEffect(() => {
    document.querySelector("body").classList.add(styles.body);
  }, [true]);

  // width
  const [width, setWidth] = useState(0);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    window.addEventListener("DOMContentLoaded", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
      window.removeEventListener("DOMContentLoaded", handleWindowSizeChange);
    };
  }, [handleWindowSizeChange, width]);

  // section
  const [sectionIndex, setSectionIndex] = useState(1);
  const [sectionNumber, setSectionNumber] = useState(4);
  const insection = (num) => {
    return width >= 1000
      ? {
          zIndex: sectionIndex,
          // transform: `translateY(-${(sectionNumber - sectionIndex) * 100}%)`,
          transform: `translateY(${
            2 * (num - 1) * 100 * -1 + (sectionIndex - 1) * 100
          }%)`,
        }
      : {};
  };

  const tosection =
    width >= 1000
      ? {
          zIndex: sectionIndex,
          transform: `translateY(${(sectionIndex - 1) * 100 * -1}%)`,
        }
      : {};

  return (
    <section>
      <nav className={styles.navigator}>
        <button
          onClick={() => {
            setSectionIndex(1);
          }}
        >
          1
        </button>
        <button
          onClick={() => {
            setSectionIndex(2);
          }}
        >
          2
        </button>
        <button
          onClick={() => {
            setSectionIndex(3);
          }}
        >
          3
        </button>
        <button
          onClick={() => {
            setSectionIndex(4);
          }}
        >
          4
        </button>

        <div>index: {sectionIndex}</div>
      </nav>

      {/* <aside className={styles.imageSlider}>
        <div className={styles.imageWrapper}>sou 1</div>
        <div className={styles.imageWrapper}>sou 2</div>
        <div className={styles.imageWrapper}>sou 3</div>
        <div className={styles.imageWrapper}>sou 4</div>
      </aside> */}

      <section id="intro-section" className={styles.section}>
        <div className={[styles.imageWrapper]} style={insection(1)}>
          sou 1
        </div>
        <div className={styles.contentWrapper} style={tosection}>
          sou 1
        </div>
      </section>

      <section id="intro-section" className={styles.section}>
        <div className={styles.imageWrapper} style={insection(2)}>
          sou 2
        </div>
        <div className={styles.contentWrapper} style={tosection}>
          sou 2
        </div>
      </section>

      <section id="intro-section" className={styles.section}>
        <div className={styles.imageWrapper} style={insection(3)}>
          sou 3
        </div>
        <div className={styles.contentWrapper} style={tosection}>
          sou 3
        </div>
      </section>

      <section id="intro-section" className={styles.section}>
        <div className={styles.imageWrapper} style={insection(4)}>
          sou 4
        </div>
        <div className={styles.contentWrapper} style={tosection}>
          sou 4
        </div>
      </section>
    </section>
  );
}
