import axios from "axios";

const api = axios.create({});

async function getProfileData(username) {
  return api.get(`https://www.instagram.com/${username}/?__a=1`);
}

async function getPosts(userID, count = 12, endcursor = "") {
  return api.get(
    `https://www.instagram.com/graphql/query/?query_id=17888483320059182&id=${userID}&first=${count}&after=${endcursor}`
  );
}

async function getComments(shortcode, count = 50, endcursor = "") {
  return api.get(
    `https://www.instagram.com/graphql/query/?query_hash=bc3296d1ce80a24b1b6e40b1e72903f5&shortcode=${shortcode}&first=${count}&after=${endcursor}`
  );
}

export default {
  api,
  getProfileData,
  getPosts,
  getComments,
};
