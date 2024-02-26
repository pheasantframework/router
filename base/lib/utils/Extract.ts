export function extractIdFromPath(path: string, regExp: RegExp, origPath: string): object | null {
  // Test the path against the regular expression
  const match = regExp.exec(path);

  const parts: string[] = origPath.split('/').map(part => {
    if (part.startsWith(':')) {
      return part.replace(':', ''); // Replace named parameter with a capturing group
    } else {
      return null;
    }
  }).filter(item => item !== null) as string[];
  // If there's a match, return the captured 'id'
  if (match && match.length > 1) {
    const output: { [key: string]: string; } = {};
    for (let index = 0; index < parts.length && index < (match.length - 1); index++) {
      output[parts[index]] = match[index + 1];
    }
    return output;
  } else {
    return null;
  }
}


export function createRegExpFromPath(path: string): RegExp {
  // Escape special characters and split the path into parts
  const parts = path.split('/').map(part => {
    if (part.startsWith(':')) {
      return `([^/]+)`; // Replace named parameter with a capturing group
    } else {
      return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
    }
  });
  // Join the parts into a regular expression string and add start and end anchors
  const regExpString = `^${parts.join('/')}\/?$`;
  // Create and return the regular expression
  return new RegExp(regExpString);
}
