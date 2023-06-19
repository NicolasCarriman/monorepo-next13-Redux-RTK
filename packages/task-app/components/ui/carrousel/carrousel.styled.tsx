import Arrow from '@app/components/common/arrow';

interface CarrouselArrowProps {
  side: 'left' | 'right';
  onClick: () => void;
}

export const CarrouselArrows: React.FC<CarrouselArrowProps> = ({
  side,
  onClick,
}) => {
  return (
    <>
      <div className=' flex justify-center' >
        <Arrow side={side} onClick={onClick} />
      </div>
    </>
  );
};

interface CarrousleMainProps {
  children: React.ReactNode;
}
export const CarrouselMain:  React.FC<CarrousleMainProps> = ({ children }) => {
  return (
    <div className='max-w-[90%] overflow-hidden h-full flex items-center justify-start p-1 gap-4'>
      {children}
    </div>
  );
};
