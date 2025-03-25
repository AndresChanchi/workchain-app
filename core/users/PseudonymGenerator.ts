export const generatePseudonym = (address: string): string => {
  if (!address || typeof address !== 'string') {
    throw new Error('Invalid address provided');
  }
  return `Anon#${address.slice(2, 6).toUpperCase()}${address.slice(-4)}`;
};