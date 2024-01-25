import { useStore } from '@/app/store';
import { MetadataList } from '../../components/numerical-guidance/metadata-list';
import Button from '../../components/view/atom/button';
import { IndicatorBoardMetadata } from '@/app/store/indicator-board-metadata.slice';

export default function MetadataTabPanel() {
  const createAndSelectMetadata = useStore((state) => state.createAndSelectMetadata);

  const handleClick = () => {
    const metadata: IndicatorBoardMetadata = {
      id: Math.random().toString(36),
      name: 'metadata1',
      indicators: [],
    };
    createAndSelectMetadata(metadata);
  };

  return (
    <div>
      <MetadataList />
      <Button onClick={handleClick}>create</Button>
    </div>
  );
}