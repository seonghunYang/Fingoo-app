import { useHistoryIndicatorsValueViewModel } from '@/app/business/hooks/indicator/use-history-indicators-value-view-model.hook';
import AdvancedMultiLineChart from '../../view/molocule/advanced-multi-line-chart/advanced-multi-line-chart';
import { useIndicatorsValueViewModel } from '@/app/business/hooks/indicator/use-indicators-value-view-model.hook';
import { useMemo } from 'react';

export default function AdvancedIndicatorsChart() {
  const { historyIndicatorsValue, setSize, setRowsToDownload } = useHistoryIndicatorsValueViewModel();
  const { indicatorsValue } = useIndicatorsValueViewModel();

  const formattedIndicatorsRows = useMemo(() => indicatorsValue?.formattedIndicatorsInRow, [indicatorsValue]);

  const data = historyIndicatorsValue?.formattedIndicatorsInRow;
  const formattedAdvencedIndicatorsRows = [...(data || []), ...(formattedIndicatorsRows || [])];

  const handleLoadData = (rowsToDownload: number, initialIndex: number) => {
    setRowsToDownload(rowsToDownload);
  };

  return <AdvancedMultiLineChart onLoadData={handleLoadData} data={formattedAdvencedIndicatorsRows || []} />;
}
