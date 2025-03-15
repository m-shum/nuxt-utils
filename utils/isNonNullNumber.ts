export const isNonNullNumber = (value: any) => {
	if (!value || typeof value === 'boolean' || isNaN(Number(value))) return false;
	return Number(value) > 0;
};
