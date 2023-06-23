import Input from '@app/components/common/input';
import List from '@app/components/common/list';
import React, { useState } from 'react';

// eslint-disable-next-line no-unused-vars
export type onClickCallBack = (name:string) => void;

interface InputSeacrhProps {
  data: unknown[];
  //eslint-disable-next-line
  disabled?: boolean
  // eslint-disable-next-line no-unused-vars
  render: (item: any, arg: onClickCallBack) => React.ReactNode;
  placeHolder: string;
  name?: string;
}

function InputSearch({
  data,
  disabled = false,
  render,
  placeHolder,
  name
}: InputSeacrhProps) {
  const [value, setValue] = useState('');
  const [showList, setShowList] = useState(false);
  const [ isHover, setIsHover] = useState(false);

  const handleShow = () => setShowList((state) => !state);

  const handleClick = (name: string) => {
    setValue(name);
    setShowList(false);
  };

  return (
    <div className='flex '>
      <Input name={name} required onBlur={() => !isHover && setShowList(false)} placeholder={placeHolder} type="text" onClick={handleShow} value={value} onChange={(v) => setValue(v.currentTarget.value)} disabled={disabled} />
        <List
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className={`${showList ? 'absolute mt-[2.6rem]' : 'relative hidden'} bg-white w-[60vh]`}
          data={data}
          renderedItem={(item) =>
            render(item, handleClick)
          } />
    </div>
  );
}

export default InputSearch;
