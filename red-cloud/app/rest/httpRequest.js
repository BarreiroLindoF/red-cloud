import { root } from './constants'
import { URL } from './constants'

export const getAllPosts = () => {
	return fetch(root + URL.posts)
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson
		})
		.catch((error) => {
			console.error(error)
		})
}
