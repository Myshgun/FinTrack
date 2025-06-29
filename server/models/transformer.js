function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

function transformKeysToCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(transformKeysToCamelCase);
  } else if (obj instanceof Date) {
    return obj.toISOString();
  } else if (obj !== null && typeof obj === "object") {
    const newObj = {};
    for (const key in obj) {
      if (["_id", "__v"].includes(key)) continue;
      newObj[toCamelCase(key)] = transformKeysToCamelCase(obj[key]);
    }
    return newObj;
  }
  return obj;
}

function transform(doc, ret) {
  const transformed = transformKeysToCamelCase(ret);
  transformed.id = ret._id.toString();
  return transformed;
}

module.exports = transform;
