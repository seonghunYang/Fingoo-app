import ListItem from '../../atom/list-item';
import Accordion from '../accordion';
import { useState } from 'react';
import { cn } from '@/app/utils/style';
import { filterChildrenByType } from '@/app/utils/helper';
import { ExpandableListItemExpandedContent } from './expandable-list-item-expanded-content';
import { ExpandableListItemTitle } from './expandable-list-item-title';

type ExpandableListItemProps = {
  selected: boolean;
  onSelect: () => void;
  onDeSelect?: () => void;
  hoverRender?: () => JSX.Element;
};

function getExpandedContent(children: React.ReactNode) {
  return filterChildrenByType(children, ExpandableListItemExpandedContent);
}

function getTitle(children: React.ReactNode) {
  return filterChildrenByType(children, ExpandableListItemTitle);
}

export function ExpandableListItemRoot({
  selected,
  onSelect,
  onDeSelect,
  hoverRender,
  children,
}: React.PropsWithChildren<ExpandableListItemProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const title = getTitle(children);
  const ExpandedContent = getExpandedContent(children);

  const handleValueChange = (value: string) => {
    if (value === 'item1') {
      setIsOpen(value === 'item1');
    } else {
      setTimeout(() => {
        setIsOpen(false);
      }, 400);
    }
  };

  const handleSelect = () => {
    onSelect();
  };

  const handleDeSelect = () => {
    onDeSelect?.();
  };

  const handleClick = () => {
    if (selected) {
      handleDeSelect();
    } else {
      handleSelect();
    }
  };

  return (
    <Accordion onValueChange={handleValueChange} type="single" collapsible>
      <Accordion.Item className="relative w-full" value="item1">
        <ListItem
          hoverDecorator={
            isOpen
              ? ({ children }) => {
                  return (
                    <div className="invisible absolute right-3 top-0.5 z-10  group-has-[:hover]:visible">
                      <div className="flex items-center justify-center">{children}</div>
                    </div>
                  );
                }
              : undefined
          }
          hoverRender={hoverRender}
        >
          <div
            onClick={handleClick}
            className={cn('h-full w-full rounded-2xl bg-white ring-1 ring-blue-200', {
              'bg-blue-200 text-blue-900 opacity-80': selected,
            })}
            role="tab"
            aria-selected={`${selected}`}
          >
            {title}
            <Accordion.Content>
              <div className="px-4 py-1">{ExpandedContent}</div>
            </Accordion.Content>
          </div>
        </ListItem>
        <div
          className={cn('absolute right-3 top-1/2 z-20 -translate-y-2/4', {
            'top-2.5 -translate-y-0': isOpen,
          })}
        >
          <Accordion.Trigger />
        </div>
      </Accordion.Item>
    </Accordion>
  );
}
