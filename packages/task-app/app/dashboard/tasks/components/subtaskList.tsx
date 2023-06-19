import Item from '@app/components/common/items';
import { getRandomId } from '@app/utils/uid';
import { subtask } from '@core/models';
import React from 'react';
import styles from '../../../style/animate.module.css';

interface SubtaskProps {
  subtask: subtask;
  // eslint-disable-next-line no-unused-vars
  onChange: (done: boolean, id: string) => void;
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
        subtask ?
          subtask.items.map((subT: { item: string, done: boolean }) => (
            <div className={styles.slideInAnimation} key={getRandomId()}>
              <Item handleDone={onChange} done={subT.done} itemid={subT.item}>
                {subT.item}
              </Item>
            </div>
          ))
          :
          <div className='flex flex-col justify-center items-center text-center gap-4 w-full'>
            <h2 className='text-lg font-medium'>
              ¡Oops! Parece que hay un pequeño problema 😅
            </h2>
            <p>
              🚫⚙️ Tarea inexistente
            </p>
            <p>
              📝 ¡Hola! notamos que no se ha seleccionado ninguna tarea o no se ha creado ninguna.
              Esto podría deberse a un olvido o a un malentendido.
            </p>
          </div>
      }
    </>
  );
}

export default SubtaskList;
