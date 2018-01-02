import { root, URL } from './constants'

export const getAllPosts = () => {
	return fetch(root + URL.posts) //eslint-disable-line
		.then((response) => {
			return response.json()
		})
		.then((responseJson) => {
			return responseJson
		})
		.catch((error) => {
			console.error(error)
		})
}
