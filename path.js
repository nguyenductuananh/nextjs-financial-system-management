export const HOST_URL = "https://htttquanli.herokuapp.com";
// export const HOST_URL = "http://192.168.1.5:8080";

export const LOGIN_URL = `${HOST_URL}/login`;

export const CATEGORY_URL = `${HOST_URL}/api/category`;
export const ADD_CATEGORY_URL = `${CATEGORY_URL}/add`;

export const ITEM_URL = `${HOST_URL}/api/item/all`;
export const ADD_ITEM_URL = `${HOST_URL}/api/item/add`;

export const SEARCH_CUSTOMER_URL = `${HOST_URL}/getCustomerPhone`;

export const GET_LIST_ORDER_URL = `${HOST_URL}/api/order/all`;
export const ADD_ORDER_URL = `${HOST_URL}/api/order/save`;

export const CITY_API_URL = "https://thongtindoanhnghiep.co/api/city";
export const DISTRICT_API_URL = (cityCode) => {
  return `${CITY_API_URL}/${cityCode}/district`;
};
export const WARD_API_URL = (districtCode) => {
  return `https://thongtindoanhnghiep.co/api/district/${districtCode}/ward`;
};
