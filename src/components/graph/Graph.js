import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

export const RenderLineChart = (props) => {
  const { stats } = props;
  const data = [
    {
      name: '1',
      guesses: stats.guess1,
    },
    {
      name: '2',
      guesses: stats.guess2,
    },
    {
      name: '3',
      guesses: stats.guess3,
    },
    {
      name: '4',
      guesses: stats.guess4,
    },
    {
      name: '5',
      guesses: stats.guess5,
    }
  ];

  return (
    <ResponsiveContainer minHeight={200} minWidth={100}>
      <BarChart
        width={200}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 50,
          left: 5,
          bottom: -10,
        }}
      >
        <XAxis dataKey="name" axisLine={false} tick={true} />

        <YAxis type="number" axisLine={false} tick={false} />
        <Bar
          dataKey="guesses"
          fill="#76879880"
          minPointSize={20}
          isAnimationActive={false}
        >
          <LabelList position={'insideStart'} />
        </Bar>
      </BarChart>
     </ResponsiveContainer>
  );
};
