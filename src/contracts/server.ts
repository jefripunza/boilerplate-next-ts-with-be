export type Response = {
  status?: string;
  message?: string;
  data?: any;
  token?: string;
};

export enum Method {
  get = "GET",
  post = "POST",
  put = "PUT",
  patch = "PATCH",
  delete = "DELETE",
}
