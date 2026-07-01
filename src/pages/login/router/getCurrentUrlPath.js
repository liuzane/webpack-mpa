import address from '@/address';

const getCurrentUrlPath = () => {
  const { origin, pathname, hash } = window.location;
  const path = (origin + pathname + hash).replace(address.SERVER_ADDRESS, '');
  const url = encodeURIComponent(path);

  return '?url=' + url;
};

export default getCurrentUrlPath;