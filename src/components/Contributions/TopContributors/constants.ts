export const CONTRIBUTION_DURATION_DAYS = {
  ALL_TIME: null,
  TODAY: 0,
  WEEK: 7,
};

export const CONTRIBUTION_DURATION_FILTER_OPTIONS = [
  {
    label: 'Today',
    value: CONTRIBUTION_DURATION_DAYS.TODAY,
  },
  {
    label: 'This Week',
    value: CONTRIBUTION_DURATION_DAYS.WEEK,
  },
  {
    label: 'All Time',
    value: CONTRIBUTION_DURATION_DAYS.ALL_TIME,
  },
];
