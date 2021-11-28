export const state = {
  'activeWallet': null,
}
export const mutations = {
	setActiveWallet: (state, wallet) => {
		state.activeWallet = wallet
	},
}
export const actions = {
	setLogin: ({commit}, payload) => {
		commit('setActiveWallet', payload.wallet)
	},
}
export const getters = {
	isAuthenticated: (state) => {
		return state.activeWallet === null ? false : true
	},
	getWalletHeader: (state) => {
		return state.activeWallet === null ? '' : state.activeWallet.substring(0, 10)
	},
}