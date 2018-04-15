// Login methods
const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const regEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const regDate = /([0-2]\d{1}|3[0-1])\.(0\d{1}|1[0-2])\.(19|20)\d{2}/;
const regNpa = /[1][0-9][0-9][0-9]/;
const regCodePassword = /.{6}/;

// Carte de crédit
const regNumeroCarte = /.{16}/;
const regTroisChiffresCarte = /.{3}/;
const regMonth = /^(0?[1-9]|1[012])$/;
const regAnneeCarte = /.{2}/;

// Login methods
export const checkPassword = (password) => {
	return regPassword.test(password);
};

export const checkEmail = (email) => {
	return regEmail.test(email);
};

export const checkDate = (date) => {
	return regDate.test(date);
};

export const checkNpa = (npa) => {
	return regNpa.test(npa);
};

export const checkCodePassword = (code) => {
	return regCodePassword.test(code);
};

// Carte de crédit
export const checkNumeroCarte = (numero) => {
	return regNumeroCarte.test(numero);
};

export const checkTroisChiffresCarte = (numero) => {
	return regTroisChiffresCarte.test(numero);
};

export const checkMonth = (month) => {
	return regMonth.test(month);
};

export const checkAnneeCarte = (annee) => {
	return regAnneeCarte.test(annee);
};
