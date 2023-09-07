import { ProgressBar } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <ProgressBar
      wrapperStyle={{
        margin: '-40px auto 0',
        display: 'flex',
      }}
      width="110"
      height="110"
      ariaLabel="progress-bar-loading"
      borderColor="#40bfff"
      barColor="#ffc800"
    />
  );
};
