export default function receiveMessage(event) {
  console.log('EVENT', event);
  if (event.origin == 'http://localhost:3000') {
    switch (event.data.type) {
      case 'CLOSE':
        this.close();
        break;
      case 'READY_TO_RECEIVE':
        this.sendMessage(
          {
            type: 'INITIAL_DATA',
            payload: {
              client_data: this.clientData,
              product_id: this.product_id,
              order_details: this.order_details
            }
          },
          '*'
        );
        break;
      case 'READY_TO_RECEIVE_ERR':
        this.sendMessage(
          {
            type: 'INITIAL_DATA_ERR',
            payload: {
              ...this.clientData
            }
          },
          '*'
        );
        break;
      case 'CREATED':
        this.callback(null, {
          code: 200,
          data: event.data.payload,
          message: 'Order placed successfully'
        });
        this.close();
        break;
    }
  }
}
