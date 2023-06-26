import React from 'react';
import { PageWrapper } from '../components/wrapperAnmiation';
import SideBarLink from '@app/components/common/link';
import Button from '@app/components/common/button';

function Product() {
  return (
    <PageWrapper>
      <section className='flex flex-col gap-4 justify-center items-center'>
        <p className='font-semibold'>
          Únete a nosotros y experimenta una forma más eficiente de trabajar
        </p>
        <p>
          Con características innovadoras que facilita la colaboración en equipo y fomenta la eficiencia en cada proceso.
          nuestro producto se adapta a tus necesidades, ofreciendo una experiencia fluida y adaptativa.
        </p>
        <SideBarLink href='./dashboard'>
          <Button variant='hover' size={'small'}>
            <p className='p-2 whitespace-nowrap'>
              Prueba Ahora!
            </p>
          </Button>
        </SideBarLink>
      </section>
    </PageWrapper>
  );
}

export default Product;
