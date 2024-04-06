import React from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import IconButton from '../../atom/icons/icon-button';

type ConversationCardHeaderProps = {
  title: string;
  infoIcon?: React.ElementType;
  collapsibleIcon?: React.ElementType;
} & React.HTMLAttributes<HTMLDivElement>;

const ConversationCardHeader = ({ title, infoIcon, collapsibleIcon, ...props }: ConversationCardHeaderProps) => {
  return (
    <div
      className="flex items-center justify-between rounded-t-xl bg-black px-5 text-xl font-semibold text-white"
      {...props}
    >
      {infoIcon ? <IconButton size="xl" icon={infoIcon} color="white" /> : null}
      <div className="flex-grow text-center">{title}</div>
      <Collapsible.Trigger asChild>
        {collapsibleIcon ? <IconButton size="xl" icon={collapsibleIcon} color="white" /> : null}
      </Collapsible.Trigger>
    </div>
  );
};

export default ConversationCardHeader;