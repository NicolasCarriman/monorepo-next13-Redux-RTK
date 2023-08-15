import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const AnimatedList: React.FC = () => {
  const [isListVisible, setIsListVisible] = useState(false);

  const animationProps = useSpring({
    opacity: isListVisible ? 1 : 0,
    maxHeight: isListVisible ? '250px' : '0px',
    config: {
      tension: 280,
      friction: 60
    }
  });

  return (
    <div>
      <button onClick={() => setIsListVisible(prev => !prev)}>Toggle List</button>
      <animated.div style={animationProps}>
        <div>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </div>
      </animated.div>
    </div>
  );
}

export default AnimatedList;
