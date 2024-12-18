import ToggleGroup from '../../../view/molecule/toggle-group';
import { intervals, SplitScreen, type Interval } from '@/app/store/stores/numerical-guidance/indicator-board.store';
import { cn } from '@/app/utils/style';

function isInterval(value: string): value is Interval {
  return intervals.includes(value as Interval);
}

export interface BaseIntervalToggleGroupProps {
  interval: Interval;
  onChange: (interval: Interval) => void;
  disabled?: boolean;
  splitScreen?: SplitScreen;
}

export function BaseIntervalToggleGroup({
  interval,
  onChange,
  disabled = false,
  splitScreen,
}: BaseIntervalToggleGroupProps) {
  const handleIntervalChange = (value: string) => {
    if (isInterval(value)) {
      onChange(value);
    }
  };

  return (
    <ToggleGroup disabled={disabled} value={interval} onValueChange={handleIntervalChange} type="single">
      <ToggleGroup.Item value="day">
        <Item splitScreen={splitScreen}>Day</Item>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="week">
        <Item splitScreen={splitScreen}>Week</Item>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="month">
        <Item splitScreen={splitScreen}>Month</Item>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="year">
        <Item splitScreen={splitScreen}>Year</Item>
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}

function Item({ children, splitScreen }: React.PropsWithChildren<{ splitScreen?: SplitScreen }>) {
  return (
    <div
      className={cn({
        'w-20': !splitScreen || splitScreen !== 'square',
        'w-10 text-xs': splitScreen === 'square',
        'w-10': splitScreen === 'vertical',
      })}
    >
      {children}
    </div>
  );
}
