
interface CardSectionsProps {
  children?: React.ReactNode;
}

export const CardHeader = ({ children }: CardSectionsProps) => {
  return(
    <div className='flex flex-row justify-between items-center text-gray-600'>
      {
        children
      }
    </div>
  );
};

export const CardMain = ({ children }: CardSectionsProps) => {
  return(
    <div className='flex flex-col justify-end w-full h-full'>
      {children}
    </div>
  );
};

export const CardFooter = ({ children }: CardSectionsProps) => {
  return(
    <div className='flex flex-row justify-center items-center mt-4'>
      {children}
    </div>
  );
};
