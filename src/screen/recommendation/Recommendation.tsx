import { Card, CardGroup } from 'react-bootstrap';
import React from 'react';
function Recommendation (): JSX.Element {
  const recommendations = {
    FAT_LOSS: 'For someone who struggles with making time to train and eat on a consistent basis. Great for anyone looking to get the  ball rolling with routine in nutrition',
    GENERAL_HEALTH: 'For someone who has a handle on training and nutrition but is inconsistent. Great for anyone trying to enhance the quality of their daily nutriton goals',
    MUSCLE_GAIN: 'For someone who is optimal with their training and consistent in nutrition but not eating enough. Great for nayone who has the toutine but needs direction in getting results'
  };
  return (
    <>
      <CardGroup>
        {
          Object.entries(recommendations).map(([goal, des]) => {
            return (
              <>
                <Card>
                  <Card.Img variant="under" src="../../logo.png" />
                  <Card.Body>
                    <Card.Title>{goal}</Card.Title>
                    <Card.Text>
                      {des}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </>
            );
          })}
      </CardGroup>
    </>
  );
}
export default Recommendation;
