'use client';

import React, { HTMLAttributes } from 'react';

interface TabProps extends HTMLAttributes<HTMLLabelElement> {
  selected: boolean;
}
function Tab(props: TabProps) {

  const tabStyle = props.selected ?
                    'p-2 text-white z-10 rounded-lg transition-all text-sm duration-500 bg-blue-200'
                  :
                    'p-2 text-gray-400 z-10 transition-all duration-500 text-sm';

  return (
    <label
      className={tabStyle}
      {...props}
    >
      <div>
        <p>
          {props.children}
        </p>
      </div>
    </label>
  );
}

export default Tab;
