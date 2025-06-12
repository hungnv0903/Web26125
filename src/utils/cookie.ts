import Cookies from 'js-cookie';

// Định nghĩa interface cho cấu hình cookie
export interface CookieOptions {
  expires?: number | Date;       // Thời gian hết hạn
  secure?: boolean;              // Chỉ gửi qua HTTPS
  sameSite?: 'strict' | 'lax' | 'none'; // Chính sách SameSite
  path?: string;                 // Đường dẫn cookie
  domain?: string;               // Tên miền cookie
}

// Cấu hình mặc định để tăng bảo mật
const defaultCookieOptions: CookieOptions = {
  secure: true,
  sameSite: 'strict',
};

/**
 * Kiểm tra nếu là chuỗi thì không cần stringify.
 */
const isString = (val: unknown): val is string => typeof val === 'string';

/**
 * Parse JSON an toàn.
 */
const safeJsonParse = <T>(value: string): T | null => {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

/**
 * Lưu giá trị vào cookie.
 * @param name - Tên cookie.
 * @param value - Giá trị cần lưu.
 * @param options - Cấu hình cookie (expires, secure, sameSite, v.v.).
 */
export const setCookie = <T>(name: string, value: T, options: CookieOptions = {}): void => {
  try {
    const stringValue = isString(value) ? value : JSON.stringify(value);
    Cookies.set(name, stringValue, {
      ...defaultCookieOptions,
      ...options,
    });
  } catch (error) {
    console.error(`Lỗi khi lưu cookie "${name}":`, error);
    throw new Error('Không thể lưu cookie.');
  }
};

/**
 * Lấy giá trị từ cookie.
 * @param name - Tên cookie.
 * @returns Giá trị đã parse hoặc null nếu không tồn tại hoặc lỗi parse.
 */
export const getCookie = <T>(name: string): T | null => {
  try {
    const value = Cookies.get(name);
    if (value === undefined) return null;

    // Nếu là JSON thì parse, nếu không thì trả raw string (nếu T là string)
    if (value.startsWith('{') || value.startsWith('[')) {
      return safeJsonParse<T>(value);
    }

    return value as unknown as T;
  } catch (error) {
    console.error(`Lỗi khi lấy cookie "${name}":`, error);
    return null;
  }
};

/**
 * Xóa cookie.
 * @param name - Tên cookie.
 * @param options - Cấu hình cookie (path, domain, v.v.).
 */
export const removeCookie = (name: string, options: CookieOptions = {}): void => {
  try {
    Cookies.remove(name, {
      ...defaultCookieOptions,
      ...options,
    });
  } catch (error) {
    console.error(`Lỗi khi xóa cookie "${name}":`, error);
    throw new Error('Không thể xóa cookie.');
  }
};
