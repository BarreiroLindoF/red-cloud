import Expo from 'expo';

export const registerForPushNotificationsAsync = async () => {
	const { status: existingStatus } = await Expo.Permissions.getAsync(Expo.Permissions.NOTIFICATIONS);
	let finalStatus = existingStatus;

	// only ask if permissions have not already been determined, because
	// iOS won't necessarily prompt the user a second time.
	if (existingStatus !== 'granted') {
		// Android remote notification permissions are granted during the app
		// install, so this will only ask on iOS
		const { status } = await Expo.Permissions.askAsync(Expo.Permissions.NOTIFICATIONS);
		finalStatus = status;
	}

	// Stop here if the user did not grant permissions
	if (finalStatus !== 'granted') {
		return;
	}

	// Get the token that uniquely identifies this device
	const token = await Expo.Notifications.getExpoPushTokenAsync();

	return new Promise((resolve, reject) => {
		if (token) resolve(token);
		reject(null);
	});
};
