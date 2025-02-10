import forge from "node-forge";

export const encodeByRAS = (publicKeyPem: string, value: string) => {
  const { pki, util } = forge;
  const publicKey = pki.publicKeyFromPem(publicKeyPem);
  return util.encode64(publicKey.encrypt(value, "RSA-OAEP"));
};

export const encodeByMD5 = (value: string) => {
  const md = forge.md.md5.create();
  md.update(value);
  const hash = md.digest().toHex();
  return hash;
};
