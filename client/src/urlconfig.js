//const baseUrl = "https://flipkart-rest-server.herokuapp.com";
const baseUrl = "http://localhost:2000";
export const api = `${baseUrl}/api`;
export const imageUrl  = (fileName) =>{
  console.log(fileName)
  return `${baseUrl}/public/${fileName}`;
}
export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
