

async function RefreshSession() {
	await fetch('/auth/refresh/session', {
		method: 'POST',
	})
}
async function CheckRefresh(resp) {
	if (resp.status === 401) {
		const message = (await resp.json()).message
		if (message === 'try refresh token') {
			await fetch('/auth/session/refresh', {
				method: 'POST'
			})
			return true
		}
	}
	return false
}