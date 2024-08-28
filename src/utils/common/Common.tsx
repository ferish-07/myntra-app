export const CalculateDiscount = (originalPrice: any, discount: any) => {
  let discount_price = originalPrice - originalPrice * (discount / 100);
  return discount_price.toFixed(0);
};
