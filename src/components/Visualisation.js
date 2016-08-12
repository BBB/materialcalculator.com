import React, { PropTypes } from 'react';

const Visualisation = (props) => {
  const { areas, maxSize } = props;
  const styles = require('./Visualisation.scss');
  if (areas.length < 1) {
    return null;
  }
  let SCALE_FACTOR = 1;
  if (Math.max(areas[0].w, areas[0].h) === areas[0].w) {
    SCALE_FACTOR = maxSize.w / areas[0].w;
  }
  if (Math.max(areas[0].w, areas[0].h) === areas[0].h) {
    SCALE_FACTOR = maxSize.h / areas[0].h;
  }
  console.log('SCALE_FACTOR', SCALE_FACTOR);
  if (SCALE_FACTOR === 0) {
    return null;
  }
  return (
    <div>
      {areas.map((area, ix) => (
        <svg key={ix} viewBox={`0 0 ${areas[0].w * SCALE_FACTOR} ${areas[0].h * SCALE_FACTOR}`}>
          <defs>
            <filter id="fuzzyStroke" height="2" width="2">
              <feTurbulence baseFrequency="0.4" numOctaves="8" type="fractalNoise" />
              <feDisplacementMap scale="2" xChannelSelector="R" in="SourceGraphic" />
            </filter>
            <pattern id="diagonalHatch" width="10" height="10" patternTransform="rotate(42 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="10" style={{ stroke: 'rgba(255,255,255, 0.2)', strokeWidth: 3 }} />
            </pattern>
            <radialGradient id="radialGradient" cx=".5" cy=".5" r=".5">
              <stop offset="0.5" stopColor="white" stopOpacity="1"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </radialGradient>
            <mask id="fade" maskContentUnits="objectBoundingBox">
              <rect width="1" height="1" fill="url(#radialGradient)"/>
            </mask>
          </defs>
          <rect
            className={styles.Area}
            x="0"
            y="0"
            width={area.w * SCALE_FACTOR}
            height={area.h * SCALE_FACTOR}
            style={{ filter: 'url(#fuzzyStroke)'}}
          >
          </rect>
          {area.blocks.map((block, ix2) => {
            return (
              <g
                key={ix2}
              >
                <rect
                  className={styles.CutBorder + ''}
                  y={block.fit.y * SCALE_FACTOR}
                  x={block.fit.x * SCALE_FACTOR}
                  width={block.w * SCALE_FACTOR}
                  height={block.h * SCALE_FACTOR}
                  style={{
                    filter: 'url(#fuzzyStroke)',
                  }}
                >
                </rect>
                <rect
                  className={styles.CutFiller + ''}
                  y={block.fit.y * SCALE_FACTOR}
                  x={block.fit.x * SCALE_FACTOR}
                  width={block.w * SCALE_FACTOR}
                  height={block.h * SCALE_FACTOR}
                  transform={`rotate(${(ix / 10) * 30} ${block.fit.x + (block.w / 2)} ${block.fit.y + (block.h / 2)})`}
                  style={{
                    fill: 'url(#diagonalHatch)',
                    mask: 'url(#fade)',
                  }}
                >
                </rect>
              </g>
            );
          })}
        </svg>
      ))}
    </div>
  );
};

Visualisation.propTypes = {
  areas: PropTypes.array.isRequired,
  maxSize: PropTypes.object.isRequired,
};

export default Visualisation;
