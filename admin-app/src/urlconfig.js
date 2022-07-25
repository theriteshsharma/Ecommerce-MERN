//const baseUrl = process.env.API || "https://flipkart-rest-server.herokuapp.com";
const baseUrl = "http://localhost:2000";

export const api = `${baseUrl}/api`
export const imageUrl = (fileName) => {
 
  return `${baseUrl}/public/${fileName}`
}

export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
