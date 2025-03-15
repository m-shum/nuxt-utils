export const isNonEmptyString = (value: any) => {
	if (!value || typeof value !== 'string') return false;
	return value.length > 0;
};
