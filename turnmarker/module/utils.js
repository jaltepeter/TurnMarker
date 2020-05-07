
/**
 * The name of the module
 */
export const modName = 'turnmarker';

/**
 * Returns a token object from the canvas based on the ID value
 * @param {String} tokenId - The ID of the token to look for
 */
export function findTokenById(tokenId) {
    return canvas.tokens.ownedTokens.find(t => t.id == tokenId);
}

