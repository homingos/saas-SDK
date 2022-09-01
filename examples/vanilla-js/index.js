let key = document.getElementById('sdkkey').value;

document.getElementById('sdkkey').addEventListener('change', e => {
  key = e.target.value;
});

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

async function ApiCall(settings, url) {
  try {
    const data = await fetch(url, settings)
      .then(res => res.json())
      .then(data => data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getProducts() {
  try {
    if (!key) {
      alert('Please add a key');
      return;
    }
    document.getElementById('product_list').innerHTML = '';
    const data = await ApiCall(
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'x-api-key': key
        }
      },
      `https://api.flamapp.com/saas/api/v1/products`
    );
    console.log(data.data);

    data.data.slice(0, 3).forEach((item, index) => {
      const card = `<div class = 'col'>
      <div class="card" style="width: 18rem">
        <img
          style="height: 14rem; object-fit: cover"
          src="${item.productImage}"
          class="card-img-top"
          alt="product ${index}"
        />
        <div class="card-body">
          <h5 class="card-title">${item.productHeader}</h5>
          <p class="card-text">
            ${item.productSubHeader}
          </p>
          
          <button id="placeorder-${index}" onclick="buyCard('${item.productServiceId}', true, true)" class="placeorder btn btn-primary">
            Buy
          </button>
        </div>
      </div>
      </div>
    `;
      document.getElementById('product_list').innerHTML += card;
    });

    // document.getElementById(`placeorder-0`).onclick(e => {
    //   buyCard(false, false);
    // });
    // document.getElementById(`placeorder-1`).onclick(e => {
    //   buyCard(true, false);
    // });
    // document.getElementById(`placeorder-2`).onclick(e => {
    //   buyCard(true, true);
    // });
  } catch (error) {
    if (error) console.log(error);
  }
}

function buyCard(id, photo, video) {
  const flam = new FlamSaasSDK.init({
    environment: 'SANDBOX',
    key: key
  });

  let orderDetails = {
    productId: id,
    refId: uuidv4(),
    photo: photo
      ? 'https://images.pexels.com/photos/2274725/pexels-photo-2274725.jpeg'
      : '',
    video: video
      ? 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      : '',
    animation: 'CONFETTI',
    prefill: {
      name: 'John Doe Prints',
      email: 'support@email.com',
      phone: '+91 98765 43210'
    },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png'
  };

  flam.placeOrder(orderDetails, (err, res) => {
    if (err) {
      console.log('ERR at client side', err);
    } else {
      console.log('RESSS', res);
    }
  });
}
