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
      className='w-auto relative ml-4 h-[calc(100vh)]'
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
  const sidebarClass = 'bg-white h-full items-center flex flex-col justify-start rounded-xl transition-all ease-out duration-200 gap-8 min-h-[94vh] w-[6vw] hover:w-[14vw] hover:h-full shadow-custom';

  return (
      <div
        className={sidebarClass}
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
      className='flex flex-col gap-[12px] justify-center items-start relative max-w-min'
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
      className='flex flex-col justify-center mt-[30px] items-center gap-4 font-bold1'
    >
      {children}
      <span className='flex justify-center font-medium items-center w-min'>
        {spanLabel}
      </span>
    </div>
  );
};
