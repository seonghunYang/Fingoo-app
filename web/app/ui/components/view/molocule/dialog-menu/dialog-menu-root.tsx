'use client';
import React from 'react';
import { Transition } from '@headlessui/react';
import { DialogMenuItem } from './dialog-menu-item';
import { DialogMenuContext } from './dialog-menu.context';
import { useDialogMenu } from './use-dialog-menu.hook';
import { DialogMenuKey } from '@/app/utils/keys/dialog-menu-key';

type DialogMenuProps = {
  dialogKey: DialogMenuKey;
};

const getDialogMenuItems = (children: React.ReactNode) => {
  const childArray = React.Children.toArray(children);
  return childArray.filter((child) => {
    return React.isValidElement(child) && child.type === DialogMenuItem;
  });
};

export function DialogMenuRoot({ children, dialogKey }: React.PropsWithChildren<DialogMenuProps>) {
  const { isOpen, position, closeDialogMenu } = useDialogMenu(dialogKey);
  const dialogMenuItems = getDialogMenuItems(children);

  const handleOnClick = () => {
    closeDialogMenu();
  };

  return (
    <DialogMenuContext.Provider
      value={{
        onClose: closeDialogMenu,
      }}
    >
      <div className="fixed inset-0 pointer-events-none	overflow-hidden	z-50">
        <Transition
          as={React.Fragment}
          show={isOpen || false}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="relative pointer-events-auto z-0">
            <div onClick={handleOnClick} className="fixed top-0 left-0 w-screen h-screen" />
            <div style={position && { left: position.x, top: position.y }} className="fixed w-56">
              <div
                role="dialog"
                className="relative bg-white rounded-lg shadow-lg overflow-hidden pointer-events-auto w-32 mt-2 origin-top-left ring-1 ring-black/5 focus:outline-none"
              >
                {dialogMenuItems}
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </DialogMenuContext.Provider>
  );
}
