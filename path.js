export const HOST_URL = "https://htttquanli.herokuapp.com";
// export const HOST_URL = "http://192.168.1.5:8080";

export const LOGIN_URL = `${HOST_URL}/login`;

export const CATEGORY_URL = `${HOST_URL}/api/category`;
export const ADD_CATEGORY_URL = `${CATEGORY_URL}/add`;

export const ITEM_URL = `${HOST_URL}/api/item/all`;
export const ADD_ITEM_URL = `${HOST_URL}/api/item/add`;

export const SEARCH_CUSTOMER_URL = `${HOST_URL}/getCustomerPhone`;
export const GET_CUSTOMER_URL = `${HOST_URL}/getAllCustomer`;

export const GET_LIST_ORDER_URL = `${HOST_URL}/api/order/all`;
export const ADD_ORDER_URL = `${HOST_URL}/api/order/save`;

export const GET_ORDERED_ITEMS_URL = `${HOST_URL}/api/statistical/getItemOrder`;
export const FILTER_ORDERED_ITEMS_URL = `${HOST_URL}/api/statistical/postItemOrder`;

export const GET_STOCK_OUT_URL = `${HOST_URL}/api/statistical/getImportItem`;
export const FILTER_STOCK_OUT_URL = `${HOST_URL}/api/statistical/postImportItem`;

export const FILTER_MAINTAINFEE_URL = `${HOST_URL}/api/statistical/postMaintaining`;

export const GET_SUPPLIERS_URL = `${HOST_URL}/getAllSupplier`;

export const ADD_PRODUCT_WAREHOUSE_URL = `${HOST_URL}/api/importBill/save`;

export const ADD_MAINTAINFEE_URL = `${HOST_URL}/api/maintainFee/save`;
export const GET_MAINTAINFEES_URL = `${HOST_URL}/api/maintainFee/all`;
