export const formatDate = (month, day, year, split = '-', format = 'DD-MM-YYYY') => {
	if(format === 'DD-MM-YYYY'){
		return  ('0' + day).slice(-2) + split + ('0' + (month + 1)).slice(-2) + split + year;
	}else if(format === 'MM-DD-YYYY'){
		return ('0' + (month + 1)).slice(-2) + split + ('0' + day).slice(-2) + split + year;
	}
}