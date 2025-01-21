export const extractRelations = (queryObj: any, parentKey = ''): string[] => {
  let relations: string[] = [];
  Object.keys(queryObj).forEach((key) => {
    const value = queryObj[key];
    const relationKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      relations.push(relationKey);
      relations = relations.concat(extractRelations(value, relationKey));
    } else if (!parentKey) {
      relations.push(key);
    }
  });
  return relations;
};
