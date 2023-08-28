/* eslint-disable react/display-name */
import React, { forwardRef, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import style from '../../app/style/cube.module.css';
import Box from '../common/box';

const FaceComponent: React.FC<React.ComponentProps<'div'>> = ({ className, ...rest }) => {
  return (
    <div
      className={twMerge(`
      absolute 
      w-[400px] 
      h-[400px] 
      flex 
      justify-center 
      items-center 
      `, className)}
      {...rest}
    />
  );
};

export interface CubeProps extends React.ComponentProps<'div'> {
  firstFace: React.ReactNode;
  secondFace: React.ReactNode;
}

type cubeRef = HTMLDivElement;

export const CubePerspective = forwardRef<cubeRef, CubeProps>((
  props,
  ref
) => {

  const { firstFace, secondFace, ...rest } = props;

  return (
    <div ref={ref} className={style.cube} {...rest}>
      <FaceComponent className={`${style.face} ${style.firstFace}`}>
        {firstFace}
      </FaceComponent>
      <FaceComponent className={`${style.face} ${style.secondFace}`} />
      <FaceComponent className={`${style.face} ${style.thirdFace}`} />
      <FaceComponent className={`${style.face} ${style.fourthFace}`} >
        {secondFace}
      </FaceComponent>
      <FaceComponent className={`${style.face} ${style.fifthFace}`} />
      <FaceComponent className={`${style.face} ${style.sixthFace}`} />
    </div>
  );
});

export interface WrappedFormProps {
  next: () => void;
  prev: () => void;
}

function withThreeDForm<C extends React.JSX.IntrinsicAttributes, F>(
  WrappedCube: React.ComponentType<C>,
  WrappedForm: React.ComponentType<F & WrappedFormProps>,
) {
  const ComponentWithThreeD = ({ cubeProps, formProps }: { cubeProps: C, formProps: F }) => {

    const cubeRef = useRef<HTMLDivElement>(null);

    const rotate = (degrees: number) => {
      if (!cubeRef.current) return;

      const cube = cubeRef.current;
      cube.style.transition = 'all 1s ease-in-out';
      cube.style.transform = `rotateY(${degrees}deg)`;
    };

    const nextView = () => {
      rotate(-90);
    };

    const prevView = () => {
      rotate(0);
    };

    const extraFormProps: WrappedFormProps = {
      next: nextView,
      prev: prevView,
    };


    return (
      <>
        <Box>
          <WrappedForm {...formProps} {...extraFormProps} />
        </Box>
        <Box className='h-auto flex justify-center items-center '>
          <WrappedCube ref={cubeRef} {...cubeProps} />
        </Box>
      </>
    );
  };

  return ComponentWithThreeD;
}

export default withThreeDForm;
