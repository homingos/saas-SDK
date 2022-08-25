import axios from 'axios';
const backend_base_URL = 'https://dev.homingos.com/saas';

export const getProductData = async ({
  productId,
  apiKey
}: {
  productId: string;
  apiKey: string;
}) => {
  const res = await axios.get(`${backend_base_URL}/api/v1/products`, {
    params: {
      product_id: productId
    },
    headers: {
      'x-api-key': apiKey
    }
  });

  return res?.data;
};

export const getSignedURL = async (data: any) => {
  const res = await axios.post(
    `${backend_base_URL}/orders/v2/signed_url`,
    data,
    {
      headers: {
        Authorization: 'Token 52c24c614b51edfb20c5471d82ff0a495a19d6d0'
      }
    }
  );
  return res.data;
};

export const UploadURLv2 = async (signedURL: string, file: File) => {
  const res = await axios({
    method: 'put',
    url: signedURL,
    data: file,
    headers: {
      'Content-Type': file.type
    }
  });
  return res;
};

export const createCard = async ({
  apiKey,
  data
}: {
  apiKey: string;
  data: {
    productId: string;
    clientPhotoURL: string;
    clientVideoURL: string;
    refId: string;
    theme: string;
  };
}) => {
  const res = await axios.post(
    'https://dev.homingos.com/saas/api/v1/orders/create',
    data,
    {
      headers: {
        'x-api-key': apiKey
      }
    }
  );

  return res.data;
};
