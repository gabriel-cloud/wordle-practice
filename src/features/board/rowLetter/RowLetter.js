export const RowLetter = ({
  instance,
  wordRow,
}) => {
  const letters = wordRow.split('');

  return (
    <>
      {letters.map((el, key) => (
        <div className={'letter div' + (key + 1 + instance * 5)} key={key}>
          <span className="letterSpan">{el}</span>
        </div>
      ))}
    </>
  );
};
