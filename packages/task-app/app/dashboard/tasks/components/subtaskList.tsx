'use client';

import Item from '@app/components/common/items';
import { subtask } from '@core/models';
import React from 'react';
import styles from '../../../style/animate.module.css';

interface SubtaskProps {
  subtask: subtask;
  // eslint-disable-next-line no-unused-vars
  onChange: (done: boolean, id: string, item: string) => void;
}

function SubtaskList(
  {
    subtask,
    onChange
  }: SubtaskProps
) {

  return (
    <>
      {
        subtask.items.map((subT: { item: string, done: boolean, id: string }) => {
          return (
            <Item
              className={styles.slideInAnimation}
              key={subT.id}
              handleDone={onChange}
              done={subT.done}
              item={subT.item}
              itemId={subT.id}
            >
              {subT.item}
            </Item>
          );
        })
      }
    </>
  );
}

export default React.memo(SubtaskList);
