import React, { useEffect } from 'react';

const Cursor = () => {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    if (!cursor || !ring) return;
    
    let mx = 0, my = 0, rx = 0, ry = 0;
    
    const onMouseMove = (e) => {
      mx = e.clientX; 
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    };
    
    document.addEventListener('mousemove', onMouseMove);
    
    let animationFrameId;
    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      animationFrameId = requestAnimationFrame(animRing);
    };
    animRing();

    const addHoverEffect = () => {
      document.querySelectorAll('a,button,.service-card,.country-card').forEach(el => {
        el.addEventListener('mouseenter', () => { 
          cursor.style.transform = 'translate(-50%,-50%) scale(2)'; 
          ring.style.opacity = '0.8'; 
        });
        el.addEventListener('mouseleave', () => { 
          cursor.style.transform = 'translate(-50%,-50%) scale(1)'; 
          ring.style.opacity = '0.4'; 
        });
      });
    };
    
    // Slight delay to allow components to render
    const timeoutId = setTimeout(addHoverEffect, 500);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursorRing"></div>
    </>
  );
};

export default Cursor;
