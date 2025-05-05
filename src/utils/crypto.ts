import CryptoJS from 'crypto-js';

/**
 * Tạo khóa mã hóa từ mật khẩu và salt bằng PBKDF2.
 */
const generateKey = (password: string, salt: CryptoJS.lib.WordArray) => {
  if (!password) throw new Error('Mật khẩu không được rỗng');
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 10000,
  });
};

/**
 * Chuyển Base64 thành Base64 URL-safe.
 */
const toBase64UrlSafe = (base64: string): string => {
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

/**
 * Chuyển Base64 URL-safe về Base64 tiêu chuẩn.
 */
const fromBase64UrlSafe = (base64UrlSafe: string): string => {
  let base64 = base64UrlSafe.replace(/-/g, '+').replace(/_/g, '/');
  // Thêm padding nếu cần
  while (base64.length % 4) {
    base64 += '=';
  }
  return base64;
};

/**
 * Mã hóa dữ liệu thành chuỗi ngắn, an toàn cho URL.
 * @returns Chuỗi mã hóa dạng URL-safe.
 */
export const Encrypt = (data: unknown, password: string): string => {
  if (!password) throw new Error('Mật khẩu không được rỗng');
  if (data === undefined || data === null) throw new Error('Dữ liệu không hợp lệ');

  const json = JSON.stringify(data);
  const salt = CryptoJS.lib.WordArray.random(128 / 8);
  const iv = CryptoJS.lib.WordArray.random(128 / 8);
  const key = generateKey(password, salt);

  const encrypted = CryptoJS.AES.encrypt(json, key, { iv });

  // Chuyển thành Base64 URL-safe
  const ivStr = toBase64UrlSafe(iv.toString(CryptoJS.enc.Base64));
  const saltStr = toBase64UrlSafe(salt.toString(CryptoJS.enc.Base64));
  const ciphertext = toBase64UrlSafe(encrypted.toString());

  // Nối chuỗi và mã hóa URL
  const result = `${ivStr}:${saltStr}:${ciphertext}`;
  return encodeURIComponent(result);
};

/**
 * Giải mã chuỗi mã hóa từ URL.
 * @param encryptedStr - Chuỗi mã hóa từ URL.
 */
export const Decrypt = (encryptedStr: string, password: string): unknown => {
  if (!encryptedStr || !password) throw new Error('Dữ liệu hoặc mật khẩu không hợp lệ');

  // Giải mã URL
  let decodedStr;
  try {
    decodedStr = decodeURIComponent(encryptedStr);
  } catch (e) {
    console.log(e);
    throw new Error('Chuỗi mã hóa không hợp lệ: Không thể giải mã URL');
  }

  // Tách chuỗi
  const parts = decodedStr.split(':');
  if (parts.length !== 3) {
    throw new Error('Chuỗi mã hóa không đúng định dạng (phải có dạng iv:salt:ciphertext)');
  }
  const [ivStr, saltStr, ciphertext] = parts;

  // Chuyển Base64 URL-safe về Base64 tiêu chuẩn
  const ivBase64 = fromBase64UrlSafe(ivStr);
  const saltBase64 = fromBase64UrlSafe(saltStr);
  const ciphertextBase64 = fromBase64UrlSafe(ciphertext);

  // Kiểm tra Base64 hợp lệ
  try {
    const salt = CryptoJS.enc.Base64.parse(saltBase64);
    const iv = CryptoJS.enc.Base64.parse(ivBase64);
    const key = generateKey(password, salt);

    const decrypted = CryptoJS.AES.decrypt(ciphertextBase64, key, { iv });
    if (!decrypted.sigBytes) {
      throw new Error('Giải mã thất bại: Dữ liệu trống hoặc mật khẩu sai');
    }

    const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
    if (!decryptedStr) {
      throw new Error('Giải mã thất bại: Dữ liệu không phải UTF-8 hợp lệ');
    }

    return JSON.parse(decryptedStr);
  } catch (e) {
    console.log(e);
    throw new Error(`Giải mã thất bại`);
  }
};