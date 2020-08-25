import { Statistics } from '@interfaces/statistics.interface';

export interface StatisticsState {
  loading: boolean;
  error: string | null;
  statistics: Statistics | null;
}
