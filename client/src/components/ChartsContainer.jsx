import Wrapper from '../assets/wrappers/ChartsContainer';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import { useState } from 'react';

const ChartsContainer = ({ data }) => {
  const [isBarChat, setIsBarChart] = useState(true);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setIsBarChart(!isBarChat)}>
        {isBarChat ? 'Area Chart' : 'Bar Chart'}
      </button>
      {isBarChat ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};
export default ChartsContainer;
