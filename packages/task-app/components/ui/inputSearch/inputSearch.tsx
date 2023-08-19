import React, { useState, useRef, useEffect } from 'react';
import List from '@app/components/common/list';
import FloatingLabelInput from '@app/components/common/inputLabel';

// eslint-disable-next-line no-unused-vars
export type onClickCallBack = (name: string) => void;

interface InputSearchProps {
  data: unknown[];
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  render: (item: any, arg: onClickCallBack) => React.ReactNode;
  placeHolder: string;
  name?: string;
  type?: 'default' | 'userPicker';
}

function InputSearch({
  data,
  disabled = false,
  render,
  placeHolder,
  type = 'default'
}: InputSearchProps) {
  const [value, setValue] = useState('');
  const [showList, setShowList] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isDefaultType = type === 'default';

  const handleShow = () => setShowList((state) => !state);

  const handleClick = (name: string) => {
    if (isDefaultType) {
      setValue(name);
    }

    setShowList(false);
  };

  useEffect(() => {
    function handleClickOutside(event: { target: any; }) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowList(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col relative w-full" ref={containerRef}>
      <FloatingLabelInput
        placeholder={placeHolder}
        onClick={handleShow}
        value={value}
        onChange={(v) => setValue(v.currentTarget.value)}
        disabled={disabled}
      />
      {showList && (
        <>
          {/* Este div actúa como el overlay. Al hacer clic, se cierra el menú */}
          <div className="fixed inset-0 z-[100]  backdrop-brightness-[0.9] transition-all " onClick={() => setShowList(false)} />

          <List
            key={showList.toString()}
            className={`custom-list-item-spacing ${showList ? 'absolute z-[101] mt-[5.7rem] p-1' : 'hidden'} bg-white w-full`}
            data={data}
            renderedItem={(item) => render(item, handleClick)}
          />
        </>
      )}
      <style jsx>{`
        .custom-list-item-spacing :global(div) {
            margin: 0.05rem 0;
        }
      `}</style>
    </div>
  );
}

export default InputSearch;
