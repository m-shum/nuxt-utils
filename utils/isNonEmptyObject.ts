export const isNonEmptyObject = (value: any) => {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
	return Array.isArray(Object.keys(value)) && Object.keys(value).length > 0;
};
