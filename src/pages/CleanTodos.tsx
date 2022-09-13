import { FC, useState } from 'react';
import { useAcceptJs } from 'react-acceptjs';

import { RouteComponentProps } from 'react-router-dom';
interface CleanTodosProps {
  blah: string;
}

const authData = {
  apiLoginID: '3C5rS7f6',
  clientKey: '3suNtMtv25HbrMBfc5r3UMgCy24tM4V8kwvVcXNS6v52vP8GAKe2CQ4fmRN9njUy',
};

type BasicCardInfo = {
  cardNumber: string;
  cardCode: string;
  month: string;
  year: string;
};

const CleanTodos: FC<CleanTodosProps & RouteComponentProps> = ({
  blah,
  history,
}) => {
  const { dispatchData, loading, error } = useAcceptJs({ authData });
  const [cardData, setCardData] = useState<BasicCardInfo>({
    cardNumber: '',
    month: '',
    year: '',
    cardCode: '',
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // Dispatch CC data to Authorize.net and receive payment nonce for use on your server
    const response = await dispatchData({ cardData });
    console.log('Received response:', response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="cardNumber"
        value={cardData.cardNumber}
        onChange={(event) =>
          setCardData({ ...cardData, cardNumber: event.target.value })
        }
        placeholder="Card Number"
      />
      <input
        type="text"
        name="month"
        value={cardData.month}
        placeholder="Expiration Month"
        onChange={(event) =>
          setCardData({ ...cardData, month: event.target.value })
        }
      />
      <input
        type="text"
        name="year"
        value={cardData.year}
        placeholder="Expiration Year"
        onChange={(event) =>
          setCardData({ ...cardData, year: event.target.value })
        }
      />
      <input
        type="text"
        name="cardCode"
        value={cardData.cardCode}
        onChange={(event) =>
          setCardData({ ...cardData, cardCode: event.target.value })
        }
        placeholder="CVV"
      />
      <button type="submit" disabled={loading || error}>
        Pay
      </button>
    </form>
  );
};

export default CleanTodos;
