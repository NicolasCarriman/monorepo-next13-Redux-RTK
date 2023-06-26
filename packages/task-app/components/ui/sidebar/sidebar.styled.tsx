'use client';

interface SidebarProps {
  children?: React.ReactNode;
}

interface SidebarContainer {
  children: React.ReactNode;
}

export const SideBarContainer: React.FC<SidebarContainer> = ({ children }) => {
  return (
    <aside
      className='w-auto sticky ml-0 h-[16vh] sm:relative sm:h-[calc(100vh)] sm:ml-4'
    >
      {children}
    </aside>
  );
};

interface sidebarComponentProps extends SidebarProps {
  onHover: () => void;
  onLeave: () => void;
}

export const SidebarComponent: React.FC<sidebarComponentProps> = (props) => {
  const { children, onHover, onLeave } = props;

  return (
      <div
        className='
          bg-white 
          h-full 
          items-center 
          flex 
          flex-row 
          justify-between 
          rounded-xl 
          transition-all 
          ease-out 
          duration-600 
          p-4
          gap-8
          w-full
          min-h-[10vh] 
          sm:min-h-[94vh] 
          sm:w-[6vw] 
          sm:flex-col
          sm:justify-between 
          hover:w-auto
          hover:h-full 
          shadow-custom'
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {children}
      </div>
  );
};

interface SidebarHead {
  children: React.ReactNode;
}

export const SidebarHead: React.FC<SidebarHead> = ({ children }) => {
  return (
    <div className='flex flex-col justify-center items-center max-w-min min-h-[12%] gap-[20px] p-4 text-center'>
      {children}
    </div>
  );
};

export const SidebarMainContainer: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div
      className='hidden sm:flex flex-col gap-[12px] justify-center items-start relative max-w-min'
    >
      {children}
    </div>
  );
};

interface SidebarFooterProps {
  children: React.ReactNode;
  spanLabel: string;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ children, spanLabel }) => {
  return (
    <div
      className='flex flex-col justify-center items-center gap-4 font-bold1'
    >
      {children}
      <span className='hidden sm:flex justify-center font-medium items-center w-min'>
        {spanLabel}
      </span>
    </div>
  );
};
